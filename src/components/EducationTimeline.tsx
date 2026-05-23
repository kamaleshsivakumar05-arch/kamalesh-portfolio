import React from 'react';
import { educationHistory, certifications } from '../data';
import { GraduationCap, Award, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function EducationTimeline() {
  return (
    <div id="edu-cert-root" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      
      {/* Left side column: Education Timeline (7 cols) */}
      <div className="md:col-span-7 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <GraduationCap className="w-4 h-4 text-indigo-650" />
          <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
            Academic Track
          </h4>
        </div>

        <div className="space-y-6 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
          {educationHistory.map((edu, eIdx) => (
            <div key={edu.id} className="relative space-y-2 group">
              {/* Timeline marker ball */}
              <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-white border border-slate-300 group-hover:bg-indigo-600 group-hover:border-indigo-500 shadow-sm transition-colors duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-[10.5px] text-indigo-650 font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {edu.period}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-center">
                  {edu.scoreLabel}: {edu.scoreValue}
                </span>
              </div>

              <div>
                <h5 className="font-display text-sm font-extrabold text-slate-900">
                  {edu.degree}
                </h5>
                <p className="text-xs text-slate-600 font-semibold font-sans">
                  {edu.institution}
                </p>
              </div>

              {edu.details && (
                <ul className="space-y-1.5 pl-1.5 pt-1 text-[11px] text-slate-500 font-sans font-normal leading-normal list-inside">
                  {edu.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-indigo-600 mt-0.5 shrink-0 select-none">▪</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side column: Certifications Matrix (5 cols) */}
      <div className="md:col-span-5 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Award className="w-4 h-4 text-indigo-650" />
          <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
            Industry Credentials
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="p-3.5 rounded-xl border border-slate-205 bg-white relative hover:border-indigo-200 hover:shadow transition-all duration-300 flex items-start gap-3 group shadow-sm"
            >
              <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h5 className="font-sans text-xs font-bold text-slate-800 leading-snug group-hover:text-indigo-805 transition-colors truncate" title={cert.name}>
                  {cert.name}
                </h5>
                <p className="text-[10.5px] text-slate-500 font-mono flex items-center gap-1 pb-1">
                  {cert.issuer}
                </p>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                  <CheckCircle className="w-2.5 h-2.5" /> Verified Completion
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
