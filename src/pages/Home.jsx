import { Link } from "react-router-dom";
import { ArrowUpRight, Orbit, RefreshCw } from "lucide-react";
import Hero from "../components/Hero";
import FeaturedTools from "../components/FeaturedTools";
import Tools from "./Tools";
export default function Home({ tools, loading, error, retry, ...props }) {
  if (loading) {
    return (
      <section className="container loading-state">
        <div className="loading-spinner" />
        <p>Loading AI tools…</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="container error-state">
        <h2>Unable to load AI tools</h2>
        <p>{error}</p>
        <button className="primary-button" onClick={retry}>
          <RefreshCw size={17} /> Try again
        </button>
      </section>
    );
  }
  return (
    <>
      <Hero tools={tools} />
      <FeaturedTools tools={tools} {...props} />
      <Tools tools={tools} embedded {...props} />
      <section className="container">
        <div className="closing-banner">
          <Orbit size={58} strokeWidth={1} />
          <div>
            <span className="section-kicker">
              GOOD TOOLS. BIG POSSIBILITIES.
            </span>
            <h2>Your next idea deserves the right tool.</h2>
            <p>Keep your favorites close. Make something extraordinary.</p>
          </div>
          <Link to="/tools?saved=true" className="secondary-button">
            Your collection <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
