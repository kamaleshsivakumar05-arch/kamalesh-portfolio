import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink, 
  Copy, Check, Sparkles, Code2, Database, Brain
} from 'lucide-react';
import { personalInfo } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProfilePanelProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function ProfilePanel({ activeSection, onNavigate }: ProfilePanelProps) {
  const [copiedText, setCopiedText] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const navItems = [
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'sandbox', label: 'Interactive ML Sandbox', icon: '🔬' },
    { id: 'projects', label: 'Featured Projects', icon: '🚀' },
    { id: 'skills', label: 'Technical Core', icon: '🧠' },
    { id: 'education', label: 'Education & Honors', icon: '🎓' },
    { id: 'assistant', label: 'Resume AI Assistant', icon: '💬' }
  ];

  return (
    <div id="profile-panel-container" className="flex flex-col h-full justify-between gap-8 py-4">
      {/* Upper Part: Info & Network Visual */}
      <div id="profile-upper" className="space-y-6">
        {/* Sleek Gradient Design Profile Header Card */}
        <div id="profile-header" className="relative group">
          <div className="absolute -inset-0.5 rounded-2xl bg-indigo-500/10 opacity-50 blur-md pointer-events-none" />
          
          <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 shadow-md border-none">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center font-display text-2xl font-bold tracking-tight text-white border border-white/20 overflow-hidden shadow-lg">
                <span className="relative z-10">KS</span>
                {/* Visual grid pattern back */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="absolute bottom-0 w-full h-1 bg-indigo-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider text-indigo-100 uppercase font-medium">Available for Internships</span>
                </div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white mt-1">
                  {personalInfo.name}
                </h1>
                <p className="font-sans text-xs text-indigo-200 font-medium">
                  {personalInfo.title}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-indigo-100 leading-relaxed mt-4 font-sans font-light">
              {personalInfo.summary}
            </p>
          </div>
        </div>

        {/* Live Metrics Grid representing dynamic data profile */}
        <div id="profile-live-metrics" className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center hover:border-slate-300 transition shadow-sm">
            <div className="font-mono text-xs font-bold text-slate-800 font-bold uppercase">Python</div>
            <div className="font-sans text-[9px] text-slate-500">Data & Analytics</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center hover:border-slate-300 transition shadow-sm">
            <div className="font-mono text-xs font-bold text-slate-800 font-bold uppercase">SQL</div>
            <div className="font-sans text-[9px] text-slate-500">Structured Data</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center hover:border-slate-300 transition shadow-sm">
            <div className="font-mono text-xs font-bold text-indigo-600 font-bold">6.3</div>
            <div className="font-sans text-[9px] text-slate-500">B.Tech CGPA</div>
          </div>
        </div>

        {/* Dynamic Section Indicator Navigation */}
        <nav id="profile-navigation" className="hidden lg:block space-y-1">
          <div className="font-mono text-[10px] uppercase text-slate-400 tracking-widest pl-2 mb-2 font-bold">
            Index Sections
          </div>
          {navItems.map((item) => {
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
                  isSelected 
                    ? 'bg-indigo-50 border border-indigo-100/50 text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm select-none opacity-80">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="active-indicator"
                    className="w-1.5 h-1.5 rounded-full bg-indigo-600"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Lower Part: Interactive Contact Matrix */}
      <div id="profile-lower" className="space-y-4 pt-4 border-t border-slate-200">
        <div className="font-mono text-[10px] uppercase text-slate-400 tracking-widest pl-1 font-bold">
          Contact Coordinates
        </div>
        
        <div className="space-y-2">
          {/* Email Row */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs">
            <div className="flex items-center gap-2 text-slate-700 overflow-hidden">
              <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate font-medium" title={personalInfo.email}>{personalInfo.email}</span>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition shrink-0 ml-1"
            >
              {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Phone Row */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-medium">{personalInfo.phone}</span>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition"
            >
              {copiedText === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Location Row */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate font-medium">{personalInfo.location}</span>
          </div>
        </div>

        {/* Sticky Networking Callout */}
        <div className="flex gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm transition"
          >
            <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
            <span>LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
