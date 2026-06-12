# Configuration

Project configuration files and environment settings.

## Contents

This folder stores all project configuration files.

## Configuration Files

- `.env` - Environment variables (if needed)
- `config.json` - Project settings

## Environment Variables

Example `.env` file:
```
FLASK_ENV=development
FLASK_DEBUG=True
API_HOST=127.0.0.1
API_PORT=5000
```

## API Configuration

- Host: `127.0.0.1`
- Port: `5000`
- Debug: Enabled (development)

## Extension Configuration

- Manifest Version: 3
- Name: Dark Pattern Detector
- Version: 1.2
- Target: All websites

## Database Configuration

- Format: CSV
- Location: `src/report-app/data.csv`
- Auto-created on first submission

## Model Configuration

- Models location: `src/models/`
- scikit-learn version: 1.8.0
- Trained on: 1.4.0 (version mismatch warning expected)

## Development Settings

- Debug Mode: ON
- CORS: Enabled
- Auto-reload: Enabled
- Hot-reload: Supported

## Production Deployment

For production use, update:
1. `FLASK_ENV=production`
2. `FLASK_DEBUG=False`
3. Use production WSGI server (Gunicorn, etc.)
4. Enable HTTPS
5. Update API_HOST to actual domain

---

See root `.hintrc` for linting configuration.
