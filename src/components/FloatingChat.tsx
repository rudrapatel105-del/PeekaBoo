import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Percent, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am **Peekaboo**, your virtual early learning assistant. Ask me anything about our Regina childcare center, the Saskatchewan parent fee grant subsidy, our organic vegetarian menu, or how our waitlist operates!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPromptedSubsidy, setHasPromptedSubsidy] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Trigger quick prompt helper
  const handleQuickQuestion = async (question: string) => {
    if (isLoading) return;
    const userMsg: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I faced a brief connection issue. However, I can share that we are a Saskatchewan licensed facility, eligible for the Government Parent Fee Grant that lowers your fees to around $217.50/month! Please call (306) 555-0198 to talk to a physical advisor."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! I couldn't reach the server, but feel free to review our website sections - or contact our Regina admissions leader at hello@peekaboocorner.ca or (306) 555-0198."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tiny exit intent or guidance banner */}
      {!isOpen && !hasPromptedSubsidy && (
        <div className="bg-white text-gray-700 max-w-xs shadow-xl rounded-xl p-3 mb-3 border-l-4 border-[#FF724E] text-xs font-medium relative animate-bounce animate-duration-1000">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasPromptedSubsidy(true);
            }}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-2">
            <span className="text-lg">🇨🇦</span>
            <div>
              <p className="text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-px">Government Grant</p>
              <p className="text-gray-900 font-semibold">Pay just ~$217.50/mo!</p>
              <p className="text-gray-600 font-normal">Ask me how our Regina licensing works.</p>
              <button 
                onClick={() => {
                  setIsOpen(true);
                  setHasPromptedSubsidy(true);
                  handleQuickQuestion("How does the Saskatchewan Childcare Fee Grant work for parents?");
                }}
                className="text-[#59C7F5] font-semibold text-[11px] underline block mt-1 hover:text-[#FF724E]"
              >
                Let's discuss &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen ? (
        <div 
          id="chat-window"
          className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-orange-100 overflow-hidden transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#59C7F5] to-[#FF724E] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-200" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Peekaboo Virtual Assistant</h3>
                <p className="text-[10px] text-sky-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-ping"></span> 
                  Active AI Regina Helper
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFFBF7]">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-amber-100 text-amber-700" : "bg-sky-100 text-sky-700"
                }`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.role === "user" 
                    ? "bg-[#59C7F5] text-white rounded-tr-none" 
                    : "bg-white text-gray-800 shadow-sm border border-orange-50/60 rounded-tl-none whitespace-pre-line"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-orange-50/60 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs text-gray-500 shadow-sm flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  <span className="text-[10px]">Peekaboo is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Help suggestions */}
          <div className="p-2 bg-orange-50/30 border-t border-orange-50 flex flex-wrap gap-1">
            <button 
              onClick={() => handleQuickQuestion("Is the daycare Parent Fee Grant eligible?")}
              className="text-[10px] bg-white border border-gray-100 hover:border-[#59C7F5] hover:bg-sky-50 text-gray-600 font-medium px-2 py-1 rounded-full transition-colors"
            >
              💰 Subsidy Rate
            </button>
            <button 
              onClick={() => handleQuickQuestion("What does your healthy vegetarian menu look like?")}
              className="text-[10px] bg-white border border-gray-100 hover:border-[#59C7F5] hover:bg-sky-50 text-gray-600 font-medium px-2 py-1 rounded-full transition-colors"
            >
              🥗 Veg Meals
            </button>
            <button 
              onClick={() => handleQuickQuestion("How do I book an in-person daycare tour?")}
              className="text-[10px] bg-white border border-gray-100 hover:border-[#FF724E] hover:bg-orange-50 text-gray-600 font-medium px-2 py-1 rounded-full transition-colors"
            >
              🗓️ Book Tour
            </button>
            <button 
              onClick={() => handleQuickQuestion("What are the daily operating hours?")}
              className="text-[10px] bg-white border border-gray-100 hover:border-[#FF724E] hover:bg-orange-50 text-gray-600 font-medium px-2 py-1 rounded-full transition-colors"
            >
              ⏰ School Hours
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Regina spot rates, food, etc..."
              className="flex-1 border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#FF724E] hover:bg-[#e05e3a] text-white p-2 rounded-xl transition-all disabled:opacity-50"
              aria-label="Send user message"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Button trigger */
        <button
          onClick={() => {
            setIsOpen(true);
            setHasPromptedSubsidy(true);
          }}
          className="bg-gradient-to-r from-[#59C7F5] to-[#FF724E] text-white hover:scale-105 active:scale-95 flex items-center justify-center gap-2 px-5 py-4.5 rounded-full shadow-2xl transition-all relative border border-white/20 hover:shadow-orange-400/20 group"
          aria-label="Open assistance chat"
          id="floating-chat-button"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline">Ask Peekaboo AI</span>
        </button>
      )}
    </div>
  );
}
