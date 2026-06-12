# Report Application

Web application for viewing and managing reported dark patterns.

## Overview
This folder contains a Flask web application for displaying user submissions of detected dark patterns.

## Files

- **app.py** - Flask web server
  - Routes for displaying reports
  - Database integration
  - Report submission handling

- **data.csv** - Database of submitted reports
  - Stores user-reported dark patterns
  - Website information
  - Pattern details
  - Timestamp

- **templates/** - HTML templates
  - `index.html` - Main report display page
  - Dashboard showing all reported patterns
  - Filter and search capabilities

- **static/** - Static assets
  - `style.css` - Report page styling

## Running the Application

```bash
cd src/report-app
python app.py
```

Application runs on default Flask port (usually `http://127.0.0.1:5000/` or configurable)

## Features

- View all reported dark patterns
- Filter by pattern type
- Sort by date/website
- Display statistics
- User submissions

## Database Schema (data.csv)

```
report_id, website, pattern_type, description, timestamp, user_email, severity
```

## Integration

Works alongside the main Chrome extension:
- Extension sends reports to this app via `/report` endpoint
- User can view summary on separate web page
- Tracks patterns across different websites

## Future Enhancements

- User accounts and authentication
- Advanced analytics and statistics
- Pattern trends over time
- Website-specific recommendations
- Community voting on reports
