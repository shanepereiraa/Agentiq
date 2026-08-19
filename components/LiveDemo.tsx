'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Zap, Bot, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  time?: string;
}

const samplePrompts = [
  'Book a table for tonight',
  'Schedule a salon visit',
  'Book a doctor appointment',
  'Can it talk in Hindi?',
  'What is your pricing?',
];

const cannedReplies: Record<string, string> = {
  'Book a table for tonight': "Sure! How many guests and what time? I can confirm instantly and take pre-orders so your food's ready when you arrive. 🍽️",
  'Schedule a salon visit': "I'd love to! Which service — haircut, hair spa or grooming? I'll show open slots with your favourite stylist and lock it in. 💇",
  'Book a doctor appointment': "Of course. Tell me the department and I'll show the next available slots with Dr. Rao, book it, and send your pre-visit form on WhatsApp. 🩺",
  'Can it talk in Hindi?': "Bilkul! 🙌 Main Hindi, English aur Hinglish teeno mein seamlessly baat kar sakta hoon. Aapki language preference kya hai?",
  'What is your pricing?': "Managed WhatsApp AI chatbots start at ₹7,999/mo (+ ₹24,999 setup). Voice AI starts at ₹14,999/mo. Both include complete done-for-you training and 30-day money-back guarantee! 🚀",
};

export default function LiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'bot',
      text: "Namaste! 👋 I'm AgentIQ. Pick a prompt below or type anything to see how I handle real customer inquiries.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      from: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText =
        cannedReplies[text] ||
        `Thanks for asking about "${text}"! Our AI understands complex context and resolves 80%+ of inquiries instantly before human escalation.`;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: replyText,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <section id="demo" className="relative py-20 bg-[#060f28] overflow-hidden">
      {/* Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-coral/15 blur-3xl"></div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan/15 blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-cyan tracking-widest uppercase mb-3">
              LIVE DEMO
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              See it think. Tap a question.
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              This is a real-time preview of how your assistant feels to a customer — typing indicators, instant answers, and natural conversation. Pick a prompt to watch it respond.
            </p>
          </div>

          <ul className="space-y-3.5 text-sm text-slate-200">
            <li className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan shrink-0" />
              <span>Handles Hindi, Hinglish, &amp; English automatically</span>
            </li>
            <li className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan shrink-0" />
              <span>Connected directly to Meta Cloud API</span>
            </li>
            <li className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan shrink-0" />
              <span>Smart hand-off to a human anytime</span>
            </li>
            <li className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan shrink-0" />
              <span>Captures name &amp; number automatically</span>
            </li>
          </ul>

          {/* Conversion Card */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-center space-y-4">
            <h4 className="text-white font-semibold text-base">Impressed by the response speed?</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              We can deploy this exact AI assistant for your business on WhatsApp &amp; Phone within 24 hours.
            </p>
            <Link
              href="/#book"
              className="w-full py-3 px-4 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Deploy for Spice Garden Restaurant →
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Chat Simulator */}
        <div className="rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col h-[520px]">
          
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-white/5 border-b border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coral to-orange flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">AgentIQ Interactive Bot</p>
              <p className="text-emerald-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                online · replies in &lt; 1s
              </p>
            </div>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-5 space-y-3 overflow-y-auto text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.from === 'user'
                    ? 'ml-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                    : 'bg-white/10 text-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="inline-flex items-center gap-1 bg-white/10 text-slate-300 rounded-2xl rounded-tl-sm px-4 py-2 text-xs">
                <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-white/10 bg-black/20 flex flex-wrap gap-2 overflow-x-auto">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/15 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-slate-950 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan"
            />
            <button
              type="submit"
              aria-label="Send Message"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-coral to-orange text-white hover:brightness-110 transition cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
