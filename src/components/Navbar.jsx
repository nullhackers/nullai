import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Orbit, Menu, X, Search, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
export default function Navbar({ theme, toggle, savedCount }) {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="NullAI home">
          <Orbit size={31} strokeWidth={1.4} />
          <span>
            NullAI<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/tools">AI tools</NavLink>
          <Link to="/tools?section=categories">Categories</Link>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="nav-actions">
          <Link
            className="icon-button desktop-action"
            to="/tools?focus=search"
            aria-label="Search tools"
          >
            <Search size={19} />
          </Link>
          <Link className="saved-link desktop-action" to="/tools?saved=true">
            <Bookmark size={17} />
            <span>Saved</span>
            {savedCount > 0 && <span className="count">{savedCount}</span>}
          </Link>
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            className="icon-button mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav container"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Link to="/tools">Explore AI tools</Link>
            <Link to="/tools?section=categories">Categories</Link>
            <Link to="/tools?saved=true">Saved tools ({savedCount})</Link>
            <Link to="/about">About NullAI</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
