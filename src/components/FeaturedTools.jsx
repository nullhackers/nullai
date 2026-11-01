import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ToolCard from "./ToolCard";
export default function FeaturedTools({ tools = [], saved = [], toggle, onQuickView }) {
  const safeTools = Array.isArray(tools) ? tools : [];
  const safeSaved = Array.isArray(saved) ? saved : [];
  return (
    <section className="container featured-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker">
            <Sparkles size={15} /> THE SHORTLIST
          </div>
          <h2>
            Featured AI tools<span className="heading-dot">.</span>
          </h2>
        </div>
        <Link to="/tools" className="subtle-link">
          Explore all tools <ArrowRight size={16} />
        </Link>
      </div>
      <div className="featured-grid">
        {safeTools
          .filter((t) => t.featured)
          .slice(0, 6)
          .map((t) => (
            <ToolCard
              key={t.id}
              tool={t}
              featured
              saved={safeSaved.includes(t.id)}
              toggle={toggle}
              onQuickView={onQuickView}
            />
          ))}
      </div>
    </section>
  );
}
