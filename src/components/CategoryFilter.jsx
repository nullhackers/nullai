import {
  Layers,
  PenLine,
  Image,
  Code2,
  Video,
  AudioLines,
  Microscope,
  Palette,
  Zap,
} from "lucide-react";
const icons = {
  "All tools": Layers,
  Writing: PenLine,
  Image: Image,
  Coding: Code2,
  Video: Video,
  Audio: AudioLines,
  Research: Microscope,
  Design: Palette,
  Productivity: Zap,
};
export default function CategoryFilter({ categories = [], value, onChange, tools = [] }) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeTools = Array.isArray(tools) ? tools : [];
  return (
    <div
      id="categories"
      className="category-filter"
      aria-label="Filter by category"
    >
      {["All tools", ...safeCategories].map((c) => {
        const Icon = icons[c] || Layers;
        return (
          <button
            key={c}
            className={value === c ? "active" : ""}
            onClick={() => onChange(c)}
            aria-pressed={value === c}
          >
            <Icon size={16} />
            {c}
            <span>
              {c === "All tools"
                ? safeTools.length
                : safeTools.filter((t) => t.category === c).length}
            </span>
          </button>
        );
      })}
    </div>
  );
}
