import { Link } from "react-router-dom";
import { Bookmark, ArrowUpRight, TrendingUp } from "lucide-react";
import ToolLogo from "./ToolLogo";
export default function ToolCard({
  tool,
  saved,
  toggle,
  onQuickView,
  featured = false,
}) {
  return (
    <article
      className={`tool-card ${featured ? "featured-card" : ""}`}
      style={{ "--tool-color": tool.color }}
    >
      <div className="card-top">
        <ToolLogo tool={tool} />
        <button
          className={`bookmark-button ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${tool.name}`}
          aria-pressed={saved}
          onClick={() => toggle(tool.id)}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-heading">
        <Link to={"/tools/" + tool.id}>
          <h3>{tool.name}</h3>
        </Link>
        {tool.trending && (
          <TrendingUp
            size={15}
            className="trend-icon"
            aria-label="Trending editorial pick"
          />
        )}
      </div>
      <p>{tool.description}</p>
      <div className="card-tags">
        <span>{tool.category}</span>
        {!featured && tool.capabilities?.[0] && tool.capabilities[0] !== tool.category && (
          <span>{tool.capabilities[0]}</span>
        )}
      </div>
      <div className="card-bottom">
        <span className={`pricing ${(tool.pricing || "").toLowerCase()}`}>
          <i />
          {tool.pricing || "Free"}
        </span>
        <button
          onClick={() => onQuickView(tool)}
          className="text-button"
          aria-label={`Explore ${tool.name}`}
        >
          Explore <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
