import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, Terminal, Trash2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function ResumeBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Kamalesh's virtual assistant. Ask me questions about his training, skills, projects, or professional coordinates. You can also press any of the rapid-index badges below to query specific details instantly.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts
  const suggestions = [
    { label: "B.Tech & College GPA", term: "college" },
    { label: "AI Loan Risk Project", term: "loan risk" },
    { label: "SQL & Analytics Stack", term: "sql skills" },
    { label: "Availability Status", term: "hiring" }
  ];

  // Auto scroll to chat bottom on new streams
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSubmit: string) => {
    if (!textToSubmit.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Response Simulation
    setTimeout(() => {
      const lowerQuery = textToSubmit.toLowerCase();
      let botResponse = "";

      if (lowerQuery.includes('college') || lowerQuery.includes('education') || lowerQuery.includes('cgpa') || lowerQuery.includes('marks') || lowerQuery.includes('degree') || lowerQuery.includes('b.tech')) {
        botResponse = "Kamalesh is currently in his 6th semester of **B.Tech in Artificial Intelligence & Data Science** at **Dhanalakshmi Srinivasan Engineering College** (Aug 2023 - May 2027), holding a cumulative academic score of **6.3 CGPA** (calculated till the 5th Sem). Prior to this, he completed his Higher Secondary certificate with **67.5%** in Bio-Mathematics at **Sakthi Matric School**.";
      } 
      else if (lowerQuery.includes('loan') || lowerQuery.includes('risk') || lowerQuery.includes('project') || lowerQuery.includes('rag') || lowerQuery.includes('faiss')) {
        botResponse = "Kamalesh successfully developed an **AI-Based Loan Risk Prediction & Approval System**. This project blends standard machine learning (Random Forest and Logistic Regression yielding an impressive **0.91 ROC-AUC** predictive score) with an automated policy rules engine. Additionally, he integrated retrieval-augmented generation (**RAG**) with a local **FAISS vector database** to fetch and resolve loan agreement policies seamlessly.";
      } 
      else if (lowerQuery.includes('sql') || lowerQuery.includes('python') || lowerQuery.includes('data') || lowerQuery.includes('database') || lowerQuery.includes('skills')) {
        botResponse = "His technical core centers around **Python (Pandas, NumPy)** and robust **SQL queries**. He has practical experience executing window aggregations, CTE parameters, table layouts, and indexing within **PostgreSQL**. He is also trained in data normalization, feature imputation with **Scikit-Learn**, predictive forecasting, and managing caches inside **Redis**.";
      } 
      else if (lowerQuery.includes('hiring') || lowerQuery.includes('available') || lowerQuery.includes('intern') || lowerQuery.includes('job') || lowerQuery.includes('opportunity') || lowerQuery.includes('contact')) {
        botResponse = "Yes, Kamalesh is actively seeking **Data Analyst** or **Machine Learning / AI Analyst** internship opportunities. He is located in Kallakurichi, Tamil Nadu, India, but is open to both remote and on-site projects. You can contact him at **+91 6380232811** or email **kamaleshsivakumar05@gmail.com**.";
      } 
      else if (lowerQuery.includes('cert') || lowerQuery.includes('internship') || lowerQuery.includes('course') || lowerQuery.includes('ann') || lowerQuery.includes('udemy')) {
        botResponse = "Kamalesh holds several valuable technical credentials: \n\n" +
                      "1. **Programming in Python** from Simplilearn\n" +
                      "2. **Machine Learning** from Unified Mentor\n" +
                      "3. **Problem Solving (Basic)** from HackerRank\n" +
                      "4. **Foundation of Artificial Neural Networks** from Udemy.";
      } 
      else {
        botResponse = "I've structured my knowledge on Kamalesh's B.Tech major, his Python/SQL skills, and his AI Loan Risk Sandbox project. Tell me if you are looking for details on his **portfolio projects**, **CGPA metrics**, or **contact options** so I can provide precise details!";
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Terminal reset. Ask me anything about Kamalesh's skills, B.Tech metrics, and project experience.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="resume-bot-container" className="rounded-2xl border border-slate-205 bg-white p-5 flex flex-col h-[400px] overflow-hidden shadow-sm">
      {/* Bot Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-150 text-indigo-600">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-display text-xs font-bold text-slate-800 block">
              kamalesh_resume_bot.py
            </span>
            <span className="text-[9px] font-mono text-slate-400 block">Status: Online</span>
          </div>
        </div>

        <button 
          onClick={clearChat}
          className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-rose-500 transition"
          title="Reset Logs"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Feed Canvas inside chat container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 md:pr-2"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                  : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-200'
              }`}>
                {/* Process linebreaks for beautiful text display */}
                <p className="whitespace-pre-line font-sans font-normal">
                  {msg.text}
                </p>
                <span className="block text-[8px] opacity-60 mt-1.5 text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator spinner simulation */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 p-3 pb-2 rounded-xl bg-slate-50 border border-slate-200 max-w-[45%] text-xs text-slate-500 items-center justify-start scale-95 shadow-sm"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-75" />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-300" />
              </div>
              <span className="font-mono text-[9px] text-slate-400">Retrieving...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggested Quick buttons Row */}
      <div className="py-2 flex flex-wrap gap-1.5 shrink-0 select-none border-t border-slate-100 mt-1">
        {suggestions.map((sug) => (
          <button
            key={sug.term}
            onClick={() => handleSendMessage(sug.term)}
            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border border-slate-200 bg-slate-50 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition whitespace-nowrap flex items-center gap-0.5"
          >
            {sug.label} <ArrowUpRight className="w-2.5 h-2.5 opacity-40 shrink-0" />
          </button>
        ))}
      </div>

      {/* Core chat text entry action layout */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex gap-1.5 shrink-0 pt-2 border-t border-slate-100"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTyping}
          placeholder="Ask about my GPA, skills, or projects..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl px-3 flex items-center justify-center transition shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
