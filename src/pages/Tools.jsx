import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Bookmark, X, ArrowUpRight, RefreshCw } from "lucide-react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import { filterTools } from "../utils/filterTools";
export default function Tools({
  tools = [],
  loading = false,
  error = null,
  retry,
  saved,
  toggle,
  onQuickView,
  embedded = false,
}) {
  const [params, setParams] = useSearchParams();
  const [local, setLocal] = useState({});
  const inputRef = useRef(null);
  const get = (key, fallback) =>
    embedded ? (local[key] ?? fallback) : params.get(key) || fallback;
  const query = get("q", ""),
    category = get("category", "All tools"),
    pricing = get("pricing", "All pricing"),
    capability = get("capability", "All capabilities"),
    sort = get("sort", "Recommended"),
    savedOnly = get("saved", "false") === "true";
  const set = (key, value) => {
    if (embedded) setLocal((p) => ({ ...p, [key]: value }));
    else
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(key, value);
          return next;
        },
        { replace: true },
      );
  };
  const reset = () => (embedded ? setLocal({}) : setParams({}));
  const categories = useMemo(
      () => [...new Set(tools.map((t) => t.category))],
      [tools],
    ),
    capabilities = useMemo(
      () => [...new Set(tools.flatMap((t) => t.capabilities || []))].sort(),
      [tools],
    );
  const results = filterTools(tools, {
    query,
    category,
    pricing,
    capability,
    sort,
    savedOnly,
    saved,
  });
  const active =
    query ||
    category !== "All tools" ||
    pricing !== "All pricing" ||
    capability !== "All capabilities" ||
    savedOnly;
  useEffect(() => {
    if (!embedded && params.get("focus") === "search")
      inputRef.current?.focus();
    if (!embedded && params.get("section") === "categories")
      document
        .getElementById("categories")
        ?.scrollIntoView({ block: "center" });
  }, [params, embedded]);

  /* Loading state (standalone page only) */
  if (!embedded && loading) {
    return (
      <section className="container directory-section directory-page loading-state">
        <div className="loading-spinner" />
        <p>Loading AI tools…</p>
      </section>
    );
  }

  /* Error state (standalone page only) */
  if (!embedded && error) {
    return (
      <section className="container directory-section directory-page error-state">
        <h2>Unable to load AI tools</h2>
        <p>{error}</p>
        <button className="primary-button" onClick={retry}>
          <RefreshCw size={17} /> Try again
        </button>
      </section>
    );
  }

  return (
    <section
      className={`container directory-section ${!embedded ? "directory-page" : ""}`}
      id="directory"
    >
      <div className="section-heading">
        <div>
          <div className="section-kicker">FIND YOUR NEXT FAVORITE</div>
          <h2>
            {savedOnly ? "Your saved tools" : "Explore AI tools"}
            <span className="heading-dot">.</span>
          </h2>
          <p className="section-description">
            Less searching. More possibilities.
          </p>
        </div>
        {embedded && (
          <button
            className="directory-label"
            style={{ background: "transparent" }}
            onClick={() =>
              document.getElementById("directory")?.scrollIntoView()
            }
          >
            THE DIRECTORY <ArrowUpRight size={15} />
          </button>
        )}
      </div>
      <CategoryFilter
        categories={categories}
        value={category}
        onChange={(v) => set("category", v)}
        tools={tools}
      />
      <div className="filter-toolbar">
        <SearchBar
          inputRef={inputRef}
          value={query}
          onChange={(v) => set("q", v)}
        />
        <div className="filter-selects">
          <label className="select-wrap">
            <SlidersHorizontal size={16} />
            <select
              value={pricing}
              aria-label="Filter by pricing"
              onChange={(e) => set("pricing", e.target.value)}
            >
              {["All pricing", "Free", "Freemium", "Paid"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="select-wrap capability-select">
            <select
              value={capability}
              aria-label="Filter by capability"
              onChange={(e) => set("capability", e.target.value)}
            >
              {["All capabilities", ...capabilities].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <button
            className={`saved-filter ${savedOnly ? "active" : ""}`}
            onClick={() => set("saved", savedOnly ? "false" : "true")}
            aria-label="Show only saved tools"
            aria-pressed={savedOnly}
          >
            <Bookmark size={17} />
            <span>Saved</span>
          </button>
        </div>
      </div>
      <div className="results-bar">
        <div aria-live="polite">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "tool" : "tools"} to explore
          {active && (
            <button className="reset-button" onClick={reset}>
              Clear filters <X size={13} />
            </button>
          )}
        </div>
        <label>
          Sort by{" "}
          <select
            value={sort}
            aria-label="Sort tools"
            onChange={(e) => set("sort", e.target.value)}
          >
            {["Recommended", "Trending", "Recently added", "A–Z"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <ToolGrid
        tools={results}
        saved={saved}
        toggle={toggle}
        onQuickView={onQuickView}
        reset={reset}
      />
      <p className="catalog-note">
        A curated starter collection. "Trending" reflects editorial picks, not
        live usage data. Pricing labels are indicative; verify current plans
        with each provider.
      </p>
    </section>
  );
}
