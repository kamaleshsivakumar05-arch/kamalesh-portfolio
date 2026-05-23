import { Project, Education, Certification, SkillGroup } from './types';

export const personalInfo = {
  name: "Kamalesh S",
  title: "Data Analyst & AI Enthusiast",
  location: "Kallakurichi, Tamil Nadu, India",
  phone: "+91 6380232811",
  email: "kamaleshsivakumar05@gmail.com",
  github: "https://github.com/kamaleshsivakumar05",
  linkedin: "https://www.linkedin.com/in/kamalesh-s-76b92a2a0",
  summary: "Detail-oriented Data Analyst with foundational skills in Python and SQL, experienced in data cleaning, exploratory data analysis, and building predictive models. Currently pursuing B.Tech in Artificial Intelligence and Data Science, I am passionate about extracting actionable insights from complex datasets to drive informed business decisions."
};

export const projects: Project[] = [
  {
    id: "loan-risk-prediction",
    title: "AI-Based Loan Risk Prediction & Approval System",
    description: "Multi-layered decision support system combining custom Logistic Regression / Random Forest classifiers with FAQ Retrieval-Augmented Generation (RAG).",
    longDescription: "An end-to-end Machine Learning pipeline that scores incoming loan applicant parameters (Age, Income, Credit Score, Debt-to-Income, and Employment History) under user-defined risk tolerance limits, integrated alongside a vector-search FAISS FAQ database to answer applicant policy queries.",
    tags: ["Python", "Scikit-Learn", "RAG", "FAISS", "Data Prep"],
    category: "ai-rag",
    metrics: [
      { label: "Predictive ROC-AUC", value: "0.91" },
      { label: "Approval Latency", value: "<150ms" },
      { label: "Semantic Search Accuracy", value: "94.5%" }
    ],
    contributions: [
      "Built an AI assistant capable of retrieving knowledge from policies to generate contextual responses using RAG with FAISS.",
      "Developed predictive risk models utilizing Random Forest and Logistic Regression algorithms to evaluate loan default probability.",
      "Cleaned, normalised, and feature-engineered raw applicant data to solve class imbalance and remove multicollinearity.",
      "Designed an automated decision framework for instantaneous loan approval/rejection based on custom credit-score weights and risk thresholds."
    ]
  },
  {
    id: "ecommerce-analytics",
    title: "Relational E-Commerce Insights & Cohort Analysis",
    description: "PostgreSQL-driven transactional analysis pipeline with cohort metrics, tracking user churn rates and product clustering analysis.",
    longDescription: "A practical SQL analytics project designed to clean & load transaction logs, execute complex window functions, and group customers into active clusters. Tracks monthly purchase recurrences, churn coefficients, and regional high-demand categories.",
    tags: ["SQL", "PostgreSQL", "Pandas", "Matplotlib", "RFM"],
    category: "data-analysis",
    metrics: [
      { label: "Query Speed Improvement", value: "35%" },
      { label: "Customer Segments", value: "5 (RFM)" },
      { label: "Processed Records", value: "50,000+" }
    ],
    contributions: [
      "Designed robust SQL queries using Common Table Expressions (CTEs), Indexing, and Window Functions to construct RFM (Recency, Frequency, Monetary) metrics.",
      "Analysed customer lifetime patterns, yielding 5 distinct segmentation cohorts representing key retention indicators.",
      "Created Python scripts to ingest messy CSV tables, handle missing fields, and output normalized structured schemas."
    ]
  },
  {
    id: "neural-network-classifier",
    title: "Deep Structured Sensor Classifier",
    description: "A solid neural network implementation for physical sensor state classification with backpropagation adjustments.",
    longDescription: "Built during ANN coursework, this project implements a feed-forward multi-layer neural classifier with backpropagation on sensor signals to map signal noises and anomalies into predictive maintenance triggers.",
    tags: ["Python", "Keras", "Artificial Neural Networks", "EDA"],
    category: "ml",
    metrics: [
      { label: "Validation Accuracy", value: "88.2%" },
      { label: "Mean Square Error", value: "0.04" }
    ],
    contributions: [
      "Designed a feedback mechanism on top of dense neural grid segments built with mini-batch optimization.",
      "Preprocessed non-linear sensory readings, eliminating highfrequency fluctuations via low-pass rolling standard deviation pipelines.",
      "Aided predictive fault detection, scoring continuous signal indicators to schedule preemptive machine downtime."
    ]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming & Analysis",
    skills: [
      { name: "Python (Pandas, NumPy)", proficiency: 85, icon: "Code2" },
      { name: "SQL (PostgreSQL)", proficiency: 80, icon: "Database" },
      { name: "Exploratory Data Analysis (EDA)", proficiency: 88, icon: "BarChart3" }
    ]
  },
  {
    category: "Machine Learning & Theory",
    skills: [
      { name: "Predictive Modeling (Scikit-Learn)", proficiency: 78, icon: "Brain" },
      { name: "Data Cleaning & Imputation", proficiency: 90, icon: "Sparkles" },
      { name: "Retrieval-Augmented Generation (RAG)", proficiency: 70, icon: "SearchCode" }
    ]
  },
  {
    category: "Tools & Ecosystem",
    skills: [
      { name: "PostgreSQL & Redis", proficiency: 75, icon: "HardDrive" },
      { name: "Excel & PowerBI Workflows", proficiency: 85, icon: "FileSpreadsheet" },
      { name: "Git & GitHub Collaboration", proficiency: 82, icon: "GitBranch" }
    ]
  }
];

export const educationHistory: Education[] = [
  {
    id: "btech-ai-ds",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "Dhanalakshmi Srinivasan Engineering College",
    period: "Aug 2023 - May 2027",
    scoreLabel: "CGPA",
    scoreValue: "6.3 / 10",
    details: [
      "Currently pursuing 6th Semester",
      "Focused on Machine Learning models, Deep Learning Foundations, Database Management Systems, and Python analytics.",
      "Gained hands-on laboratory experience building regression systems and tabular query schemas."
    ]
  },
  {
    id: "higher-secondary",
    degree: "Higher Secondary (Bio-Mathematics)",
    institution: "Sakthi Matric Higher Secondary School",
    period: "Jun 2021 - May 2023",
    scoreLabel: "Percentage",
    scoreValue: "67.5%",
    details: [
      "Strong foundation in core mathematics, algebra, calculus, and scientific observation.",
      "Participated in regional science quizzes and coding basics competitions."
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: "cert1",
    name: "Programming in Python",
    issuer: "Simplilearn"
  },
  {
    id: "cert2",
    name: "Machine Learning Internship",
    issuer: "Unified Mentor"
  },
  {
    id: "cert3",
    name: "Problem Solving (Basic)",
    issuer: "HackerRank"
  },
  {
    id: "cert4",
    name: "Foundation of Artificial Neural Networks",
    issuer: "Udemy"
  }
];
