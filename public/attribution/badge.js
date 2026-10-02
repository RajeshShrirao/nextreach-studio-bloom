/**
 * NextReach Studio — Universal Attribution Badge & Embed Script
 * Embed anywhere with:
 * <script src="https://nextreachstudio.vercel.app/attribution/badge.js" data-theme="dark" data-variant="pill" data-client="your-site"></script>
 */
(function () {
  "use strict";

  var script = document.currentScript || document.querySelector("script[src*='attribution/badge.js']");
  var theme = (script && script.getAttribute("data-theme")) || "dark";
  var variant = (script && script.getAttribute("data-variant")) || "pill";
  var phrase = (script && script.getAttribute("data-phrase")) || "Crafted by";
  var client = (script && script.getAttribute("data-client")) || "client-site";
  var position = (script && script.getAttribute("data-position")) || "bottom-right";

  var STUDIO_URL = "https://nextreachstudio.vercel.app/?utm_source=" + encodeURIComponent(client) + "&utm_medium=embed_badge&utm_campaign=attribution";

  var SVG_MARK = '<svg viewBox="0 0 120 150" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="29,38 60,8 91,38" />' +
    '<line x1="60" y1="8" x2="60" y2="142" />' +
    '<path d="M 10,142 L 10,40 Q 10,33 17,37 L 60,142" />' +
    '<path d="M 60,54 C 88,54 110,66 110,83 C 110,100 88,104 60,104" />' +
    '<line x1="60" y1="104" x2="110" y2="142" />' +
    '</svg>';

  var styles = {
    dark: {
      bg: "#18181B",
      border: "rgba(255, 255, 255, 0.12)",
      textSub: "#A1A1AA",
      textBrand: "#FFFFFF",
      accent: "#C76B50",
      markBg: "#27272A",
      shadow: "0 4px 20px rgba(0,0,0,0.4)"
    },
    light: {
      bg: "#FDFBF7",
      border: "rgba(39, 39, 42, 0.15)",
      textSub: "#71717A",
      textBrand: "#18181B",
      accent: "#C76B50",
      markBg: "#F4EFEA",
      shadow: "0 4px 16px rgba(0,0,0,0.06)"
    },
    glass: {
      bg: "rgba(24, 24, 27, 0.75)",
      border: "rgba(255, 255, 255, 0.15)",
      textSub: "#D4D4D8",
      textBrand: "#FFFFFF",
      accent: "#E07A5F",
      markBg: "rgba(255, 255, 255, 0.1)",
      shadow: "0 8px 32px rgba(0,0,0,0.37)"
    },
    terracotta: {
      bg: "#C76B50",
      border: "rgba(255, 255, 255, 0.25)",
      textSub: "rgba(255, 255, 255, 0.85)",
      textBrand: "#FFFFFF",
      accent: "#FFFFFF",
      markBg: "rgba(255, 255, 255, 0.2)",
      shadow: "0 4px 20px rgba(199, 107, 80, 0.35)"
    }
  };

  var activeStyle = styles[theme] || styles.dark;

  function createBadge() {
    var wrapper = document.createElement("div");
    wrapper.id = "nextreach-attribution-root";

    var isFloating = variant === "floating";
    var posStyle = "";
    if (isFloating) {
      posStyle = "position: fixed; " + (position === "bottom-left" ? "left: 20px;" : "right: 20px;") + " bottom: 20px; z-index: 99999;";
    }

    var a = document.createElement("a");
    a.href = STUDIO_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", phrase + " NextReach Studio");

    var baseCSS = 
      "display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif; " +
      "padding: " + (variant === "minimal" ? "4px 8px" : "6px 14px 6px 8px") + "; " +
      "background: " + (variant === "minimal" ? "transparent" : activeStyle.bg) + "; " +
      "border: " + (variant === "minimal" ? "none" : "1px solid " + activeStyle.border) + "; " +
      "border-radius: 9999px; " +
      (theme === "glass" ? "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); " : "") +
      "box-shadow: " + (variant === "minimal" ? "none" : activeStyle.shadow) + "; " +
      "transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; user-select: none;";

    a.style.cssText = baseCSS + posStyle;

    var iconWrapper = document.createElement("span");
    iconWrapper.style.cssText = 
      "display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; " +
      "background: " + activeStyle.markBg + "; color: " + activeStyle.accent + "; flex-shrink: 0; padding: 2px;";
    iconWrapper.innerHTML = SVG_MARK;

    var textSpan = document.createElement("span");
    textSpan.style.cssText = "display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; line-height: 1; letter-spacing: -0.01em;";
    
    var subText = document.createElement("span");
    subText.style.cssText = "color: " + activeStyle.textSub + "; font-weight: 500;";
    subText.textContent = phrase;

    var brandText = document.createElement("span");
    brandText.style.cssText = "color: " + activeStyle.textBrand + "; font-weight: 700;";
    brandText.innerHTML = 'NextReach <span style="color: ' + (theme === "terracotta" ? "#FFFFFF" : activeStyle.accent) + ';">Studio</span>';

    var arrow = document.createElement("span");
    arrow.style.cssText = "color: " + (theme === "terracotta" ? "#FFFFFF" : activeStyle.accent) + "; font-size: 10px; transition: transform 0.2s ease; margin-left: 1px;";
    arrow.innerHTML = "&#8599;";

    textSpan.appendChild(subText);
    textSpan.appendChild(brandText);
    textSpan.appendChild(arrow);

    a.appendChild(iconWrapper);
    a.appendChild(textSpan);

    a.addEventListener("mouseenter", function () {
      a.style.transform = "translateY(-1.5px) scale(1.02)";
      if (variant !== "minimal") {
        a.style.borderColor = activeStyle.accent;
      }
      arrow.style.transform = "translate(1px, -1px)";
    });

    a.addEventListener("mouseleave", function () {
      a.style.transform = "none";
      if (variant !== "minimal") {
        a.style.borderColor = activeStyle.border;
      }
      arrow.style.transform = "none";
    });

    if (script && script.parentNode) {
      script.parentNode.insertBefore(a, script.nextSibling);
    } else {
      document.body.appendChild(a);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createBadge);
  } else {
    createBadge();
  }
})();
