var css_arr = [];
var css_arr_len;
const endpoint = "http://127.0.0.1:5000/";
const descriptions = {
  "Sneaking": "Coerces users to act in ways that they would not normally act by obscuring information.",
  "Urgency": "Places deadlines on things to make them appear more desirable",
  "Misdirection": "Aims to deceptively incline a user towards one choice over the other.",
  "Social Proof": "Gives the perception that a given action or product has been approved by other people.",
  "Scarcity": "Tries to increase the value of something by making it appear to be limited in availability.",
  "Obstruction": "Tries to make an action more difficult so that a user is less likely to do that action.",
  "Forced Action": "Forces a user to complete extra, unrelated tasks to do something that should be simple.",
};

function scrape() {
  console.log("=== SCRAPE STARTED ===");
  
  if (document.getElementById("anb_count")) {
    console.warn("Scan already performed on this page");
    alert("Scan already performed on this page. Refresh to scan again.");
    return;
  }

  try {
    console.log("Getting segments from body...");
    let elements = segments(document.body);
    console.log("Segments found:", elements.length);
    
    if (!elements || elements.length === 0) {
      console.error("No elements found!");
      alert("No content found to analyze. Try refreshing the page.");
      return;
    }
    
    let filtered_elements = [];

    for (let i = 0; i < elements.length; i++) {
      try {
        let text = elements[i].innerText.trim().replace(/\t/g, " ");
        if (text.length > 0) {
          filtered_elements.push(text);
          console.log("Segment " + i + ":", text.substring(0, 50) + "...");
        }
      } catch (e) {
        console.warn("Error processing element", i, e);
      }
    }

    console.log("Filtered elements:", filtered_elements.length);
    
    if (filtered_elements.length === 0) {
      alert("No text content found to analyze");
      return;
    }
    
    console.log("Sending to API at:", endpoint);
    console.log("Request body:", JSON.stringify({ tokens: filtered_elements }));
    
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens: filtered_elements }),
    })
      .then((resp) => {
        console.log("API Response status:", resp.status);
        if (!resp.ok) {
          throw new Error("API returned status " + resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Raw API response:", data);
        
        // Data is already parsed JSON, no need to parse string
        console.log("Parsed data:", data);
        
        if (!data.result || !Array.isArray(data.result)) {
          throw new Error("Invalid API response format: " + JSON.stringify(data));
        }
        
        let dp_count = 0;

        for (let i = 0; i < data.result.length; i++) {
          if (data.result[i] && data.result[i] !== "Not Dark" && data.result[i] !== undefined) {
            console.log("Dark pattern found:", data.result[i], "in:", filtered_elements[i].substring(0, 50));
            if (elements[i]) {
              highlight(elements[i], data.result[i]);
              dp_count++;
            }
          }
        }
        
        css_arr_len = dp_count;
        console.log("Total dark patterns:", dp_count);
        
        let g = document.createElement("div");
        g.id = "anb_count";
        g.value = dp_count;
        g.style.opacity = 0;
        g.style.position = "fixed";
        document.body.appendChild(g);
        sendDarkPatterns(g.value);
        
        if (dp_count > 0) {
          alert("Found " + dp_count + " dark pattern(s)!");
          processCssArrLen();
        } else {
          alert("No dark patterns detected on this page.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        console.error("Stack trace:", error.stack);
        alert("Error scanning page: " + error.message + "\n\nCheck console (F12) for details.");
      });
  } catch (error) {
    console.error("Scrape function error:", error);
    console.error("Stack:", error.stack);
    alert("Error: " + error.message);
  }
}

function processCssArrLen() {
  console.log(css_arr_len);

  let res = "";
  for (let i = 0; i < css_arr_len; i++) {
    res += valuesToHtmlString(css_arr[i].innerHTML, i);
  }

  
  if (window.confirm("Do you want to download the reported HTML?")) {
    saveHtmlStringToFile(res, "scan_result.html");
  } else {
    alert("Download cancelled.");
  }
}

function valuesToHtmlString(html,index) {
  let s = ""
  s += `<h3 style="margin-bottom: 5px">${index}</h3>\n`
  s += `<b>${html}</b>\n`
  s += "<br> ---\n"
  return s
}

function saveHtmlStringToFile(s, fileName) {
  const blob = new Blob([s], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


function highlight(element, type) {
  element.classList.add("anb-highlight");

  let parentElement = element.parentElement;
  css_arr.push(parentElement);
  
  // Get the parent element's ID
  let parentId = parentElement.id;

  // Get computed CSS styles of the parent element
  let parentComputedStyle = window.getComputedStyle(parentElement);


  let body = document.createElement("span");
  body.classList.add("anb-highlight-body");

  /* header */
  let header = document.createElement("div");
  header.classList.add("modal-header");
  let headerText = document.createElement("h1");
  headerText.innerHTML = type + " Pattern";
  header.appendChild(headerText);
  body.appendChild(header);

  /* content */
  let content = document.createElement("div");
  content.classList.add("modal-content");
  content.innerHTML = descriptions[type];
  body.appendChild(content);

  element.appendChild(body);
}

function sendDarkPatterns(number) {
  chrome.runtime.sendMessage({
    message: "update_current_count",
    count: number,
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "analyze_site") {
    scrape();
  } else if (request.message === "popup_open") {
    let element = document.getElementById("anb_count");
    if (element) {
      sendDarkPatterns(element.value);
    }
  } else if (request.message === "toggle_css") {
    if (cssVisible) {
      for (let i = 0; i < css_arr_len; i++) {
        css_arr[i].style.display = 'none';
      }
    } else {
      for (let i = 0; i < css_arr_len; i++) {
        css_arr[i].style.display = '';
      }
    }
    cssVisible = !cssVisible;
  }
});

let cssVisible = true;
