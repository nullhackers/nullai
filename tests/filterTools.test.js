import { test } from "node:test";
import assert from "node:assert/strict";
import { filterTools } from "../src/utils/filterTools.js";

const tools = [
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    description: "Creative generative AI for images and design assets.",
    category: "Design",
    pricing: "Freemium",
    website: "https://firefly.adobe.com",
    model: "Firefly",
    icon: "Palette",
    color: "#e1251b",
    capabilities: ["Design"],
    featured: true,
    trending: false,
    rank: 10,
    addedAt: "2026-09-01",
    tags: ["design", "image"],
    features: ["Image generation", "Text effects"],
    useCases: ["Create images", "Design assets"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description:
      "Your versatile thinking partner. Write, brainstorm, code, and solve everyday problems in one conversation.",
    category: "Productivity",
    pricing: "Freemium",
    website: "https://chatgpt.com",
    model: "OpenAI models",
    icon: "MessageSquare",
    color: "#57aa8b",
    capabilities: ["Chat", "Writing", "Code"],
    featured: true,
    trending: true,
    rank: 1,
    addedAt: "2026-09-02",
    tags: ["productivity", "video", "image"],
    features: ["Chat workflows", "video"],
    useCases: ["Brainstorm ideas"],
  },
  {
    id: "claude",
    name: "Claude",
    description:
      "A thoughtful collaborator for deep work. Turn complex ideas into clear writing, analysis, and reliable code.",
    category: "Writing",
    pricing: "Freemium",
    website: "https://claude.ai",
    model: "Claude models",
    icon: "Sparkles",
    color: "#ce9176",
    capabilities: ["Chat", "Writing", "Code"],
    featured: true,
    trending: true,
    rank: 2,
    addedAt: "2026-09-03",
    tags: ["writing"],
    features: ["Writing workflows"],
    useCases: ["Draft writing"],
  },
  {
    id: "cursor",
    name: "Cursor",
    description:
      "An AI-powered code editor built for rapid software development.",
    category: "Coding",
    pricing: "Freemium",
    website: "https://cursor.com",
    model: "Claude / GPT",
    icon: "Terminal",
    color: "#60a5fa",
    capabilities: ["Code"],
    featured: true,
    trending: true,
    rank: 3,
    addedAt: "2026-09-04",
    tags: ["coding", "Code"],
    features: ["Code editor", "inline edits"],
    useCases: ["Write code"],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "Your AI pair programmer helping you write code faster.",
    category: "Coding",
    pricing: "Freemium",
    website: "https://github.com",
    model: "OpenAI",
    icon: "Code",
    color: "#818cf8",
    capabilities: ["Code"],
    featured: false,
    trending: false,
    rank: 4,
    addedAt: "2026-09-05",
    tags: ["coding", "Code"],
    features: ["Autocomplete"],
    useCases: ["Pair programming"],
  },
  {
    id: "runway",
    name: "Runway",
    description:
      "Next-generation video creation and multimodal editing tools.",
    category: "Video",
    pricing: "Paid",
    website: "https://runwayml.com",
    model: "Gen-3",
    icon: "Film",
    color: "#c084fc",
    capabilities: ["Video"],
    featured: true,
    trending: true,
    rank: 5,
    addedAt: "2026-09-06",
    tags: ["video", "image"],
    features: ["Video generation", "image"],
    useCases: ["Edit video"],
  },
];

test("catalog has unique IDs and valid required data", () => {
  assert.equal(new Set(tools.map((t) => t.id)).size, tools.length);
  for (const t of tools) {
    for (const key of [
      "id",
      "name",
      "description",
      "category",
      "website",
      "model",
      "icon",
      "color",
      "addedAt",
    ])
      assert.equal(typeof t[key], "string");
    assert.equal(new URL(t.website).protocol, "https:");
    assert(["Free", "Freemium", "Paid"].includes(t.pricing));
    for (const key of ["tags", "features", "useCases", "capabilities"])
      assert(Array.isArray(t[key]));
    assert.equal(typeof t.featured, "boolean");
    assert.equal(typeof t.trending, "boolean");
    assert.equal(typeof t.rank, "number");
  }
});

test("empty search returns full catalog", () =>
  assert.equal(filterTools(tools, {}).length, tools.length));

test("search matches every requested field", () => {
  const fields = [
    "name",
    "description",
    "category",
    "tags",
    "features",
    "model",
    "useCases",
  ];
  for (const f of fields) {
    const t = tools[0],
      v = Array.isArray(t[f]) ? t[f][0] : t[f];
    assert(
      filterTools(tools, { query: v }).some((x) => x.id === t.id),
      f,
    );
  }
});

test("search is case insensitive and ignores outside whitespace", () =>
  assert.deepEqual(
    filterTools(tools, { query: "  CODING " }),
    filterTools(tools, { query: "coding" }),
  ));

test("category, pricing and capabilities compose", () => {
  const result = filterTools(tools, {
    category: "Coding",
    pricing: "Freemium",
    capability: "Code",
  });
  assert.equal(result.length, 2);
  assert(
    result.every(
      (t) =>
        t.category === "Coding" &&
        t.pricing === "Freemium" &&
        t.capabilities.includes("Code"),
    ),
  );
});

test("saved-only intersects other filters", () => {
  assert.deepEqual(
    filterTools(tools, {
      savedOnly: true,
      saved: ["cursor", "runway"],
      category: "Coding",
    }).map((t) => t.id),
    ["cursor"],
  );
  assert.equal(filterTools(tools, { savedOnly: true }).length, 0);
});

test("all query terms must match", () => {
  assert(filterTools(tools, { query: "video image" }).length > 0);
  assert.equal(filterTools(tools, { query: "video zzzunlikely" }).length, 0);
});

test("A–Z, recent, trending and recommended sort correctly", () => {
  const az = filterTools(tools, { sort: "A–Z" });
  assert.equal(az[0].name, "Adobe Firefly");
  const recent = filterTools(tools, { sort: "Recently added" });
  assert.equal(
    recent[0].addedAt,
    [...tools]
      .map((t) => t.addedAt)
      .sort()
      .at(-1),
  );
  const trending = filterTools(tools, { sort: "Trending" });
  assert(trending[0].trending);
  assert(
    filterTools(tools, {}).every((t, i, a) => !i || t.rank >= a[i - 1].rank),
  );
});

test("filtering never mutates the source JSON array", () => {
  const before = JSON.stringify(tools);
  filterTools(tools, { sort: "A–Z" });
  assert.equal(JSON.stringify(tools), before);
});

test("null-safety: handles null or undefined tools and options gracefully", () => {
  assert.deepEqual(filterTools(null, {}), []);
  assert.deepEqual(filterTools(undefined, {}), []);
  assert.equal(filterTools(tools, null).length, tools.length);
  assert.equal(filterTools(tools, undefined).length, tools.length);
  const dirty = [{ id: "incomplete", name: "Incomplete" }];
  assert.equal(filterTools(dirty, { query: "incomplete" }).length, 1);
  assert.equal(filterTools(dirty, { category: "Coding" }).length, 0);
});
