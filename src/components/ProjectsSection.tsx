import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Search, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp,
  Tag, BarChart3, Star, Sparkles
} from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai-rag' | 'ml' | 'data-analysis'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("loan-risk-prediction");

  // Filters projects based on selected tags/categories and typed queries
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const term = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(t => t.toLowerCase().includes(term)) ||
        (project.longDescription && project.longDescription.toLowerCase().includes(term));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpandProject = (id: string) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  return (
    <div id="projects-section-root" className="space-y-6">
      {/* Search and Navigation filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Tabs */}
        <div className="flex bg-slate-100 border border-slate-200 p-0.5 rounded-lg text-xs font-mono font-medium overflow-x-auto shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
          >
            All Work ({projects.length})
          </button>
          <button
            onClick={() => setSelectedCategory('ai-rag')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'ai-rag' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
          >
            AI & RAG
          </button>
          <button
            onClick={() => setSelectedCategory('data-analysis')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'data-analysis' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Data Analytics
          </button>
          <button
            onClick={() => setSelectedCategory('ml')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'ml' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Machine Learning
          </button>
        </div>

        {/* Filter Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tags, stacks, results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-250 rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Projects Stack */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center rounded-xl border border-dashed border-slate-200 text-slate-450 text-sm font-sans"
            >
              No matching projects completed with those criteria. Try another filter context.
            </motion.div>
          ) : (
            filteredProjects.map((project, idx) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <motion.div
                  key={project.id}
                  layout="position"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 relative ${
                    isExpanded 
                      ? 'border-indigo-200 bg-white shadow-md' 
                      : 'border-slate-200 bg-white hover:border-indigo-200 shadow-sm'
                  }`}
                >
                  {/* Highlight bar for active expanded status */}
                  {isExpanded && (
                    <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl bg-gradient-to-b from-indigo-500 to-indigo-800" />
                  )}

                  {/* Card Core Content Header clickable inside entire bounding box */}
                  <div 
                    onClick={() => toggleExpandProject(project.id)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 select-none"
                  >
                    <div className="space-y-2">
                      {/* Meta information tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="p-1 px-2 rounded bg-slate-105 text-slate-500 font-mono text-[9px] uppercase font-bold border border-slate-200/60">
                          {project.category === 'ai-rag' ? 'AI Assistant / RAG' : project.category === 'ml' ? 'Mathematical ML' : 'Relational Insights'}
                        </span>
                        {project.id === 'loan-risk-prediction' && (
                          <span className="flex items-center gap-1 text-[9px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Star Showcase
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg font-bold text-slate-905 mt-1 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-start">
                      {/* Accordion toggle button */}
                      <button className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanding detailed sections of work */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-6 pt-5 space-y-6">
                          {/* Long Details Paragraph */}
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                              Executive Architecture Overview
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                              {project.longDescription}
                            </p>
                          </div>

                          {/* Key Performance Metrics Dashboard Badge */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider font-semibold flex items-center gap-1.5">
                                <BarChart3 className="w-3.5 h-3.5 text-indigo-600" /> Key Model Metrics & Impact
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {project.metrics.map((met, mIdx) => (
                                  <div key={mIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm">
                                    <span className="font-mono text-xl font-bold text-indigo-600 leading-none">
                                      {met.value}
                                    </span>
                                    <span className="text-[10px] text-slate-540 mt-1 font-sans">
                                      {met.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Contributions list */}
                          <div className="space-y-2.5">
                            <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                              Contributions & Implemented Solutions
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {project.contributions.map((con, cIdx) => (
                                <div key={cIdx} className="flex gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200 items-start text-xs text-slate-600 font-sans font-normal leading-relaxed shadow-sm">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{con}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 text-xs">
                            <span className="font-mono text-[10px] text-slate-450 font-bold uppercase tracking-wider mr-1.5">Stack:</span>
                            {project.tags.map((stackTag) => (
                              <span 
                                key={stackTag}
                                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-100"
                              >
                                <Tag className="w-2.5 h-2.5 text-indigo-600/80" /> {stackTag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
