import { useState } from "react";
export function useTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("nullai-theme", next);
    } catch {}
  }
  return [theme, toggle];
}
