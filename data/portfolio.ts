export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Project {
  title: string;
  year: string;
  tech: string[];
  description: string;
  metrics: string[];
  tag: string;
  featured: boolean;
  hasPaper?: boolean;
}

export interface TimelineItem {
  type: 'education' | 'experience' | 'certification';
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
}

export const personal = {
  name: 'Taha Tanvir',
  title: 'AI Engineer',
  location: 'Lahore, Punjab, Pakistan',
  email: 'tahatanvir605@gmail.com',
  phone: '+923117025605',
  linkedin: 'https://linkedin.com/in/tahatanvir',
  github: 'https://github.com/TahaUser5',
  summary:
    'AI Engineer with a full-stack background, completing an MPhil in Artificial Intelligence at PUCIT. Experienced in building ML pipelines, deep learning models, LLMs, and production-ready AI applications from research to deployment.',
  roles: [
    'AI Engineer',
    'ML Researcher',
    'RAG Specialist',
    'Deep Learning Engineer',
    'Full-Stack Developer',
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI & Machine Learning',
    icon: '⬡',
    skills: [
      'PyTorch',
      'Scikit-learn',
      'HuggingFace',
      'LSTM',
      'GRU',
      'CNN',
      'Transformers',
      'ViT',
      'Swin Transformer',
      'Deep Learning',
    ],
  },
  {
    category: 'RAG & Information Retrieval',
    icon: '◈',
    skills: [
      'LangChain',
      'Pinecone',
      'FAISS',
      'BM25',
      'Cohere Reranking',
      'Ragas',
      'TF-IDF',
    ],
  },
  {
    category: 'Generative AI',
    icon: '✦',
    skills: [
      'Diffusers',
      'DreamBooth',
      'LoRA',
      'SDXL',
      'CLIP',
      'Stable Diffusion',
    ],
  },
  {
    category: 'Backend & Infrastructure',
    icon: '◉',
    skills: [
      'Docker',
      'FastAPI',
      'Flask',
      'Firebase',
      'PostgreSQL',
      'MongoDB',
      'REST APIs',
    ],
  },
  {
    category: 'Programming Languages',
    icon: '⟨⟩',
    skills: ['Python', 'JavaScript', 'C++', 'HTML', 'CSS'],
  },
  {
    category: 'Web & Mobile',
    icon: '▣',
    skills: ['React.js', 'Node.js', 'Express.js', 'Flutter'],
  },
];

export const projects: Project[] = [
  {
    title: 'RAG Knowledge Base System',
    year: '2026',
    tech: ['Python', 'LangChain', 'Pinecone', 'Cohere', 'FastAPI', 'Docker', 'Streamlit'],
    description:
      'Hybrid RAG pipeline combining dense vector search (HuggingFace + Pinecone) with BM25 sparse retrieval, Cohere Reranking, and Gemini generation. Plug-and-play retriever/LLM architecture deployed via FastAPI, Docker, and Streamlit.',
    metrics: ['1.0 Ragas faithfulness score', 'Hybrid dense + sparse retrieval', 'Plug-and-play architecture'],
    tag: 'RAG',
    featured: true,
  },
  {
    title: 'DreamBooth LoRA — Few-Shot Subject Generation on SDXL',
    year: '2026',
    tech: ['PyTorch', 'Diffusers', 'CLIP', 'SDXL', 'LoRA', 'rembg'],
    description:
      'Fine-tuned SDXL (6.6B params) with LoRA Rank-32 on only 5 photos per subject on a 15GB GPU using 13 memory optimization techniques. Full rembg background removal + prior preservation pipeline.',
    metrics: ['70.88% CLIP-I fidelity', 'vs 48.20% SD 1.5 baseline', '+47% relative improvement'],
    tag: 'Generative AI',
    featured: true,
  },
  {
    title: 'CIFAR-100 Architecture Benchmark',
    year: '2025',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'ViT-B/16', 'Swin Transformer'],
    description:
      'Comprehensive benchmark of ResNet50, ViT-B/16, and Swin Transformer Tiny on CIFAR-100 with ImageNet pre-trained weights via transfer learning. Analyzed convergence speed, memory footprint, and generalization tradeoffs.',
    metrics: ['ResNet50: 82.22%', 'ViT-B/16: 87.73%', 'Swin Tiny: 87.23%'],
    tag: 'ML Research',
    featured: false,
  },
  {
    title: 'Multimodal Human Activity Recognition',
    year: '2025',
    tech: ['Python', 'PyTorch', 'CNN-LSTM', 'CogAge'],
    description:
      'Early vs Late Fusion comparison for 12-class activity recognition across smartphone, smartwatch, and smart glasses sensor streams using LOSO validation. Findings published as a formal research paper.',
    metrics: ['55.18% subject-independent accuracy', 'LOSO validation', 'Published research paper'],
    tag: 'Research',
    featured: false,
    hasPaper: true,
  },
  {
    title: 'AI Voice Cloning Application',
    year: '2025',
    tech: ['Python', 'Flask', 'Deep Learning', 'TTS', 'Flutter', 'Firebase'],
    description:
      'Final Year Project integrating pre-trained TTS deep learning models via Flask backend for high-fidelity voice cloning from reference audio. Cross-platform Flutter mobile app with Firebase auth, audio storage, and real-time sync.',
    metrics: ['Cross-platform mobile app', 'Firebase real-time sync', 'High-fidelity voice cloning'],
    tag: 'FYP',
    featured: false,
  },
];

export const timeline: TimelineItem[] = [
  {
    type: 'education',
    title: 'MPhil in Artificial Intelligence',
    org: 'University of the Punjab — PUCIT',
    location: 'Lahore, Pakistan',
    period: '2025 — Present',
    description:
      'Postgraduate research in AI, specializing in advanced machine learning systems and production AI deployment pipelines.',
  },
  {
    type: 'certification',
    title: 'IBM Full Stack Software Developer Professional Certificate',
    org: 'Coursera / IBM',
    location: 'Remote',
    period: 'December 2025',
    description: 'Issued by IBM, verified on Credly.',
  },
  {
    type: 'experience',
    title: 'Freelance Full Stack Developer',
    org: 'Fiverr',
    location: 'Remote',
    period: '2023 — 2024',
    description:
      'Built a full-stack data management system for a Switzerland-based client using MERN stack — from database architecture to React frontend. Managed end-to-end deployment including domain config, cloud hosting, and REST API integration for secure data handling.',
  },
  {
    type: 'education',
    title: 'Bachelor of Science in Software Engineering',
    org: 'University of Lahore (UOL)',
    location: 'Lahore, Pakistan',
    period: '2021 — 2025',
    description:
      'Completed BS in Software Engineering. Final Year Project: AI Voice Cloning application using deep learning TTS models and Flutter.',
  },
];
