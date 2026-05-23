import React, { useState } from 'react';
import { skillGroups } from '../data';
import { 
  Code2, Database, BarChart3, Brain, Sparkles, 
  SearchCode, HardDrive, FileSpreadsheet, GitBranch,
  Laptop, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Maps string icons to actual Lucide JSX nodes
const iconMap: { [key: string]: React.ElementType } = {
  Code2: Code2,
  Database: Database,
  BarChart3: BarChart3,
  Brain: Brain,
  Sparkles: Sparkles,
  SearchCode: SearchCode,
  HardDrive: HardDrive,
  FileSpreadsheet: FileSpreadsheet,
  GitBranch: GitBranch
};

const skillFulfillmentDetails: { [key: string]: string } = {
  "Python (Pandas, NumPy)": "Engineering clean ML data matrices, numpy array manipulations, descriptive modeling with scipy.",
  "SQL (PostgreSQL)": "Drafting advanced aggregate queries using CTEs, Window functions, multi-table JOINs, indexing schemas.",
  "Exploratory Data Analysis (EDA)": "Isolating statistical outliers, analyzing covariance vectors, generating clean distribution plots.",
  "Predictive Modeling (Scikit-Learn)": "Constructing Logistic Regression & Random Forest classifiers, grid-search tuning parameter offsets.",
  "Data Cleaning & Imputation": "Normalizing null variables, removing multicollinearity, transforming categorical features safely.",
  "Retrieval-Augmented Generation (RAG)": "Designing static vectors using FAISS matrices, matching index keys to policy retrieval schemas.",
  "PostgreSQL & Redis": "Designing table relationships, enforcing foreign integrity keys, managing cached indexes.",
  "Excel & PowerBI Workflows": "Synthesizing quick dashboards, analyzing business revenue formulas, drafting pivot dashboards.",
  "Git & GitHub Collaboration": "Executing trunk-based feature branches, preparing clean pull request reviews, handling stage conflicts."
};

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div id="skills-grid-root" className="space-y-8 relative">
      {/* Decorative Blur Glow behind dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Intro Indicator */}
      <div className="flex items-center justify-between border-b border-slate-250 pb-3">
        <div className="flex items-center gap-2">
          <Laptop className="w-4 h-4 text-indigo-650" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
            Capabilities Matrix
          </span>
        </div>
        <span className="text-[10px] text-slate-400 italic hidden sm:block">Hover skills for technical detail applications</span>
      </div>

      {/* Main layout grid grouping skills categories */}
      <div id="skills-categories" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillGroups.map((group, groupIdx) => (
          <div 
            key={groupIdx} 
            className="flex flex-col gap-4 p-5 rounded-xl border border-slate-205 bg-white relative group overflow-hidden shadow-sm"
          >
            {/* Subtle top border highlighting details */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-100 group-hover:bg-indigo-500/20 transition-all duration-300" />

            {/* Category Title */}
            <h4 className="font-display text-sm font-extrabold text-slate-900 tracking-wide border-b border-slate-100 pb-2">
              {group.category}
            </h4>

            {/* Skills items list */}
            <div className="flex flex-col gap-3.5 flex-1 justify-start">
              {group.skills.map((skill, sIdx) => {
                const IconComponent = iconMap[skill.icon] || Code2;
                const isHovered = hoveredSkill === skill.name;
                return (
                  <div
                    key={sIdx}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="space-y-1.5 cursor-pointer relative"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="p-1 rounded bg-slate-50 text-indigo-600 border border-slate-150">
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-sans font-medium text-slate-800">{skill.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-450 font-bold">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar with glow effect on selection status */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/40">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out ${
                          isHovered 
                            ? 'from-indigo-600 to-indigo-800 shadow-indigo-500/10 shadow' 
                            : 'from-indigo-500 to-indigo-600'
                        }`}
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Popover description box highlighting actual implementations */}
      <div className="h-16 mt-4">
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="p-3.5 rounded-xl border border-indigo-150 bg-indigo-50/50 flex gap-2.5 items-start"
            >
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-805 block font-sans">
                  Applications of {hoveredSkill}:
                </span>
                <span className="text-slate-600 font-sans tracking-wide leading-relaxed mt-0.5 block font-medium">
                  {skillFulfillmentDetails[hoveredSkill] || "Demonstrated professional application across core academic projects and research workflows."}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="p-3.5 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex gap-2.5 items-center justify-center font-sans text-xs text-slate-500">
              <span>Hover over any tech skill stack indicator to investigate custom usage and capabilities.</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
