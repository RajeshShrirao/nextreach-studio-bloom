/**
 * NextReach Chat Widget — embeddable standalone JS
 *
 * Usage:
 *   <script>
 *     (function() {
 *       var s = document.createElement('script');
 *       s.src = 'https://nextreachstudio.com/widget.js';
 *       s.setAttribute('data-client-id', 'bark-and-bark');
 *       s.setAttribute('data-api-base', 'https://nextreachstudio.com');
 *       document.head.appendChild(s);
 *     })();
 *   </script>
 */
(function () {
  "use strict";
  if (window.NextReachChat) return;

  var script =
    document.currentScript ||
    document.querySelector("script[data-client-id]");
  if (!script) return;

  var CLIENT_ID = script.getAttribute("data-client-id") || "";
  var API_BASE = (script.getAttribute("data-api-base") || "").replace(/\/+$/, "");
  var POSITION = script.getAttribute("data-position") || "bottom-right";
  var PRIMARY_COLOR = script.getAttribute("data-primary-color") || "#FBBF24";

  if (!CLIENT_ID) {
    console.warn("[NextReachChat] Missing data-client-id.");
    return;
  }

  /* ───── state ───── */
  var config = null;
  var messages = [];
  var isOpen = false;
  var isLoading = false;

  /* ───── DOM refs ───── */
  var container = null;
  var buttonEl = null;
  var panelEl = null;
  var messagesEl = null;
  var inputEl = null;
  var sendBtnEl = null;

  /* ───── helpers ───── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs)
      for (var k in attrs) {
        if (k === "style" && typeof attrs[k] === "object") {
          for (var s in attrs[k]) node.style[s] = attrs[k][s];
        } else if (k === "className") {
          node.className = attrs[k];
        } else if (k.startsWith("on")) {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else {
          node.setAttribute(k, attrs[k]);
        }
      }
    if (children) {
      if (typeof children === "string") node.textContent = children;
      else if (Array.isArray(children))
        children.forEach(function (c) { if (c) node.appendChild(c); });
    }
    return node;
  }

  function scrollToBottom() {
    if (messagesEl)
      requestAnimationFrame(function () {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
  }

  /* ───── styles ───── */
  function injectStyles() {
    var css = document.createElement("style");
    css.setAttribute("data-nr-chat", "");
    css.textContent = [
      /* reset scope */
      "#nr-chat-container *{box-sizing:border-box;margin:0;padding:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}",

      /* ── floating button ── */
      "#nr-chat-btn{position:fixed;z-index:2147483647;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(251,191,36,0.2);transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease-out;background:" + PRIMARY_COLOR + ";color:#000}",
      "#nr-chat-btn:hover{transform:scale(1.03);box-shadow:0 6px 32px rgba(251,191,36,0.3)}",
      "#nr-chat-btn:active{transform:scale(.97)}",
      POSITION === "bottom-left"
        ? "#nr-chat-btn{bottom:20px;left:20px}"
        : "#nr-chat-btn{bottom:20px;right:20px}",

      /* ── panel ── */
      "#nr-chat-panel{position:fixed;z-index:2147483646;width:360px;max-width:calc(100vw - 32px);height:480px;max-height:70vh;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;background:#0a0a0a;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.02) inset;opacity:0;transform:translateY(13px) scale(.96);pointer-events:none;transition:opacity .25s ease-out,transform .25s cubic-bezier(.34,1.56,.64,1)}",
      "#nr-chat-panel.nr-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}",
      POSITION === "bottom-left"
        ? "#nr-chat-panel{bottom:88px;left:20px}"
        : "#nr-chat-panel{bottom:88px;right:20px}",

      /* ── header ── */
      "#nr-chat-hdr{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(251,191,36,0.06);display:flex;align-items:center;gap:12px}",
      "#nr-chat-hdr .nr-icon-wrap{width:36px;height:36px;min-width:36px;border-radius:10px;background:rgba(251,191,36,0.2);display:flex;align-items:center;justify-content:center}",
      "#nr-chat-hdr .nr-icon-wrap svg{color:" + PRIMARY_COLOR + ";width:20px;height:20px}",
      "#nr-chat-hdr .nr-info h3{color:#fff;font-size:14px;font-weight:500;line-height:1.3;margin:0}",
      "#nr-chat-hdr .nr-info p{color:#71717a;font-size:12px;line-height:1.3;margin:2px 0 0}",

      /* ── messages ── */
      "#nr-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}",
      "#nr-chat-msgs::-webkit-scrollbar{width:4px}",
      "#nr-chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px}",
      ".nr-m{max-width:82%;padding:10px 14px;border-radius:16px;font-size:13px;line-height:1.5;word-wrap:break-word}",
      ".nr-m-u{align-self:flex-end;background:" + PRIMARY_COLOR + ";color:#000;border-bottom-right-radius:4px;font-weight:500}",
      ".nr-m-b{align-self:flex-start;background:rgba(255,255,255,0.05);color:#a1a1aa;border:1px solid rgba(255,255,255,0.05);border-bottom-left-radius:4px}",

      /* ── typing indicator ── */
      ".nr-typ{align-self:flex-start;padding:12px 18px;border-radius:16px;border-bottom-left-radius:4px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05)}",
      ".nr-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:rgba(251,191,36,0.5);margin-right:4px;animation:nrBounce 1.2s infinite}",
      ".nr-dot:nth-child(2){animation-delay:.15s}",
      ".nr-dot:nth-child(3){animation-delay:.3s;margin-right:0}",
      "@keyframes nrBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}",

      /* ── input area ── */
      "#nr-chat-inarea{padding:12px;border-top:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.015);display:flex;gap:8px}",
      "#nr-chat-in{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px 14px;color:#fff;font-size:14px;outline:none;transition:border-color .2s ease-out;min-height:44px;font-family:inherit}",
      "#nr-chat-in::placeholder{color:#52525b}",
      "#nr-chat-in:focus{border-color:rgba(251,191,36,0.25);box-shadow:0 0 0 2px rgba(251,191,36,0.25)}",
      "#nr-chat-snd{width:44px;height:44px;min-width:44px;border-radius:12px;border:none;background:" + PRIMARY_COLOR + ";color:#000;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s,transform .15s}",
      "#nr-chat-snd:hover{background:#F59E0B}",
      "#nr-chat-snd:active{transform:scale(.95)}",
      "#nr-chat-snd:disabled{opacity:.3;cursor:not-allowed}",

      /* ── mobile fullscreen ── */
      "@media(max-width:480px){#nr-chat-panel{width:100vw!important;height:100vh!important;max-height:100vh!important;border-radius:0!important;inset:0!important;position:fixed!important}}",

      /* ── reduced motion ── */
      "@media(prefers-reduced-motion:reduce){#nr-chat-panel,#nr-chat-btn,.nr-dot{transition-duration:.01ms!important;animation-duration:.01ms!important}}",
    ].join("\n");
    document.head.appendChild(css);
  }

  /* ───── SVG icons ───── */
  var ICON_CHAT =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var ICON_CLOSE =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_SEND =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  /* ───── build DOM ───── */
  function buildUI() {
    if (container) return;
    injectStyles();

    var bizName = (config && config.business_name) || "Chat";

    /* button */
    buttonEl = el("button", { id: "nr-chat-btn", "aria-label": "Open chat" });
    buttonEl.innerHTML = ICON_CHAT;

    /* panel */
    panelEl = el("div", { id: "nr-chat-panel" });

    /* header */
    var header = el("div", { id: "nr-chat-hdr" });
    var iconWrap = el("div", { className: "nr-icon-wrap" });
    iconWrap.innerHTML = ICON_CHAT;
    var info = el("div", { className: "nr-info" });
    var titleEl = el("h3", {}, bizName);
    var subEl = el("p", {}, "Usually replies instantly");
    info.appendChild(titleEl);
    info.appendChild(subEl);
    header.appendChild(iconWrap);
    header.appendChild(info);

    /* messages */
    messagesEl = el("div", { id: "nr-chat-msgs" });

    /* input */
    inputEl = el("input", {
      id: "nr-chat-in",
      type: "text",
      placeholder: "Type your message\u2026",
      autocomplete: "off",
      "aria-label": "Type your message",
    });
    sendBtnEl = el("button", { id: "nr-chat-snd", "aria-label": "Send message", disabled: "true" });
    sendBtnEl.innerHTML = ICON_SEND;

    var inputArea = el("div", { id: "nr-chat-inarea" });
    inputArea.appendChild(inputEl);
    inputArea.appendChild(sendBtnEl);

    panelEl.appendChild(header);
    panelEl.appendChild(messagesEl);
    panelEl.appendChild(inputArea);

    /* container */
    container = el("div", { id: "nr-chat-container" });
    container.appendChild(buttonEl);
    container.appendChild(panelEl);
    document.body.appendChild(container);

    /* events */
    buttonEl.addEventListener("click", toggle);
    sendBtnEl.addEventListener("click", send);
    inputEl.addEventListener("input", function () {
      sendBtnEl.disabled = !inputEl.value.trim() || isLoading;
    });
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
  }

  /* ───── toggle ───── */
  function toggle() { isOpen ? close() : open(); }

  function open() {
    if (!panelEl) return;
    isOpen = true;
    panelEl.classList.add("nr-open");
    buttonEl.innerHTML = ICON_CLOSE;
    buttonEl.setAttribute("aria-label", "Close chat");
    inputEl.focus();
  }

  function close() {
    if (!panelEl) return;
    isOpen = false;
    panelEl.classList.remove("nr-open");
    buttonEl.innerHTML = ICON_CHAT;
    buttonEl.setAttribute("aria-label", "Open chat");
  }

  function destroy() {
    if (container && container.parentNode) container.parentNode.removeChild(container);
    container = null;
    buttonEl = null;
    panelEl = null;
    messagesEl = null;
    inputEl = null;
    sendBtnEl = null;
    isOpen = false;
    messages = [];
  }

  /* ───── messages ───── */
  function appendMessage(role, text) {
    var cls = role === "user" ? "nr-m nr-m-u" : "nr-m nr-m-b";
    var node = el("div", { className: cls }, text);
    messagesEl.appendChild(node);
    scrollToBottom();
  }

  function showTyping() {
    var node = el("div", { className: "nr-typ", id: "nr-typing" });
    node.innerHTML = '<span class="nr-dot"></span><span class="nr-dot"></span><span class="nr-dot"></span>';
    messagesEl.appendChild(node);
    scrollToBottom();
  }

  function hideTyping() {
    var t = document.getElementById("nr-typing");
    if (t) t.remove();
  }

  /* ───── send ───── */
  function send() {
    var text = inputEl.value.trim();
    if (!text || isLoading) return;

    messages.push({ role: "user", content: text });
    appendMessage("user", text);
    inputEl.value = "";
    sendBtnEl.disabled = true;
    isLoading = true;
    showTyping();

    fetch(API_BASE + "/api/widget/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: CLIENT_ID, messages: messages.map(function (m) { return { role: m.role, content: m.content }; }) }),
    })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(function (data) {
        hideTyping();
        var reply = data.reply || "Sorry, I had trouble processing that. Can you try again?";
        messages.push({ role: "assistant", content: reply });
        appendMessage("assistant", reply);
      })
      .catch(function () {
        hideTyping();
        var fallback = (config && config.escalation) || "Sorry, I\u2019m having trouble connecting. Please try again later.";
        messages.push({ role: "assistant", content: fallback });
        appendMessage("assistant", fallback);
      })
      .finally(function () {
        isLoading = false;
        sendBtnEl.disabled = !inputEl.value.trim();
      });
  }

  /* ───── load config ───── */
  function loadConfig() {
    fetch(API_BASE + "/api/widget/config/" + encodeURIComponent(CLIENT_ID))
      .then(function (res) { if (!res.ok) throw new Error("Config not found"); return res.json(); })
      .then(function (data) {
        config = data;
        if (config.theme && config.theme.position && !script.getAttribute("data-position")) POSITION = config.theme.position;
        if (config.theme && config.theme.primary_color && !script.getAttribute("data-primary-color")) PRIMARY_COLOR = config.theme.primary_color;
        buildUI();
        if (config.greeting) { messages.push({ role: "assistant", content: config.greeting }); appendMessage("assistant", config.greeting); }
      })
      .catch(function () {
        buildUI();
        messages.push({ role: "assistant", content: "Hi! How can I help you today?" });
        appendMessage("assistant", "Hi! How can I help you today?");
      });
  }

  /* ───── public API ───── */
  window.NextReachChat = { open: open, close: close, destroy: destroy };

  /* ───── init ───── */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadConfig);
  else loadConfig();
})();
