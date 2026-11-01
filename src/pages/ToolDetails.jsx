import { useParams, Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import ToolInfo from "../components/ToolInfo";
import ToolGrid from "../components/ToolGrid";
export default function ToolDetails({ tools = [], loading, error, retry, saved, toggle, onQuickView }) {
  const { id } = useParams();

  if (loading) {
    return (
      <section className="container detail-page loading-state">
        <div className="loading-spinner" />
        <p>Loading tool details…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container detail-page error-state">
        <h2>Unable to load AI tools</h2>
        <p>{error}</p>
        <button className="primary-button" onClick={retry}>
          <RefreshCw size={17} /> Try again
        </button>
      </section>
    );
  }

  const tool = tools.find((t) => t.id === id);
  if (!tool)
    return (
      <section className="container not-found">
        <h1>Tool not found.</h1>
        <p>This tool may have moved beyond our reach.</p>
        <Link className="primary-button" to="/tools">
          Back to the directory
        </Link>
      </section>
    );
  const related = tools
    .filter((t) => t.category === tool.category && t.id !== id)
    .slice(0, 3);
  return (
    <section className="container detail-page">
      <Link to="/tools" className="subtle-link back-link">
        <ArrowLeft size={17} /> Back to the directory
      </Link>
      <div className="detail-surface">
        <ToolInfo tool={tool} saved={saved.includes(tool.id)} toggle={toggle} />
      </div>
      {related.length > 0 && (
        <section className="related-tools">
          <div className="section-heading">
            <h2>Keep exploring {tool.category.toLowerCase()}.</h2>
          </div>
          <ToolGrid
            tools={related}
            saved={saved}
            toggle={toggle}
            onQuickView={onQuickView}
          />
        </section>
      )}
    </section>
  );
}
