#!/usr/bin/env python
"""
Setup and run the Dark Pattern Buster API.
This script installs dependencies, verifies models, and starts the Flask server.
"""
import subprocess
import sys
import os
import json

# Get the project root and api directory
api_dir = os.path.dirname(os.path.abspath(__file__))
api_path = os.path.join(api_dir, 'src', 'api')
os.chdir(api_path)

print("=" * 60)
print("Dark Pattern Buster - API Setup & Run")
print("=" * 60)

# Step 1: Install requirements
print("\n[1/4] Installing Python dependencies...")
requirements_file = os.path.join(api_path, 'requirements.txt')
packages = ['flask', 'joblib', 'scikit-learn', 'flask_cors', 'pandas', 'openpyxl']

for pkg in packages:
    print(f"  Installing {pkg}...")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-q', pkg])

print("  ✓ All dependencies installed")

# Step 2: Verify imports
print("\n[2/4] Verifying Python imports...")
required_imports = {
    'flask': 'Flask',
    'flask_cors': 'CORS',
    'joblib': 'load',
    'pandas': 'pd',
    'openpyxl': 'openpyxl',
    'sklearn': 'sklearn'
}

failed_imports = []
for module_name, import_name in required_imports.items():
    try:
        __import__(module_name)
        print(f"  ✓ {module_name}")
    except Exception as e:
        print(f"  ✗ {module_name}: {e}")
        failed_imports.append(module_name)

if failed_imports:
    print(f"\n✗ Failed to import: {failed_imports}")
    sys.exit(1)

# Step 3: Verify model files
print("\n[3/4] Verifying model files...")
from joblib import load

models = [
    'presence_classifer.joblib',
    'presence_vectorizer.joblib',
    'category_classifier.joblib',
    'category_vectorizer.joblib'
]

failed_models = []
for model_file in models:
    model_path = os.path.join(api_path, model_file)
    if os.path.exists(model_path):
        try:
            load(model_path)
            print(f"  ✓ {model_file}")
        except Exception as e:
            print(f"  ✗ {model_file}: {e}")
            failed_models.append(model_file)
    else:
        print(f"  ✗ {model_file} - NOT FOUND")
        failed_models.append(model_file)

if failed_models:
    print(f"\n✗ Failed models: {failed_models}")
    sys.exit(1)

# Step 4: Start Flask app
print("\n[4/4] Starting Flask API server...")
print("  Importing Flask app...")

try:
    # Add api directory to sys.path so we can import app.py
    sys.path.insert(0, api_path)
    import app as app_module
    app = app_module.app
    print("  ✓ Flask app imported successfully")
    print("\n" + "=" * 60)
    print("Server starting on http://127.0.0.1:5000/")
    print("Press Ctrl+C to stop")
    print("=" * 60 + "\n")
    
    app.run(host='127.0.0.1', port=5000, debug=True, use_reloader=False)
except Exception as e:
    print(f"  ✗ Failed to start Flask app: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
