import { Search, X, ArrowUpRight } from "lucide-react";
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  hero = false,
  inputRef,
}) {
  return (
    <form
      className={`search-box ${hero ? "hero-search" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      role="search"
    >
      <Search size={21} />
      <input
        ref={inputRef}
        aria-label="Search AI tools"
        type="search"
        placeholder={
          hero
            ? "What will you create today?"
            : "Search tools, ideas, or capabilities…"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
      {hero && (
        <button
          className="search-submit"
          type="submit"
          aria-label="Explore search results"
        >
          <ArrowUpRight size={22} />
        </button>
      )}
    </form>
  );
}
