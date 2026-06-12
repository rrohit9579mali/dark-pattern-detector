# Chrome Extension - Dark Pattern Detector

Manifest v3 Chrome extension that detects and highlights dark patterns on websites.

## Overview
This folder contains all files needed to load and run the Dark Pattern Detector extension in Chrome.

## File Structure

### Root Extension Files
- **manifest.json** - Extension configuration (v3)
  - Name: "Dark Pattern Detector"
  - Version: 1.2
  - Permissions, content scripts, action configuration

- **popup.html** - Extension popup UI
  - Displays pattern count
  - "Burst Patterns" button - triggers analysis
  - "Report Pattern" button - reports detected patterns
  - Toggle CSS visibility checkbox

### JavaScript Files (js/)
- **content.js** - Main content script
  - Runs on every webpage
  - `scrape()` - Extracts text segments and sends to API
  - `highlight()` - Creates visual overlays for detected patterns
  - Handles messages from popup

- **popup.js** - Popup controller
  - Button click handlers
  - Message passing with content scripts
  - Updates pattern count display

- **common.js** - Utility functions
  - `segments()` - Traverses DOM to find text elements
  - `isShown()` - Checks element visibility
  - `isInteractable()` - Checks if element is interactive
  - Text extraction and filtering utilities

- **block_segment.js** - Helper script for DOM analysis
- **canva.js** - Canvas utilities for pattern highlighting
- **Crop.js** - Image cropping for pattern reports
- **report.html** - Report submission interface

### Styles (css/)
- **main.css** - Main extension styles
- **popup.css** - Popup UI styles
- **crop.css** - Image cropping UI styles

## Installation

1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the extension folder: `src/extension`
5. Extension appears in toolbar

## Usage

1. Navigate to any website
2. Click extension icon in toolbar
3. Click "Burst Patterns" button
4. Wait for analysis (sends text to API backend)
5. Patterns are highlighted with colored overlays
6. View pattern count and details in popup
7. Click pattern to see description

## API Connection

- Communicates with Flask API at `http://127.0.0.1:5000/`
- Endpoint: POST `/` with JSON body `{"tokens": [...]}`
- Requires API server running

## Detection Process

1. **Extract** - Gets text segments from DOM
2. **Send** - Posts segments to Flask API
3. **Classify** - API classifies each segment
4. **Highlight** - Creates UI overlays for detected patterns
5. **Display** - Shows count and pattern types in popup

## Pattern Types

- **Obstruction** - Makes actions difficult
- **Urgency** - Artificial time pressure
- **Misdirection** - Deceptive design
- **Social Proof** - False popularity claims
- **Scarcity** - Artificial limited availability
- **Sneaking** - Hidden unwanted actions
- **Forced Action** - Mandatory extras

## Troubleshooting

- Extension shows "0 patterns" → API may not be running
- Console errors → Check browser console (F12)
- Button not responding → Reload extension in chrome://extensions/
