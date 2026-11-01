import { Link } from "react-router-dom";
import {
  Orbit,
  ArrowUpRight,
  Compass,
  Bookmark,
  ShieldCheck,
} from "lucide-react";
export default function About() {
  return (
    <section className="container about-page">
      <div className="eyebrow">THE IDEA BEHIND NULLAI</div>
      <h1>
        Stay curious.
        <br />
        <span className="gradient-text">Find your edge.</span>
      </h1>
      <p className="about-intro">
        AI moves fast. Finding a useful tool shouldn't feel like a full-time
        job. NullAI is a quieter place to explore what's possible.
      </p>
      <div className="about-grid">
        {[
          [
            Compass,
            "Discovery, without the noise",
            "A focused directory organized around what you want to create. Search by task, explore a category, or follow your curiosity.",
          ],
          [
            Bookmark,
            "A collection of your own",
            "Save the tools that catch your eye. Your collection lives in this browser, with no account required.",
          ],
          [
            ShieldCheck,
            "Clarity over hype",
            "No fabricated ratings or sponsored rankings. Just approachable descriptions, useful capabilities, and direct links.",
          ],
        ].map(([Icon, title, description]) => (
          <article key={title}>
            <Icon size={27} />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="about-notice">
        <Orbit size={30} />
        <div>
          <h3>A thoughtful starting point</h3>
          <p>
            This directory is powered by a curated catalog. Listings aren't
            live-verified; official websites are the source of truth for plans,
            availability, and features. Saved tools and theme preferences stay
            in your browser.
          </p>
        </div>
      </div>
      <Link to="/tools" className="primary-button">
        Find your next tool <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
