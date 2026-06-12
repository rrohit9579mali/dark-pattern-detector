# 🔧 CHROME EXTENSION - QUICK SETUP GUIDE

## ✅ Status: Ready to Install

Your Dark Pattern Buster Chrome extension is ready to be installed!

---

## 📋 Pre-Installation Checklist

- [x] API Server running on http://127.0.0.1:5000/
- [x] All dependencies installed
- [x] ML models loaded
- [x] Flask app initialized
- [x] Extension folder exists: `app/`

---

## 🚀 Installation Steps (5 Minutes)

### Step 1: Open Chrome Extensions Page
1. Open Google Chrome
2. Click the **three dots** menu (⋮) in top-right corner
3. Select **"More tools"** → **"Extensions"**
   - OR press: `Ctrl+Shift+M` (Windows)

### Step 2: Enable Developer Mode
1. Look for the toggle switch in the **top-right corner**
2. Click to turn **ON** "Developer mode"
3. You should see new buttons appear: **"Load unpacked"**, **"Pack extension"**

### Step 3: Load the Extension
1. Click the blue **"Load unpacked"** button
2. Navigate to: `C:\Users\91936\Desktop\Resume Project\Dark_Pattern_Prediction_S7\app`
3. Click **"Select Folder"** or **"Open"**
4. The extension should appear in the list with:
   - Name: Dark Pattern Buster (or whatever's in manifest.json)
   - Status: Enabled ✓
   - ID: (random alphanumeric string)

### Step 4: Verify Installation
1. Look for the extension icon in Chrome's toolbar (top-right)
2. It should show as active and enabled
3. Click it to see the popup

---

## ✅ Verify Server is Running

**Before testing the extension, make sure the API server is running:**

### Check 1: Visual Verification
- You should have a PowerShell/Python terminal running showing:
  ```
  * Running on http://127.0.0.1:5000
  ```

### Check 2: Quick Test
Open a new PowerShell and run:
```powershell
curl http://127.0.0.1:5000/ -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"tokens":["test"]}'
```

Expected response: JSON with analysis results

### Check 3: If Server Stopped
Restart it:
```powershell
cd "C:\Users\91936\Desktop\Resume Project\Dark_Pattern_Prediction_S7"
& ".\.venv\Scripts\python.exe" run_app.py
```

---

## 🧪 Testing the Extension

### Test 1: On Amazon
1. Go to: https://www.amazon.com
2. Click the **Dark Pattern Buster** extension icon
3. Extension analyzes the page
4. Results should show in popup (or console if debugging)
5. Check: `api/reports.xlsx` for saved reports

### Test 2: On eBay
1. Go to: https://www.ebay.com
2. Click extension
3. Watch for dark pattern detection
4. Reports saved automatically

### Test 3: On Shopping Pages
1. Navigate to any e-commerce checkout
2. Click the extension
3. It will analyze:
   - "Proceed to Checkout" → Should detect urgency
   - "Limited Time Offer" → Should detect urgency
   - "Confirm Purchase" → Should analyze

---

## 🔍 Debugging the Extension

### View Console Logs
1. Right-click the extension icon
2. Select **"Inspect popup"**
3. Look for:
   - API requests
   - Response data
   - Any error messages

### Check Network Requests
1. Open Chrome DevTools: `F12`
2. Go to **"Network"** tab
3. Look for requests to: `http://127.0.0.1:5000/`
4. Verify: Status `200` and response is JSON

### View Extension Details
1. Go to `chrome://extensions/`
2. Find Dark Pattern Buster
3. Click **"Details"**
4. Check for errors in **"Errors"** section

---

## 📝 Expected API Responses

### Successful Response
```json
{
  "result": ["Not Dark", "Urgency", "Not Dark", ...]
}
```
- Status: `200`
- Content-Type: `application/json`

### Error Response
```json
{
  "error": "Bad request"
}
```
- Status: `400` or higher

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Connection Refused"
**Problem:** Extension can't reach API  
**Solution:** 
- Make sure server is running: `python run_app.py`
- Check server is on http://127.0.0.1:5000 (not localhost:3000, etc.)

### Issue 2: "CORS Error"
**Problem:** Browser blocks cross-origin request  
**Solution:**
- CORS is already enabled in app.py
- This should NOT happen
- If it does: Check `flask_cors` is imported in app.py

### Issue 3: "Extension not appearing"
**Problem:** Icon not in toolbar  
**Solution:**
- Refresh the extensions page: `chrome://extensions/`
- Reload the extension (click reload icon)
- Try unpacking and repacking

### Issue 4: "API returns empty result"
**Problem:** No tokens to analyze  
**Solution:**
- Make sure page has text content
- Check extension is extracting tokens correctly
- See extension's JavaScript for token extraction logic

---

## 🎨 Extension File Structure

```
app/
├── manifest.json          ← Extension configuration
├── popup.html             ← Popup UI
├── popup.js               ← Popup logic
├── js/
│   ├── content.js         ← Page content analyzer
│   ├── popup.js           ← Popup handler
│   ├── common.js          ← Shared functions
│   ├── Crop.js            ← Screenshot cropper
│   └── report.html        ← Report template
├── css/
│   ├── popup.css          ← Popup styles
│   ├── main.css           ← Main styles
│   └── crop.css           ← Crop tool styles
├── ANB*.ico               ← Extension icons
└── reports.html           ← Report viewer
```

---

## 🔗 API Endpoints Used by Extension

The extension will call these endpoints:

### 1. Analyze Text
```
POST http://127.0.0.1:5000/
Body: { "tokens": ["word1", "word2", ...] }
```

### 2. Save Report
```
POST http://127.0.0.1:5000/report
Body: {
  "image": "data:image/png;base64,...",
  "description": "Dark pattern found..."
}
```

---

## 📊 Once Installed

### Monitor API Calls
In the terminal where server is running, you'll see:
```
127.0.0.1 - - [07/Jan/2026 12:34:56] "POST / HTTP/1.1" 200 -
127.0.0.1 - - [07/Jan/2026 12:34:57] "POST /report HTTP/1.1" 200 -
```

### Check Saved Reports
```
api/reports.xlsx
```
Opens in Excel showing all detected dark patterns with screenshots

---

## ✨ Features to Test

1. **Dark Pattern Detection**
   - ✓ Urgency (limited time, act now, limited offer)
   - ✓ Scarcity (only 3 left, trending)
   - ✓ Misdirection (confusing buttons)
   - ✓ Trick Questions (pre-checked boxes)

2. **Screenshot Capture**
   - ✓ Capture current page
   - ✓ Crop specific areas
   - ✓ Save with analysis

3. **Report Generation**
   - ✓ Automatic Excel generation
   - ✓ Screenshot embedding
   - ✓ Timestamp logging

---

## 🎯 Success Indicators

✅ Extension icon visible in toolbar  
✅ Click icon → popup appears  
✅ Popup shows "Analyzing..." then results  
✅ Results match API response  
✅ Reports save to Excel  
✅ No console errors  

---

## 📞 Need Help?

1. Check console (F12 → Console tab)
2. Verify server running: See terminal with "Running on..."
3. Test API: Use PowerShell test command
4. Reload extension: Click reload icon on extensions page
5. Check DEMO_COMPLETE.md for full reference

---

## 🚀 Next Steps After Installation

1. **Test on Real Sites**
   - Amazon.com
   - eBay.com
   - Any e-commerce site

2. **Monitor Console**
   - Watch for dark patterns detected
   - Check screenshot capture works
   - Verify reports save

3. **Gather Data**
   - Collect examples of dark patterns
   - Document findings
   - Review `api/reports.xlsx`

4. **Share & Report**
   - Use reports for analysis
   - Share findings with team
   - Report dark patterns to websites

---

**Ready to install? Follow the 4 steps above! 🎉**

For detailed troubleshooting, see TESTING_GUIDE.md or DEMO_COMPLETE.md
