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
   instructions).

3. Open `index.html` directly in your browser (double-click it, or use the
   "Live Server" extension in VS Code for a smoother experience).

## How to use

1. In the **Backend URL** field, confirm it matches where your backend is running
   (default: `http://127.0.0.1:8000`).
2. In the **x-api-key** field, enter the API key configured in the backend's
   `.env` file.
3. Use the buttons to interact with the API:
   - **Check Health (public)** — calls `GET /health`, no API key required.
   - **Get Protected Data** — calls `GET /api/data` with the `x-api-key` header.
   - **Send POST Request** — calls `POST /api/data` with the `x-api-key` header.
4. The HTTP status and JSON response from the backend are displayed in the
   **Response** section at the bottom of the page.

## Manual tests performed

| # | Action                                   | Expected result                     |
|---|-------------------------------------------|--------------------------------------|
| 1 | Click "Check Health"                      | `200 OK`, no key required            |
| 2 | Click "Get Protected Data" with empty key | Frontend blocks the request, asks for a key |
| 3 | Click "Get Protected Data" with wrong key | `401 Unauthorized`                   |
| 4 | Click "Get Protected Data" with correct key | `200 OK` with static JSON data      |
| 5 | Click "Send POST Request" with empty key  | Frontend blocks the request, asks for a key |
| 6 | Click "Send POST Request" with wrong key  | `401 Unauthorized`                   |
| 7 | Click "Send POST Request" with correct key | `200 OK` with confirmation message  |

## Security note

The `x-api-key` is entered by the user and stored only in memory (a page input
field) — it is **not persisted, hidden, or protected** in any way. Anyone with
access to the browser's DevTools can see it in plain text in every request.
This is the anti-pattern the exercise is meant to illustrate: a static API key
sent from the client offers no real protection against a motivated attacker.
