export function filterTools(tools = [], options = {}) {
  if (!Array.isArray(tools)) return [];
  const {
    query = "",
    category = "All tools",
    pricing = "All pricing",
    capability = "All capabilities",
    sort = "Recommended",
    savedOnly = false,
    saved = [],
  } = options || {};
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const result = tools.filter((t) => {
    if (!t) return false;
    const text = [
      t.name || "",
      t.description || "",
      t.category || "",
      ...(Array.isArray(t.tags) ? t.tags : []),
      ...(Array.isArray(t.features) ? t.features : []),
      t.model || "",
      ...(Array.isArray(t.useCases) ? t.useCases : []),
      ...(Array.isArray(t.capabilities) ? t.capabilities : []),
    ]
      .join(" ")
      .toLowerCase();
    const caps = Array.isArray(t.capabilities) ? t.capabilities : [];
    return (
      words.every((w) => text.includes(w)) &&
      (category === "All tools" || t.category === category) &&
      (pricing === "All pricing" || t.pricing === pricing) &&
      (capability === "All capabilities" || caps.includes(capability)) &&
      (!savedOnly || saved.includes(t.id))
    );
  });
  return result.sort(
    sort === "A–Z"
      ? (a, b) => (a.name || "").localeCompare(b.name || "")
      : sort === "Recently added"
        ? (a, b) => (b.addedAt || "").localeCompare(a.addedAt || "")
        : sort === "Trending"
          ? (a, b) => Number(b.trending) - Number(a.trending) || (a.rank ?? 999) - (b.rank ?? 999)
          : (a, b) => (a.rank ?? 999) - (b.rank ?? 999),
  );
}
