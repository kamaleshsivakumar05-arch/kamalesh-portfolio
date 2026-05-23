export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  contributions: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'ml' | 'data-analysis' | 'ai-rag';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  scoreLabel: string;
  scoreValue: string;
  details?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; proficiency: number; icon: string }[];
}

export interface LoanInput {
  income: number;
  creditScore: number;
  debtToIncome: number;
  loanAmount: number;
  employmentYears: number;
}
