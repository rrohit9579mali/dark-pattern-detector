# Documentation

Complete documentation for the Dark Pattern Detector project.

## Contents

- **ORIGINAL_README.md** - Original project README
- **CHROME_EXTENSION_SETUP.md** - Detailed extension installation guide

## Quick Links

### Architecture
- [API Backend](../src/api/README.md) - Flask API details
- [Chrome Extension](../src/extension/README.md) - Extension structure
- [ML Models](../src/models/README.md) - Model information
- [Report App](../src/report-app/README.md) - Report application docs

### Getting Started
1. [Extension Setup](./CHROME_EXTENSION_SETUP.md) - Install extension in Chrome
2. Run API: `python run_app.py`
3. Load extension: `chrome://extensions/`
4. Test on any website

### Components

**Frontend:** Chrome Extension (Manifest v3)
- Content scripts for website analysis
- Popup UI for user interaction
- Pattern visualization with overlays

**Backend:** Flask API
- Text classification using ML models
- Dark pattern detection
- Report submission handling

**ML Models:** scikit-learn classifiers
- Presence detection (binary classification)
- Pattern categorization (multi-class)
- 7 dark pattern types supported

**Database:** CSV-based reports
- User submissions
- Pattern tracking
- Website analysis

## Project Structure

```
Dark_Pattern_Prediction_S7/
├── src/
│   ├── api/              # Flask backend API
│   ├── extension/        # Chrome extension files
│   ├── models/           # ML models and training data
│   └── report-app/       # Report web application
├── docs/                 # Documentation
├── config/               # Configuration files
├── run_app.py           # Main entry point
└── .git/                # Version control
```

## Key Features

✓ Real-time dark pattern detection
✓ 7 pattern categories identified
✓ Browser extension UI
✓ REST API backend
✓ User reporting system
✓ ML-based classification

## Supported Dark Patterns

1. **Obstruction** - Makes actions difficult to complete
2. **Urgency** - Artificial time pressure
3. **Misdirection** - Deceptive design/layout
4. **Social Proof** - False popularity/endorsement
5. **Scarcity** - Artificial limited availability
6. **Sneaking** - Hidden unwanted actions
7. **Forced Action** - Mandatory extra tasks

## Running the Project

### Start Backend API
```bash
python run_app.py
```
Runs on `http://127.0.0.1:5000/`

### Load Chrome Extension
1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select `src/extension/` folder
5. Pin extension to toolbar

### Test Detection
1. Visit any website (e-commerce sites work best)
2. Click extension icon
3. Click "Burst Patterns" button
4. Wait for analysis
5. View highlighted patterns

## Technical Stack

- **Frontend:** JavaScript (Vanilla)
- **Backend:** Python/Flask
- **ML:** scikit-learn (BernoulliNB, MultinomialNB)
- **Extension:** Manifest v3 (Chrome)
- **Database:** CSV

## Requirements

- Python 3.13
- Chrome/Chromium browser
- Flask, joblib, scikit-learn, pandas

## Troubleshooting

**Extension shows "0 patterns"**
→ Make sure API server is running with `python run_app.py`

**API connection errors**
→ Check endpoint is `http://127.0.0.1:5000/` in extension code

**Models not loading**
→ Verify .joblib files exist in `src/models/` folder

**Browser console errors**
→ Press F12 to open developer tools and check console tab

## Authors & Contributors

Dark Pattern Detection Project - S7
Resume Project Implementation

---

Last Updated: January 2026
