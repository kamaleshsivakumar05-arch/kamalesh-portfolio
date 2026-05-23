import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Terminal, ArrowUpRight, Code2, 
  Database, Brain, Cpu, MessageSquare, ChevronDown
} from 'lucide-react';
import ProfilePanel from './components/ProfilePanel';
import LoanSandbox from './components/LoanSandbox';
import ProjectsSection from './components/ProjectsSection';
import SkillsGrid from './components/SkillsGrid';
import EducationTimeline from './components/EducationTimeline';
import ResumeBot from './components/ResumeBot';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollGlow, setShowScrollGlow] = useState(false);
  
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Monitor scrolling in right panel to show top shadow helper
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setShowScrollGlow(target.scrollTop > 50);
  };

  // Set up intersection observers for each section on the right side
  useEffect(() => {
    const options = {
      root: rightColumnRef.current,
      rootMargin: '-20% 0px -60% 0px', // Center-weighted viewport detection
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const targetIds = ['about', 'sandbox', 'projects', 'skills', 'education', 'assistant'];
    const observer = new IntersectionObserver(handleIntersection, options);

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      targetIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll handler targeting desktop vs mobile containers
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      if (window.innerWidth >= 1024 && rightColumnRef.current) {
        // Desktop scrolling is relative to right panel div
        const parentTop = rightColumnRef.current.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const relativeTop = rightColumnRef.current.scrollTop + elementTop - parentTop - 24;
        
        rightColumnRef.current.scrollTo({
          top: relativeTop,
          behavior: 'smooth'
        });
      } else {
        // Mobile scrolling is relative to window height
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-slate-50 font-sans tracking-tight leading-normal overflow-x-hidden text-slate-800 flex flex-col relative">
      
      {/* Sleek light background decorative patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-sky-50/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] opacity-15" />
      </div>

      {/* Main Framework Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto relative z-10 flex-1">
        
        {/* Left Side Profile Card (col span 4) */}
        <header id="portfolio-left-sidebar" className="col-span-12 lg:col-span-4 lg:sticky lg:top-0 lg:h-screen p-6 md:p-8 xl:p-10 flex flex-col justify-between border-slate-250 lg:border-r bg-white/80 backdrop-blur-md overflow-y-auto no-scrollbar shadow-sm">
          <ProfilePanel 
            activeSection={activeSection} 
            onNavigate={scrollToSection} 
          />
        </header>

        {/* Right Side Feed Card (col span 8) */}
        <main 
          id="portfolio-main-feed"
          ref={rightColumnRef}
          onScroll={handleScroll}
          className="col-span-12 lg:col-span-8 p-6 md:p-10 xl:p-14 space-y-16 lg:h-screen lg:overflow-y-auto pb-24 scroll-smooth no-scrollbar"
        >
          {/* Scroll fade glow guide */}
          <div className={`fixed top-0 right-0 left-0 lg:left-[33%] xl:left-[33.3%] h-4 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-20 transition-opacity duration-300 ${showScrollGlow ? 'opacity-100' : 'opacity-0'}`} />

          {/* SECTION 1: Intro/About Showcase */}
          <section id="about" className="space-y-6 pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[10px] tracking-wider uppercase font-bold select-none">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-600" /> Executive Statement
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
                Engineering <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-800 bg-clip-text text-transparent">data solutions</span> & predictive intelligence.
              </h2>
              
              <div id="intro-card-about" className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                  My data analysis practice focuses on modeling raw transactional and relational datasets into operational assets. By combining <b className="text-indigo-600 font-semibold">Python pandas architectures</b> with <b className="text-indigo-600 font-semibold">PostgreSQL CTE queries</b>, I extract actionable patterns that resolve commercial risk, streamline operations, and drive data-backed decision matrixes.
                </p>
                <div className="flex flex-wrap gap-2.5 items-center text-[10.5px] font-mono font-medium pt-3 border-t border-slate-100 text-slate-500">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Priority:</span>
                  <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.6 text-indigo-600" /> Tabular Cleansing</span>
                  <span className="text-slate-305">•</span>
                  <span className="flex items-center gap-1"><Database className="w-3.5 h-3.6 text-indigo-600" /> relational SQL</span>
                  <span className="text-slate-305">•</span>
                  <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.6 text-indigo-600" /> ML Classification</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 2: Dynamic ML Sandbox Widget */}
          <section id="sandbox" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] text-indigo-600 uppercase tracking-wider font-semibold">Interactive Sandbox</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Algorithm Playground</h3>
            </div>
            <LoanSandbox />
          </section>

          {/* SECTION 3: Filterable Projects Stack */}
          <section id="projects" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] text-indigo-600 uppercase tracking-wider font-semibold">Completed Catalog</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Featured Project Showcases</h3>
            </div>
            <ProjectsSection />
          </section>

          {/* SECTION 4: Skills Matrix Dashboard */}
          <section id="skills" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] text-indigo-600 uppercase tracking-wider font-semibold">Technical Profile</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Core Competence Grid</h3>
            </div>
            <SkillsGrid />
          </section>

          {/* SECTION 5: Education timeline and Cert Matrix */}
          <section id="education" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] text-indigo-600 uppercase tracking-wider font-semibold font-bold">Credentials & timeline</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Academic & Industry Certifications</h3>
            </div>
            <EducationTimeline />
          </section>

          {/* SECTION 6: Resume FAQ Bot Terminal */}
          <section id="assistant" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] text-indigo-600 uppercase tracking-wider font-semibold">Instant Interrogator</span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">Interactive FAQ Terminal</h3>
            </div>
            <ResumeBot />
          </section>

          {/* Dynamic Footer with location and metadata stamps */}
          <footer className="text-center pt-8 border-t border-slate-200 text-slate-500 font-mono text-[10px] space-y-2 select-none">
            <p className="flex justify-center items-center gap-1">
              <span>&copy; {new Date().getFullYear()} Kamalesh S. Built with React & Tailwind CSS.</span>
            </p>
            <p className="text-[9px] text-slate-400">
               Loc: Kallakurichi, TN, India • Stack Ref: ESM Node Strip • Status: Compiled & Ready
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
