import React, { useState, useMemo } from 'react';
import { 
  Sliders, ShieldCheck, ShieldAlert, BadgeInfo, 
  HelpCircle, Sparkles, TrendingUp, Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { LoanInput } from '../types';

export default function LoanSandbox() {
  const [inputs, setInputs] = useState<LoanInput>({
    income: 65000,
    creditScore: 680,
    debtToIncome: 28,
    loanAmount: 15000,
    employmentYears: 4
  });

  const [modelType, setModelType] = useState<'logistic' | 'random_forest'>('random_forest');
  const [threshold, setThreshold] = useState<number>(0.5);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Dynamic ML Classifier Simulation
  const { defaultProbability, featureImportance, decision } = useMemo(() => {
    const { income, creditScore, debtToIncome, loanAmount, employmentYears } = inputs;
    
    // Normalize parameters to 0-1 metrics
    const normCredit = (creditScore - 300) / 550; // 0 (300) to 1 (850)
    const normDti = debtToIncome / 100; // 0 to 1
    const lti = loanAmount / Math.max(1000, income); // Loan-to-income ratio

    let prob = 0;
    let imp = { credit: 40, dti: 25, lti: 20, emp: 15 };

    if (modelType === 'logistic') {
      // Linear scoring with logarithmic sigmoidal activation
      // Logit: higher credit reduces risk, higher DTI increases, higher LTI increases
      const logit = 1.8 
        - 5.2 * normCredit 
        + 4.2 * normDti 
        + 3.5 * lti 
        - 0.9 * (employmentYears / 10);
      
      // Sigmoid function
      prob = 1 / (1 + Math.exp(-logit));
      
      // Fixed linear contributions
      imp = { credit: 45, dti: 25, lti: 20, emp: 10 };
    } else {
      // Random Forest: multi-branch partition simulator (non-linear steps)
      // Tree splits create discrete risk buckets
      if (creditScore < 500) {
        prob = 0.89; // auto low credit penalty
        imp = { credit: 75, dti: 10, lti: 10, emp: 5 };
      } else if (debtToIncome > 55) {
        prob = 0.74; // high debt penalty
        imp = { credit: 15, dti: 65, lti: 15, emp: 5 };
      } else if (lti > 0.6) {
        prob = 0.68; // overleveraged loan amount relative to income
        imp = { credit: 10, dti: 15, lti: 70, emp: 5 };
      } else {
        // Core forest ensemble nodes average probability
        const rfProb1 = 1 - normCredit; // credit tree
        const rfProb2 = normDti > 0.35 ? 0.6 : 0.2; // DTI tree split
        const rfProb3 = lti > 0.25 ? 0.55 : 0.15; // LTI splits
        const rfProb4 = employmentYears < 2 ? 0.45 : 0.1; // Employment split
        
        prob = (rfProb1 * 3 + rfProb2 * 2 + rfProb3 * 2 + rfProb4) / 8;
        
        // Dynamically shift importance based on which parameters are extreme
        const creditBias = creditScore < 600 ? 55 : 35;
        const dtiBias = debtToIncome > 35 ? 35 : 20;
        const ltiBias = lti > 0.3 ? 30 : 25;
        const empBias = employmentYears < 2 ? 20 : 10;
        const sum = creditBias + dtiBias + ltiBias + empBias;
        
        imp = {
          credit: Math.round((creditBias / sum) * 100),
          dti: Math.round((dtiBias / sum) * 100),
          lti: Math.round((ltiBias / sum) * 100),
          emp: Math.round((empBias / sum) * 100)
        };
      }
    }

    // Keep within bounds
    prob = Math.max(0.01, Math.min(0.99, prob));

    // Decision Logic based on customizable decision threshold slider
    let decResult: 'Approved' | 'Requires Verification' | 'Rejected' = 'Approved';
    if (prob > threshold + 0.15) {
      decResult = 'Rejected';
    } else if (prob > threshold - 0.05) {
      decResult = 'Requires Verification';
    }

    return {
      defaultProbability: Math.round(prob * 100),
      featureImportance: imp,
      decision: decResult
    };
  }, [inputs, modelType, threshold]);

  const handleInputChange = (key: keyof LoanInput, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const getVerdictStyles = () => {
    switch (decision) {
      case 'Approved':
        return { 
          bg: 'bg-emerald-50/60 border-emerald-200', 
          text: 'text-emerald-800',
          badge: 'bg-emerald-600 text-white font-semibold',
          icon: <ShieldCheck className="w-8 h-8 text-emerald-600 animate-pulse" />
        };
      case 'Requires Verification':
        return { 
          bg: 'bg-amber-50/60 border-amber-200', 
          text: 'text-amber-800', 
          badge: 'bg-amber-600 text-white font-semibold',
          icon: <ShieldAlert className="w-8 h-8 text-amber-600" />
        };
      case 'Rejected':
        return { 
          bg: 'bg-rose-50/60 border-rose-200', 
          text: 'text-rose-800', 
          badge: 'bg-rose-600 text-white font-semibold',
          icon: <ShieldAlert className="w-8 h-8 text-rose-600" />
        };
    }
  };

  const verdictStyles = getVerdictStyles();

  return (
    <div id="loan-sandbox-root" className="rounded-xl border border-slate-200 bg-white p-6 space-y-6 relative overflow-hidden shadow-sm">
      {/* Decorative gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-2 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] uppercase font-bold tracking-wider">
              Project Sandbox Demo
            </span>
            <span className="text-slate-400 flex items-center gap-1 text-[11px] font-mono">
              <Cpu className="w-3 h-3" /> Predictive Simulation
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
            Applicant Loan Risk Classifier
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Adjust the applicant metadata sliders below to see standard machine learning decision logic run in real-time.
          </p>
        </div>

        {/* Model Type Selector */}
        <div className="flex bg-slate-100 border border-slate-200 p-0.5 rounded-lg shrink-0">
          <button
            onClick={() => setModelType('random_forest')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold tracking-wide transition ${
              modelType === 'random_forest' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-805'
            }`}
          >
            Random Forest Classifier
          </button>
          <button
            onClick={() => setModelType('logistic')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold tracking-wide transition ${
              modelType === 'logistic' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-805'
            }`}
          >
            Logistic Regression
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Area (left 7 cols) */}
        <div className="md:col-span-7 space-y-4 rounded-xl bg-slate-50 p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-slate-600 tracking-wider flex items-center gap-1.5 font-bold">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" /> Key Features (Inputs)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Dynamic Vectors</span>
          </div>

          <div className="space-y-3.5">
            {/* Credit Score Slider (300 - 850) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 flex items-center gap-1 font-semibold">
                  Credit Score
                  <HelpCircle 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseEnter={() => setShowTooltip('credit')}
                    onMouseLeave={() => setShowTooltip(null)}
                  />
                </span>
                <span className="font-mono font-bold text-indigo-600">{inputs.creditScore}</span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                value={inputs.creditScore}
                onChange={(e) => handleInputChange('creditScore', Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>300 (Poor)</span>
                <span>850 (Exceptional)</span>
              </div>
            </div>

            {/* Income Slider ($15k - $200k) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 flex items-center gap-1 font-semibold">
                  Annual Income
                  <HelpCircle 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseEnter={() => setShowTooltip('income')}
                    onMouseLeave={() => setShowTooltip(null)}
                  />
                </span>
                <span className="font-mono font-bold text-indigo-600">${inputs.income.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="15000"
                max="200000"
                step="5000"
                value={inputs.income}
                onChange={(e) => handleInputChange('income', Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>$15k</span>
                <span>$200k+</span>
              </div>
            </div>

            {/* Requested Loan Amount Slider ($2k - $80k) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 flex items-center gap-1 font-semibold">
                  Requested Loan
                  <HelpCircle 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseEnter={() => setShowTooltip('loan')}
                    onMouseLeave={() => setShowTooltip(null)}
                  />
                </span>
                <span className="font-mono font-bold text-indigo-600">${inputs.loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="80000"
                step="2000"
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>$2k</span>
                <span>$80k</span>
              </div>
            </div>

            {/* Debt-To-Income Slider (5% - 75%) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 flex items-center gap-1 font-semibold">
                  Debt-To-Income (DTI)
                  <HelpCircle 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseEnter={() => setShowTooltip('dti')}
                    onMouseLeave={() => setShowTooltip(null)}
                  />
                </span>
                <span className="font-mono font-bold text-indigo-600">{inputs.debtToIncome}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="75"
                value={inputs.debtToIncome}
                onChange={(e) => handleInputChange('debtToIncome', Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>5% (Low Risk)</span>
                <span>75% (Debt Heavy)</span>
              </div>
            </div>

            {/* Employment History Slider (0 - 15) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 flex items-center gap-1 font-semibold">
                  Employment Length
                  <HelpCircle 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseEnter={() => setShowTooltip('employment')}
                    onMouseLeave={() => setShowTooltip(null)}
                  />
                </span>
                <span className="font-mono font-bold text-indigo-600">{inputs.employmentYears} {inputs.employmentYears === 1 ? 'Year' : 'Years'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={inputs.employmentYears}
                onChange={(e) => handleInputChange('employmentYears', Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>Unemployed / Entry</span>
                <span>15+ Years Stable</span>
              </div>
            </div>
          </div>

          {/* Model Selection Information and Threshold Controller */}
          <div className="pt-3.5 border-t border-slate-200 mt-2">
            <div className="flex justify-between text-xs mb-1 bg-white p-2 rounded border border-slate-200 shadow-sm">
              <span className="text-slate-600 font-semibold">Custom Decision Risk Threshold:</span>
              <span className="font-mono font-bold text-indigo-600">{threshold}</span>
            </div>
            <input
              type="range"
              min="0.30"
              max="0.80"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-1"
            />
            <p className="text-[10px] text-slate-400 italic mt-1 leading-normal font-sans">
              Lower threshold requires extreme low risk scores for approval. Higher threshold expands criteria tolerance.
            </p>
          </div>
        </div>

        {/* Classifier Results Card (right 5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          
          {/* Main Verdict Card */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${verdictStyles.bg}`}>
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#00000003_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold">
                  ML Prediction Model
                </span>
                <h4 className="text-xs text-slate-800 uppercase font-bold mt-1 max-w-xs leading-none">
                  {modelType === 'logistic' ? 'Logistic Regression Boundary' : 'Random Forest Classifier Matrix'}
                </h4>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                {verdictStyles.icon}
              </div>
            </div>

            {/* Big Radial Gauge styled with modern percentages */}
            <div className="relative z-10 py-6 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center w-28 h-28">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Gauge shadow back circle */}
                  <circle 
                    cx="50" cy="50" r="42" 
                    className="stroke-slate-200 fill-none" 
                    strokeWidth="8"
                  />
                  {/* Gauge calculated path */}
                  <circle 
                    cx="50" cy="50" r="42" 
                    className={`fill-none transition-all duration-500`}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - defaultProbability / 100)}
                    strokeLinecap="round"
                    stroke={defaultProbability > 55 ? '#f43f5e' : defaultProbability > 35 ? '#f59e0b' : '#10b981'}
                  />
                </svg>
                {/* Numeric indicators in the center */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-display font-extrabold text-slate-850 tracking-tight leading-none">
                    {defaultProbability}%
                  </span>
                  <span className="text-[9px] uppercase font-mono text-slate-400 font-bold tracking-wide mt-1">
                    Risk Prob
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Verdict status block */}
            <div className="relative z-10 border-t border-slate-200 pt-3 mt-1">
              <div className="flex justify-between items-center bg-white/60 p-1.5 rounded border border-slate-200/50">
                <span className="text-[10px] font-mono text-slate-500">Class Label:</span>
                <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${verdictStyles.badge}`}>
                  {decision}
                </span>
              </div>
              <p className="text-[9.5px] text-slate-500 leading-normal mt-2.5 font-sans font-medium">
                {decision === 'Approved' && "Applicant default risk falls safely below tolerance thresholds. Recommended for instant processing."}
                {decision === 'Requires Verification' && "Applicant falls into high-variance borderline decision boundary. Recommended for second-tier manual audit."}
                {decision === 'Rejected' && "Leverage, heavy debt ratios, or historical scoring profiles flag candidate default hazard exceeding maximum limits."}
              </p>
            </div>
          </div>

          {/* Model Features Weights / Feature Importance Indicators */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex-1 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Feature Importance
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Normalized Gini</span>
            </div>

            <div className="space-y-2">
              {/* Credit Weight bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500">Credit Score Index</span>
                  <span className="font-mono text-slate-700 font-bold">{featureImportance.credit}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1 rounded-full transition-all duration-500" style={{ width: `${featureImportance.credit}%` }} />
                </div>
              </div>

              {/* Debt Ratio weight bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500">Debt ratio (DTI)</span>
                  <span className="font-mono text-slate-700 font-bold">{featureImportance.dti}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1 rounded-full transition-all duration-500" style={{ width: `${featureImportance.dti}%` }} />
                </div>
              </div>

              {/* DTI Ratio weight bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500">Loan Leverage (LTI)</span>
                  <span className="font-mono text-slate-700 font-bold">{featureImportance.lti}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1 rounded-full transition-all duration-500" style={{ width: `${featureImportance.lti}%` }} />
                </div>
              </div>

              {/* Employment weight bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500">Employment Tenure</span>
                  <span className="font-mono text-slate-700 font-bold">{featureImportance.emp}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1 rounded-full transition-all duration-500" style={{ width: `${featureImportance.emp}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide-Up Tooltip Help Messages */}
      {showTooltip && (
        <div className="absolute bottom-4 left-4 right-4 bg-white border border-slate-200 p-3 rounded-xl flex gap-2.5 shadow-xl z-20">
          <BadgeInfo className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 leading-normal font-sans font-normal">
            {showTooltip === 'credit' && "Credit Score reflects structural creditworthiness history. Scores below 580 represent subprime risk matrices immediately triggering extreme penalty parameters."}
            {showTooltip === 'income' && "Annual gross earnings are essential to verify amortization buffer capability. Low incomes elevate loan-to-income relative leverages."}
            {showTooltip === 'loan' && "Requested principal sum. Excessively high credit requests relative to absolute annual earnings drastically skew baseline default curves."}
            {showTooltip === 'dti' && "Debt-To-Income percentage indicates existing debt burdens. High percentages reduce surplus cash reserve capability for loan repay schedules."}
            {showTooltip === 'employment' && "Stable, multi-year employment tenure points to micro-income guarantees. Shorter tenure signals volatility splits during tree structures."}
          </p>
        </div>
      )}
    </div>
  );
}
