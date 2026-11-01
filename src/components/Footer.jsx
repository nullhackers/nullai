import { Orbit, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link className="brand" to="/">
            <Orbit size={26} />
            <span>
              NullAI<span className="brand-dot">.</span>
            </span>
          </Link>
          <p>A world of possibility. One tool away.</p>
        </div>
        <div className="footer-links">
          <Link to="/tools">
            Directory <ArrowUpRight size={13} />
          </Link>
          <Link to="/tools?saved=true">Saved tools</Link>
          <Link to="/about">About NullAI</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NullAI. Stay curious.</span>
        <span>Independently curated · No sponsored rankings</span>
      </div>
    </footer>
  );
}
