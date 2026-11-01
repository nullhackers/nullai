/**
 * Centralized API service for NullAI tools.
 * Reads base URL from the VITE_API_URL environment variable.
 * @returns {Promise<Array>} Array of tool objects.
 */
export async function fetchTools() {
  const baseUrl =
    import.meta.env?.VITE_API_URL ||
    (typeof process !== "undefined" && process?.env?.VITE_API_URL);
  if (!baseUrl) {
    throw new Error(
      "Missing API configuration. Set VITE_API_URL in your environment.",
    );
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/tools`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to load tools: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The tools API returned an unexpected response.");
  }

  return data;
}
