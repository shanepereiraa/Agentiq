'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export default function FloatingLeadBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Name, 2: Phone, 3: Business Type, 4: Done
  const [formData, setFormData] = useState({ name: '', phone: '', business: '' });
  const [inputVal, setInputVal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "👋 Hi! Welcome to AgentIQ. Let's see how much time & revenue AI can save your business. What is your name?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isSubmitting) return;

    const currentInput = inputVal.trim();
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: currentInput };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    if (step === 1) {
      setFormData((prev) => ({ ...prev, name: currentInput }));
      setStep(2);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: 'bot', text: `Nice to meet you, ${currentInput}! What is your WhatsApp number?` },
        ]);
      }, 500);
    } else if (step === 2) {
      setFormData((prev) => ({ ...prev, phone: currentInput }));
      setStep(3);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: 'bot', text: "Got it! What type of business do you run? (e.g. Restaurant, D2C, Clinic, Real Estate)" },
        ]);
      }, 500);
    } else if (step === 3) {
      const finalData = { ...formData, business: currentInput, timestamp: new Date().toISOString() };
      setFormData(finalData);
      setStep(4);
      setIsSubmitting(true);

      try {
        // Send to internal API route syncing with Google Sheets
        await fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
      } catch (err) {
        console.error('Failed to sync lead:', err);
      } finally {
        setIsSubmitting(false);
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: 'bot', text: "🎉 Thank you! Our team will send your custom AI demo video on WhatsApp within 15 minutes." },
        ]);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-auto">
      
      {/* 1. CHAT MODAL WINDOW */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[390px] h-[480px] bg-[#0B0F17] border border-white/20 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#111622] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                IQ
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">AgentIQ Assistant</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Replies in seconds
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4"/>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-rose-500 text-white rounded-br-none font-medium'
                      : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSubmitting && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-2 text-xs text-gray-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500"/>
                  Saving details to sheet...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-white/10 bg-[#080B11]">
            {step <= 3 ? (
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type={step === 2 ? 'tel' : 'text'}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    step === 1 ? "Enter your name..." : step === 2 ? "Enter WhatsApp number..." : "Enter your business..."
                  }
                  autoFocus
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isSubmitting}
                  className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white transition-colors"
                >
                  <Send className="w-4 h-4"/>
                </button>
              </form>
            ) : (
              <div className="py-1 text-center">
                <span className="text-xs text-emerald-400 flex items-center justify-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5"/> Lead registered successfully
                </span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON (Below WhatsApp Button) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Open AgentIQ Chatbot"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all relative border border-white/20 cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6"/> : <MessageSquare className="w-6 h-6 fill-white"/>}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0B0F17] rounded-full flex items-center justify-center text-[9px] font-bold text-white">
            1
          </span>
        )}
      </button>

    </div>
  );
}
