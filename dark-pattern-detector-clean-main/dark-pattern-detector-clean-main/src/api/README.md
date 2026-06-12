# API Backend

Flask REST API backend for the Dark Pattern Detector extension.

## Overview
This folder contains the Flask API that serves dark pattern detection and classification to the Chrome extension.

## Files

- **app.py** - Main Flask application
  - POST `/` - Analyzes text tokens for dark patterns
  - POST `/report` - Handles user pattern reports
  - CORS enabled for cross-origin requests

- **requirements.txt** - Python dependencies
  - flask
  - flask_cors
  - joblib
  - scikit-learn
  - pandas
  - openpyxl

- **Model Files** (.joblib)
  - `presence_classifer.joblib` - BernoulliNB model for detecting if text contains dark patterns
  - `presence_vectorizer.joblib` - CountVectorizer for presence classification
  - `category_classifier.joblib` - MultinomialNB model for categorizing pattern types
  - `category_vectorizer.joblib` - CountVectorizer for category classification

- **Data Files**
  - `dark_patterns.txt` - List of dark pattern categories
  - `extracted_data.csv` - Sample extracted data
  - `categorizer_info.json` - Categorizer model metadata
  - `vectorizer_info.json` - Vectorizer metadata

## Running the API

```bash
cd src/api
python app.py
```

Server runs on `http://127.0.0.1:5000/`

## API Endpoints

### POST /
Analyzes text for dark patterns.

**Request:**
```json
{
  "tokens": ["Limited time offer", "Free shipping"]
}
```

**Response:**
```json
{
  "result": ["Urgency", "Not Dark"]
}
```

### Dark Pattern Categories
- Sneaking
- Urgency
- Misdirection
- Social Proof
- Scarcity
- Obstruction
- Forced Action

## Model Training

Models were trained on scikit-learn v1.4.0 using labeled dark pattern data. Current environment uses v1.8.0 (may produce version warnings).
