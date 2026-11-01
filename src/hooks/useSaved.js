import { useState } from "react";
export function useSaved() {
  const [saved, setSaved] = useState(() => {
    try {
      const v = JSON.parse(localStorage.getItem("nullai-saved") || "[]");
      return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
    } catch {
      return [];
    }
  });
  function toggle(id) {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem("nullai-saved", JSON.stringify(next));
      } catch {}
      return next;
    });
  }
  return { saved, toggle };
}
