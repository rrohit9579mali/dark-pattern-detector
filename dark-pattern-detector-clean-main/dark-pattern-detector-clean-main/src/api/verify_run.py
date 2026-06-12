import sys, os
from joblib import load

print('PYTHON:', sys.executable)

packages = ['flask', 'flask_cors', 'joblib', 'pandas', 'openpyxl', 'sklearn']
for p in packages:
    try:
        __import__(p)
        print(p, 'OK')
    except Exception as e:
        print(p, 'IMPORT ERROR:', e)

base = os.path.dirname(__file__)
models = ['presence_classifer.joblib','presence_vectorizer.joblib','category_classifier.joblib','category_vectorizer.joblib']
for m in models:
    p = os.path.join(base, m)
    print('\nModel:', m)
    print(' Path exists:', os.path.exists(p))
    if os.path.exists(p):
        try:
            load(p)
            print(' Loaded OK')
        except Exception as e:
            print(' LOAD ERROR:', repr(e))

print('\nDone')
