import{a as S,r as l}from"./index.DK-fsZOb.js";var y={exports:{}},b={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j;function E(){if(j)return b;j=1;var t=S(),r=Symbol.for("react.element"),a=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,m=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function x(d,o,h){var i,s={},u=null,p=null;h!==void 0&&(u=""+h),o.key!==void 0&&(u=""+o.key),o.ref!==void 0&&(p=o.ref);for(i in o)n.call(o,i)&&!c.hasOwnProperty(i)&&(s[i]=o[i]);if(d&&d.defaultProps)for(i in o=d.defaultProps,o)s[i]===void 0&&(s[i]=o[i]);return{$$typeof:r,type:d,key:u,ref:p,props:s,_owner:m.current}}return b.Fragment=a,b.jsx=x,b.jsxs=x,b}var _;function A(){return _||(_=1,y.exports=E()),y.exports}var e=A();/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(...t)=>t.filter((r,a,n)=>!!r&&r.trim()!==""&&n.indexOf(r)===a).join(" ").trim();/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,a,n)=>n?n.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=t=>{const r=O(t);return r.charAt(0).toUpperCase()+r.slice(1)};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=t=>{for(const r in t)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1},z=l.createContext({}),$=()=>l.useContext(z),W=l.forwardRef(({color:t,size:r,strokeWidth:a,absoluteStrokeWidth:n,className:m="",children:c,iconNode:x,...d},o)=>{const{size:h=24,strokeWidth:i=2,absoluteStrokeWidth:s=!1,color:u="currentColor",className:p=""}=$()??{},w=n??s?Number(a??i)*24/Number(r??h):a??i;return l.createElement("svg",{ref:o,...g,width:r??h??g.width,height:r??h??g.height,stroke:t??u,strokeWidth:w,className:C("lucide",p,m),...!c&&!I(d)&&{"aria-hidden":"true"},...d},[...x.map(([f,R])=>l.createElement(f,R)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(t,r)=>{const a=l.forwardRef(({className:n,...m},c)=>l.createElement(W,{ref:c,iconNode:r,className:C(`lucide-${L(N(t))}`,`lucide-${t}`,n),...m}));return a.displayName=N(t),a};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],k=v("message-circle",D);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],T=v("send",P);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],J=v("x",q);function U(){const[t,r]=l.useState(!1),[a,n]=l.useState([{role:"assistant",content:"Hi! I'm the NextReach AI receptionist. Ask me anything about our services, pricing, or book a free demo."}]),[m,c]=l.useState(""),[x,d]=l.useState(!1),o=l.useRef(null);l.useEffect(()=>{o.current?.scrollIntoView({behavior:"smooth"})},[a]),l.useEffect(()=>{const s=()=>r(!0);return window.addEventListener("open-chat-widget",s),()=>window.removeEventListener("open-chat-widget",s)},[]);async function h(){const s=m.trim();if(!s||x)return;const u={role:"user",content:s};n(p=>[...p,u]),c(""),d(!0);try{const w=await(await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...a,u].map(f=>({role:f.role,content:f.content}))})})).json();w.reply?n(f=>[...f,{role:"assistant",content:w.reply}]):n(f=>[...f,{role:"assistant",content:"Sorry, something went wrong. Try again or email us at hello@nextreachstudio.com"}])}catch{n(p=>[...p,{role:"assistant",content:"I'm having trouble connecting. You can email us directly at hello@nextreachstudio.com"}])}finally{d(!1)}}function i(s){s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),h())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!t),className:"fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer","aria-label":t?"Close chat":"Open chat","aria-expanded":t,children:t?e.jsx(J,{size:20}):e.jsx(k,{size:24})}),t&&e.jsxs("div",{role:"dialog","aria-label":"Chat with NextReach AI",className:"fixed bottom-24 right-5 z-[60] w-[340px] sm:w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] backdrop-blur-xl shadow-2xl animate-in",children:[e.jsx("div",{className:"px-4 py-3.5 border-b border-white/[0.08] bg-amber-400/[0.06]",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center",children:e.jsx(k,{className:"w-5 h-5 text-amber-400"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-[14px] font-medium",children:"NextReach AI Receptionist"}),e.jsx("p",{className:"text-zinc-500 text-[12px]",children:"Usually replies instantly"})]})]})}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-3",children:[a.map((s,u)=>e.jsx("div",{className:`flex ${s.role==="user"?"justify-end":"justify-start"}`,children:e.jsx("div",{className:`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-[1.5] ${s.role==="user"?"bg-amber-400 text-black rounded-br-md font-medium":"bg-white/[0.05] text-zinc-300 rounded-bl-md border border-white/[0.05]"}`,children:s.content})},u)),x&&e.jsx("div",{className:"flex justify-start",children:e.jsx("div",{className:"bg-white/[0.05] border border-white/[0.05] px-4 py-3 rounded-2xl rounded-bl-md",children:e.jsxs("div",{className:"flex gap-1",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-amber-400/50 animate-bounce",style:{animationDelay:"0ms"}}),e.jsx("span",{className:"w-2 h-2 rounded-full bg-amber-400/50 animate-bounce",style:{animationDelay:"100ms"}}),e.jsx("span",{className:"w-2 h-2 rounded-full bg-amber-400/50 animate-bounce",style:{animationDelay:"200ms"}})]})})}),e.jsx("div",{ref:o})]}),e.jsx("div",{className:"p-3 border-t border-white/[0.08] bg-white/[0.015]",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{type:"text",value:m,onChange:s=>c(s.target.value),onKeyDown:i,placeholder:"Ask about our services...",className:"flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[14px] text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-amber-400/25 focus:border-amber-400/25 transition-all duration-200 min-h-[44px]",disabled:x,"aria-label":"Type your message"}),e.jsx("button",{onClick:h,disabled:x||!m.trim(),"aria-label":"Send message",className:"h-11 min-w-[44px] w-11 rounded-xl bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer",children:e.jsx(T,{size:16})})]})})]})]})}export{U as default};
