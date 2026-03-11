import { readFile, writeFile } from "node:fs/promises";

const iframePath = new URL("../docs/iframe.html", import.meta.url);
const repoBasePath = "/account-management-prototypes";
const wrongPath = 'src="/vite-inject-mocker-entry.js"';
const correctPath = `src="${repoBasePath}/vite-inject-mocker-entry.js"`;

const iframeHtml = await readFile(iframePath, "utf8");

if (!iframeHtml.includes(wrongPath)) {
  process.exit(0);
}

await writeFile(iframePath, iframeHtml.replace(wrongPath, correctPath));
