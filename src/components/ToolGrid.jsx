import { SearchX } from "lucide-react";
import ToolCard from "./ToolCard";
export default function ToolGrid({ tools, saved, toggle, onQuickView, reset }) {
  return tools.length ? (
    <div className="tool-grid">
      {tools.map((t) => (
        <ToolCard
          key={t.id}
          tool={t}
          saved={saved.includes(t.id)}
          toggle={toggle}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  ) : (
    <div className="empty-state" role="status">
      <SearchX size={35} />
      <h3>No tools found. Yet.</h3>
      <p>Try a different search or clear your filters to explore again.</p>
      <button className="primary-button" onClick={reset}>
        Reset filters
      </button>
    </div>
  );
}
