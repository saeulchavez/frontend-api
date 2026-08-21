const apiKeyInput = document.getElementById("apiKeyInput");
const baseUrlInput = document.getElementById("baseUrlInput");
const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");
const healthBtn = document.getElementById("healthBtn");
const statusBadge = document.getElementById("statusBadge");
const responseArea = document.getElementById("responseArea");

function getBaseUrl() {
    return baseUrlInput.value.trim().replace(/\/$/, "");
}

function getApiKey() {
    return apiKeyInput.value.trim();
}

function setStatus(status, ok) {
    statusBadge.textContent = status;
    statusBadge.classList.remove("success", "error");
    statusBadge.classList.add(ok ? "success" : "error");
}

function setResponse(data) {
    responseArea.textContent =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

async function callEndpoint(path, method, useApiKey) {
    const baseUrl = getBaseUrl();

    if (!baseUrl) {
        setStatus("No backend URL", false);
        setResponse("Please enter the backend URL.");
        return;
    }

    const headers = {};

    if (useApiKey) {
        const apiKey = getApiKey();
        if (!apiKey) {
            setStatus("Missing API key", false);
            setResponse("Please enter an x-api-key value before calling this endpoint.");
            return;
        }
        headers["x-api-key"] = apiKey;
    }

    setStatus("Loading...", true);
    setResponse("Sending request...");

    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: headers,
        });

        let body;
        try {
            body = await response.json();
        } catch (parseError) {
            body = { error: "Response was not valid JSON." };
        }

        setStatus(`${response.status} ${response.statusText}`, response.ok);
        setResponse(body);
    } catch (networkError) {
        setStatus("Network error", false);
        setResponse(
            `Could not reach the backend at ${baseUrl}.\n` +
            `Make sure the server is running and CORS is enabled.\n\n` +
            `Details: ${networkError.message}`
        );
    }
}

healthBtn.addEventListener("click", () => {
    callEndpoint("/health", "GET", false);
});

getBtn.addEventListener("click", () => {
    callEndpoint("/api/data", "GET", true);
});

postBtn.addEventListener("click", () => {
    callEndpoint("/api/data", "POST", true);
});
