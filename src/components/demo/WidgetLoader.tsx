"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    NextReachChat?: { open: () => void; close: () => void; destroy: () => void };
  }
}

export default function WidgetLoader({ clientId }: { clientId: string }) {
  useEffect(() => {
    // Prevent double-init
    if (document.getElementById("nr-chat-container")) return;

    const s = document.createElement("script");
    s.src = "/widget.js";
    s.setAttribute("data-client-id", clientId);
    s.setAttribute("data-api-base", window.location.origin);
    document.head.appendChild(s);

    return () => {
      // Cleanup on unmount
      if (window.NextReachChat) window.NextReachChat.destroy();
      s.remove();
    };
  }, [clientId]);

  return null;
}
