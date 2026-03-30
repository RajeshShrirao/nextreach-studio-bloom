"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the NextReach AI receptionist. Ask me anything about our services, pricing, or book a free demo.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for open-chat-widget event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat-widget", handler);
    return () => window.removeEventListener("open-chat-widget", handler);
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Try again or email us at hello@nextreachstudio.com",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. You can email us directly at hello@nextreachstudio.com",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button — minimum 44px touch target */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? (
          <X size={20} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with NextReach AI"
          className="fixed bottom-24 right-5 z-[60] w-[340px] sm:w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] backdrop-blur-xl shadow-2xl animate-in"
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-white/[0.08] bg-amber-400/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-[14px] font-medium">
                  NextReach AI Receptionist
                </p>
                <p className="text-zinc-500 text-[12px]">
                  Usually replies instantly
                </p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-[1.5] ${
                    msg.role === "user"
                      ? "bg-amber-400 text-black rounded-br-md font-medium"
                      : "bg-white/[0.05] text-zinc-300 rounded-bl-md border border-white/[0.05]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.05] border border-white/[0.05] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '100ms' }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-white/[0.08] bg-white/[0.015]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[14px] text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-amber-400/25 focus:border-amber-400/25 transition-all duration-200 min-h-[44px]"
                disabled={loading}
                aria-label="Type your message"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="h-11 min-w-[44px] w-11 rounded-xl bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}