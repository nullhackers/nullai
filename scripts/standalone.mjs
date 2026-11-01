import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
let html = readFileSync("dist/index.html", "utf8");
html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (_, p) =>
    '<script type="module">' +
    readFileSync(join("dist", p), "utf8").replace(/<\/script/gi, "<\\/script") +
    "</script>",
);
html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
  (_, p) => "<style>" + readFileSync(join("dist", p), "utf8") + "</style>",
);
writeFileSync("nullai-preview.html", html);
console.log("Created nullai-preview.html");
