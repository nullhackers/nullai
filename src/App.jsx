import { useEffect, useCallback, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToolModal from "./components/ToolModal";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolDetails from "./pages/ToolDetails";
import About from "./pages/About";
import { useTheme } from "./hooks/useTheme";
import { useSaved } from "./hooks/useSaved";
import { useTools } from "./hooks/useTools";
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const { saved, toggle } = useSaved();
  const [modal, setModal] = useState(null);
  const location = useLocation();
  const { tools, loading, error, retry } = useTools();
  const close = useCallback(() => setModal(null), []);
  useEffect(() => {
    setModal(null);
    window.scrollTo({ top: 0 });
    const names = {
      "/": "Discover the best AI tools",
      "/tools": "AI tools directory",
      "/about": "About NullAI",
    };
    document.title = (names[location.pathname] || "Tool profile") + " — NullAI";
  }, [location.pathname]);
  const props = { tools, loading, error, retry, saved, toggle, onQuickView: setModal };
  return (
    <MotionConfig reducedMotion="user">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
          document.getElementById("main").scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <Navbar theme={theme} toggle={toggleTheme} savedCount={saved.length} />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home {...props} />} />
          <Route path="/tools" element={<Tools {...props} />} />
          <Route path="/tools/:id" element={<ToolDetails {...props} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <section className="container not-found">
                <h1>Lost in space?</h1>
                <Link className="primary-button" to="/">
                  Back to NullAI
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      {modal && (
        <ToolModal tool={modal} onClose={close} saved={saved} toggle={toggle} />
      )}
    </MotionConfig>
  );
}
