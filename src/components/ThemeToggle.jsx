import { Sun, Moon } from "lucide-react";
export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      className="icon-button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
