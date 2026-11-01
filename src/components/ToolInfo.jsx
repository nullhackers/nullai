import { Link } from "react-router-dom";
import { ArrowUpRight, Bookmark, Check, ArrowRight } from "lucide-react";
import ToolLogo from "./ToolLogo";
export default function ToolInfo({ tool, saved, toggle, compact = false }) {
  return (
    <>
      <div className="detail-top">
        <ToolLogo tool={tool} large />
        <span className={`pricing ${(tool.pricing || "").toLowerCase()}`}>
          <i />
          {tool.pricing || "Free"}
        </span>
      </div>
      <span className="section-kicker">{(tool.category || "").toUpperCase()}</span>
      <h1 className="detail-title">{tool.name}</h1>
      <p className="detail-description">{tool.description}</p>
      <div className="detail-actions">
        {tool.website && (
          <a
            className="primary-button"
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website <ArrowUpRight size={18} />
          </a>
        )}
        <button
          className="secondary-button"
          onClick={() => toggle(tool.id)}
          aria-pressed={saved}
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save tool"}
        </button>
      </div>
      <div className="detail-columns">
        <div>
          <h3>What you can do</h3>
          <ul className="feature-list">
            {(tool.features || []).map((f) => (
              <li key={f}>
                <Check size={16} />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Made for moments like</h3>
          <ul className="use-cases">
            {(tool.useCases || []).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      {tool.model && (
        <div className="model-info">
          <span>AI model</span>
          <strong>{tool.model}</strong>
        </div>
      )}
      <div className="card-tags">
        {(tool.tags || [])
          .filter(
            (t, i, a) =>
              a.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i,
          )
          .map((t) => (
            <span key={t}>{t}</span>
          ))}
      </div>
      <p className="data-note">
        Curated sample listing. Availability, model names, and pricing can
        change. Check the official website for current details.
      </p>
      {compact && (
        <Link className="subtle-link" to={"/tools/" + tool.id}>
          View full tool profile <ArrowRight size={16} />
        </Link>
      )}
    </>
  );
}
