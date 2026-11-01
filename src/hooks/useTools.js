import { useEffect, useState, useCallback } from "react";
import { fetchTools } from "../services/api";

/**
 * Hook that fetches all tools from the live API.
 * Returns { tools, loading, error, retry }.
 */
export function useTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchTools()
      .then((data) => {
        setTools(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unable to load AI tools.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { tools, loading, error, retry: load };
}
