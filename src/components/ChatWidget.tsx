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
        "Hi! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please try again.",
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
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-[#c76b50] text-white flex items-center justify-center shadow-[0_4px_24px_rgba(199,107,80,0.35)] hover:shadow-[0_6px_32px_rgba(199,107,80,0.45)] hover:bg-[#d97a5e] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? (
          <X size={20} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat"
          className="fixed bottom-0 right-0 sm:bottom-24 sm:right-5 z-[60] w-full sm:w-[360px] h-[80dvh] sm:h-[480px] sm:max-h-[75vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden border-t border-x-0 border-b-0 sm:border border-[#1F1F23]/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in"
        >
          <div className="px-4 py-3.5 border-b border-[#1F1F23]/10 bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c76b50]/10 flex items-center justify-center border border-[#c76b50]/20">
                <MessageCircle className="w-5 h-5 text-[#c76b50]" />
              </div>
              <div>
                <p className="text-[#1F1F23] text-[14px] font-display font-semibold">
                  NextReach AI
                </p>
                <p className="text-[#6E6862] text-[12px] font-mono">
                  Usually replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-[#6E6862] hover:text-[#1F1F23] hover:bg-[#1F1F23]/5 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/30">
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
                      ? "bg-[#c76b50] text-white rounded-br-md font-medium shadow-sm"
                      : "bg-white text-[#1F1F23] rounded-bl-md border border-[#1F1F23]/8 shadow-xs"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#1F1F23]/8 px-4 py-3 rounded-2xl rounded-bl-md shadow-xs">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c76b50]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#c76b50]/60 animate-bounce" style={{ animationDelay: '100ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#c76b50]/60 animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <div className="p-3 border-t border-[#1F1F23]/10 bg-[#FAF8F5]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white border border-[#1F1F23]/15 rounded-xl px-3.5 py-2.5 text-[14px] text-[#1F1F23] placeholder:text-[#9B9790] outline-none focus:ring-2 focus:ring-[#c76b50]/20 focus:border-[#c76b50] transition-all duration-200 min-h-[44px]"
                disabled={loading}
                aria-label="Type your message"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="h-11 min-w-[44px] w-11 rounded-xl bg-[#c76b50] text-white flex items-center justify-center hover:bg-[#d97a5e] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm"
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
