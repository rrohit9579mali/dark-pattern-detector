# Dark Pattern Detector - S7 Project

A Chrome extension that detects and highlights deceptive design patterns (dark patterns) on websites using machine learning.

## 🎯 Overview

Dark Pattern Detector uses AI-powered text analysis to identify manipulative design patterns used by websites to deceive users. The extension analyzes webpage content and highlights detected patterns in real-time.

## ✨ Features

✅ **Real-Time Detection** - Analyzes webpages as you browse
✅ **7 Pattern Types** - Obstruction, Urgency, Misdirection, Social Proof, Scarcity, Sneaking, Forced Action
✅ **Visual Highlighting** - Color-coded overlays mark detected patterns
✅ **Easy Reporting** - Report patterns directly from the extension
✅ **Browser Integration** - Works seamlessly with Chrome

## 🚀 Quick Start

### 1. Start the Backend API
```bash
python run_app.py
```
The Flask API will start on `http://127.0.0.1:5000/`

### 2. Load the Chrome Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Navigate to and select the `src/extension/` folder
5. The extension icon appears in your toolbar

### 3. Start Detecting Patterns
1. Visit any website (e-commerce sites work best)
2. Click the extension icon
3. Click "Burst Patterns" button
4. Wait for analysis (~3-5 seconds)
5. View highlighted patterns on the page

## 📁 Project Structure

```
Dark_Pattern_Prediction_S7/
├── src/
│   ├── api/                    # Flask REST API backend
│   ├── extension/              # Chrome extension (Manifest v3)
│   ├── models/                 # ML models & training data
│   └── report-app/             # Report submission web app
├── docs/                       # Complete documentation
├── config/                     # Configuration files
├── run_app.py                 # Main entry point
└── README.md                  # This file
```

## 🔍 How It Works

```
Website
   ↓
[Content Script extracts text]
   ↓
[Sends to Flask API at :5000]
   ↓
[API loads ML models]
   ↓
[Classifies each text segment]
   ↓
[Returns pattern types]
   ↓
[Extension highlights patterns]
   ↓
User sees results with overlay
```

## 🧠 ML Models

The project uses scikit-learn classifiers:

- **Presence Detection**: BernoulliNB - Binary classification (Dark/Not Dark)
- **Category Classification**: MultinomialNB - Multi-class (7 pattern types)
- **Vectorization**: CountVectorizer with TF-IDF

Models trained on labeled dark pattern dataset.

## 🎨 Dark Pattern Types

| Pattern | Description |
|---------|-------------|
| **Obstruction** | Makes desired actions difficult to complete |
| **Urgency** | Creates artificial time pressure |
| **Misdirection** | Deceptively guides users toward unwanted choices |
| **Social Proof** | False claims of popularity/endorsement |
| **Scarcity** | Artificial limited availability |
| **Sneaking** | Hidden unwanted actions |
| **Forced Action** | Mandatory extra tasks before desired action |

## 📋 System Requirements

- **Python**: 3.13+
- **Browser**: Chrome/Chromium
- **Dependencies**: Flask, scikit-learn, joblib, pandas

## 🛠️ Architecture

### Frontend
- **Chrome Extension** (Manifest v3)
  - Content scripts run on all websites
  - Popup UI with controls
  - Pattern highlighting and visualization

### Backend
- **Flask API** on `http://127.0.0.1:5000/`
  - POST `/` - Text classification endpoint
  - POST `/report` - Pattern reporting

### ML Pipeline
- **Vectorizer**: Converts text to feature vectors
- **Classifier**: Detects and categorizes patterns
- **Models**: Pre-trained and ready to use

### Storage
- **Reports**: CSV database (`src/report-app/data.csv`)
- **Models**: joblib serialized sklearn models

## 📚 Documentation

Complete documentation available in `docs/`:

- [API Backend](docs/README.md#api-backend) - Flask API details
- [Extension Guide](docs/README.md#chrome-extension) - Extension structure
- [ML Models](docs/README.md#ml-models) - Model information
- [Setup Guide](docs/CHROME_EXTENSION_SETUP.md) - Detailed installation

## 🔧 Configuration

API runs on `http://127.0.0.1:5000/` by default.

Extension communicates with this endpoint automatically.

For custom configuration, edit:
- `src/extension/js/content.js` - Change API endpoint
- `src/api/app.py` - Modify API settings

## 🐛 Troubleshooting

### Extension shows "0 patterns"
→ Make sure Flask API is running: `python run_app.py`

### API Connection Error
→ Verify extension has correct endpoint URL in `content.js`

### Models Won't Load
→ Check `.joblib` files exist in `src/models/`

### Console Errors
→ Open DevTools (F12) → Console tab for detailed errors

## 📝 Example Usage

**Request to API:**
```json
POST /
{
  "tokens": [
    "Limited time only - 2 hours left!",
    "Only 3 items remaining",
    "Free shipping"
  ]
}
```

**Response from API:**
```json
{
  "result": [
    "Urgency",
    "Scarcity",
    "Not Dark"
  ]
}
```

## 🔐 Privacy & Security

- Extension only sends text content to local API
- No data sent to external servers
- API runs locally on your machine
- Reports stored locally in CSV

## 🚀 Deployment

For production use:
1. Deploy Flask API to server
2. Update extension API endpoint to server URL
3. Use HTTPS for secure communication
4. Deploy report app separately if needed

See `docs/` for detailed deployment guides.

## 👥 Contributing

To improve dark pattern detection:
1. Add labeled training data
2. Retrain models using `src/models/Model.ipynb`
3. Export new models as `.joblib`
4. Replace model files and test

## 📄 License

Dark Pattern Prediction S7 Project - Resume Implementation

## 🎓 Academic Context

This project demonstrates:
- Machine Learning classification
- Web scraping and DOM analysis
- Browser extension development
- REST API design
- Full-stack application architecture

---

**Status**: ✅ Fully Functional
**Last Updated**: January 2026
**Python Version**: 3.13
**Framework**: Flask + Manifest v3

For detailed documentation, see the [docs/](docs/) folder.
