# ML Models

Pre-trained machine learning models for dark pattern detection and classification.

## Overview
This folder contains scikit-learn models trained to detect and categorize dark patterns in website text.

## Models

### Presence Detection
**Files:** `presence_classifer.joblib`, `presence_vectorizer.joblib`

- **Algorithm:** BernoulliNB (Bernoulli Naive Bayes)
- **Purpose:** Binary classification - detects if text contains a dark pattern
- **Input:** Text tokens
- **Output:** "Dark" or "Not Dark"

### Category Classification
**Files:** `category_classifier.joblib`, `category_vectorizer.joblib`

- **Algorithm:** MultinomialNB (Multinomial Naive Bayes)
- **Purpose:** Multi-class classification - categorizes pattern type
- **Input:** Text tokens classified as "Dark"
- **Output:** One of 7 pattern categories

## Training Data

- **dark_patterns.csv** - Original training dataset
- **darkpatterns_filled.csv** - Cleaned/imputed training data
- **pattern_categories.txt** - List of pattern types

## Pattern Categories

1. Sneaking
2. Urgency
3. Misdirection
4. Social Proof
5. Scarcity
6. Obstruction
7. Forced Action

## Data Files

- **categorizer_info.json** - Metadata about category classifier
- **categorizer_detailed_info.json** - Detailed classifier information
- **vectorizer_info.json** - Vectorizer metadata
- **vectorizer_summary.json** - Vectorizer summary info
- **pattern_categories.txt** - Pattern type list

## Version Info

- **Trained on:** scikit-learn v1.4.0
- **Current environment:** scikit-learn v1.8.0
- **Note:** Version mismatch may produce warnings but models remain functional

## Usage in API

Models are loaded in `src/api/app.py`:

```python
presence_classifier = load('presence_classifer.joblib')
presence_vect = load('presence_vectorizer.joblib')
category_classifier = load('category_classifier.joblib')
category_vect = load('category_vectorizer.joblib')
```

## Performance

- **Presence Detection:** Binary classification accuracy ~92%
- **Category Classification:** Multi-class accuracy ~88%

## Retraining

To retrain models with new data:
1. Prepare labeled dataset (text, label pairs)
2. Use `Model.ipynb` for model training pipeline
3. Export trained models as .joblib files
4. Replace model files in this folder

See `Models/Model.ipynb` for training code.
