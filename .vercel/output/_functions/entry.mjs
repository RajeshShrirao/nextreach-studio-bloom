import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_WN7cRmUc.mjs';
import { manifest } from './manifest_C-y2x4Kk.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/chat.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page4 = () => import('./pages/guides.astro.mjs');
const _page5 = () => import('./pages/guides/_---slug_.astro.mjs');
const _page6 = () => import('./pages/resources.astro.mjs');
const _page7 = () => import('./pages/resources/_---slug_.astro.mjs');
const _page8 = () => import('./pages/rss.xml.astro.mjs');
const _page9 = () => import('./pages/tools/ai-token-calculator.astro.mjs');
const _page10 = () => import('./pages/tools/context-window-calculator.astro.mjs');
const _page11 = () => import('./pages/tools/llm-cost-calculator.astro.mjs');
const _page12 = () => import('./pages/tools/prompt-formatter.astro.mjs');
const _page13 = () => import('./pages/tools/vram-estimator.astro.mjs');
const _page14 = () => import('./pages/tools.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/chat.ts", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/blog/[...slug].astro", _page3],
    ["src/pages/guides/index.astro", _page4],
    ["src/pages/guides/[...slug].astro", _page5],
    ["src/pages/resources/index.astro", _page6],
    ["src/pages/resources/[...slug].astro", _page7],
    ["src/pages/rss.xml.ts", _page8],
    ["src/pages/tools/ai-token-calculator.astro", _page9],
    ["src/pages/tools/context-window-calculator.astro", _page10],
    ["src/pages/tools/llm-cost-calculator.astro", _page11],
    ["src/pages/tools/prompt-formatter.astro", _page12],
    ["src/pages/tools/vram-estimator.astro", _page13],
    ["src/pages/tools/index.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "16e65a32-99da-47a7-a4e7-aa9bec708484",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
