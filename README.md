# Security Frontend

Simple frontend client built with vanilla HTML, CSS, and JavaScript to demonstrate
the `x-api-key` authentication anti-pattern against the [back-api](https://github.com/saeulchavez/back-api) backend.

This project intentionally reproduces a common security weakness: sending a static
API key directly from client-side JavaScript. **This is not a production-grade
authentication mechanism** — it exists purely for educational purposes.

## Project structure

```
frontend-api/
├── index.html   # Page structure and layout
├── styles.css   # Styling (kept separate from HTML)
├── app.js       # Fetch calls to the backend API
└── README.md
```

## Prerequisites

- The [back-api](https://github.com/saeulchavez/back-api) backend running locally
  (default: `http://127.0.0.1:8000`)
- A modern web browser
- CORS enabled on the backend (see backend README)

## How to run

1. Clone this repository:
   ```bash
   git clone https://github.com/saeulchavez/frontend-api.git
   cd frontend-api
   ```

2. Make sure the backend is running (see the `back-api` repository for setup
   instructions) and that its API key matches the one hardcoded in `app.js`
   (see below).

3. Open `index.html` directly in your browser (double-click it, or use the
   "Live Server" extension in VS Code for a smoother experience).

## Configuration

The `x-api-key` value and the backend URL are hardcoded directly in `app.js`:

```javascript
const API_KEY = "change-me";
const BASE_URL = "http://127.0.0.1:8000";
```

Update `API_KEY` to match the value configured in the backend's `.env` file
before running the demo.

## How to use

Use the buttons to interact with the API:

- **Check Health (public)** — calls `GET /health`, no API key required.
- **Get Protected Data** — calls `GET /api/data` with the `x-api-key` header.
- **Send POST Request** — calls `POST /api/data` with the `x-api-key` header.

The HTTP status and JSON response from the backend are displayed in the
**Response** section at the bottom of the page.

## Manual tests performed

| # | Action                                        | Expected result                |
|---|-------------------------------------------------|---------------------------------|
| 1 | Click "Check Health"                            | `200 OK`, no key required       |
| 2 | Click "Get Protected Data" with a wrong `API_KEY` in app.js | `401 Unauthorized`  |
| 3 | Click "Get Protected Data" with the correct `API_KEY` | `200 OK` with static JSON data |
| 4 | Click "Send POST Request" with a wrong `API_KEY` in app.js | `401 Unauthorized`  |
| 5 | Click "Send POST Request" with the correct `API_KEY` | `200 OK` with confirmation message |

## Security note

The `x-api-key` is hardcoded directly in `app.js`, in plain text, visible to
anyone who views the page source or opens the browser's DevTools. This is the
anti-pattern the exercise is meant to illustrate: a static API key embedded in
client-side code offers no real protection against a motivated attacker, since
the client is fully under the user's control.
