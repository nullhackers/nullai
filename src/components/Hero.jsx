import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Code2,
  AudioLines,
  Sparkles,
  Image,
  Orbit,
} from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
export default function Hero({ tools = [] }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const safeTools = Array.isArray(tools) ? tools : [];
  const categories = new Set(safeTools.map((t) => t.category)).size;
  return (
    <section className="hero container">
      <div className="hero-grid" />
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="eyebrow">
          <span className="live-dot" /> A LITTLE CURIOSITY. LIMITLESS
          POSSIBILITIES.
        </div>
        <h1>
          Discover the best
          <br />
          <span className="gradient-text">AI tools.</span>
          <br />
          Find your edge.
        </h1>
        <p className="hero-description">
          Extraordinary tools for your everyday ideas.
          <br className="desktop-break" /> Explore AI for creativity, coding,
          and everything in between.
        </p>
        <SearchBar
          value={q}
          onChange={setQ}
          hero
          onSubmit={() => navigate("/tools?q=" + encodeURIComponent(q))}
        />
        <div className="popular-searches">
          <span>Try searching</span>
          {["Design", "Coding", "Video"].map((x) => (
            <button key={x} onClick={() => navigate("/tools?q=" + x)}>
              {x}
              <ArrowUpRight size={12} />
            </button>
          ))}
        </div>
        <div className="hero-stats">
          <div>
            <strong>{tools.length}</strong>
            <span>Curated tools</span>
          </div>
          <div>
            <strong>{categories}</strong>
            <span>Creative categories</span>
          </div>
          <div>
            <strong>{tools.filter((t) => t.pricing !== "Paid").length}</strong>
            <span>Free to explore</span>
          </div>
        </div>
      </motion.div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit-glow" />
        <div className="orbital orbital-1" />
        <div className="orbital orbital-2" />
        <div className="orbital orbital-3" />
        <div className="orbit-core">
          <Orbit size={66} strokeWidth={1} />
        </div>
        <div className="floating-tool floating-a">
          <Sparkles size={27} />
          <span>Create</span>
        </div>
        <div className="floating-tool floating-b">
          <Code2 size={26} />
          <span>Build</span>
        </div>
        <div className="floating-tool floating-c">
          <Image size={25} />
          <span>Imagine</span>
        </div>
        <div className="floating-tool floating-d">
          <AudioLines size={25} />
          <span>Explore</span>
        </div>
        <div className="art-caption">
          <span className="live-dot" /> YOUR NEXT BIG IDEA STARTS HERE
        </div>
        <i className="star star-1" />
        <i className="star star-2" />
        <i className="star star-3" />
      </div>
    </section>
  );
}
