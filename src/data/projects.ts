export interface Project {
  title: string;
  description: string;
  images: string[];
  link: string;
  category: string[];
  techStack: string[];
  details: string;
  pdfUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Scouter - AI Vision Analysis Assistant Platform",
    description: "AI-powered Vision Analysis platform for Hearing impaired People",
    images: ["https://www.youtube.com/embed/Uxv_diDK-7s"],
    link: "https://github.com/MinwooKim1990/scouter_pj",
    category: ["vision"],
    techStack: ["SRGAN", "MobileSAM", "Asyncronous LLM", "Florence 2"],
    details: `
- Real-time Zero-shot Object Analysis and Search
- Real-time Super-Resolution and LLM usage with STT
- Advanced vision processing capabilities
    `
  },
  {
    title: "JobPT - AI Job Searching Assistant",
    description: "AI-powered Matching Job Description to CV",
    images: ["https://www.youtube.com/embed/m6EhfmpShCg"],
    link: "https://github.com/MinwooKim1990/jobpt_un",
    category: ["nlp"],
    techStack: ["RAG", "ChromaDB", "Vision Parsing", "Knowledge Graph"],
    details: `
- Feedback on CV based on Job Description with numerical score
- Personalized interview question generation and CV Revision
- Advanced matching algorithms
    `
  },
  {
    title: "DINOv2 Backbone with TensorRT acceleration",
    description: "Non-Destructive Inspection System Demo",
    images: ["/images/lbp.png"],
    link: "https://github.com/MinwooKim1990/portfolio/blob/6e877d573dbb5384881bea858606025913f881de/Dino_Backbone2.ipynb",
    category: ["vision"],
    techStack: ["DINOv2", "TensorRT", "CUDA"],
    details: `
- Automated defect detection system using X-ray imagery
- Implemented LBP and advanced image preprocessing
- TensorRT optimization for real-time inference
    `
  },
  {
    title: "Chain of Thought (CoT) Agent Model Research",
    description: "Model Reasoning research like OpenAI's O1 model",
    images: ["/images/CoTAgent.png"],
    link: "https://github.com/MinwooKim1990/portfolio/tree/00d9eaf59c174386e73d0f00f9c9ae445d5eb2f3/CoTAgent",
    category: ["nlp"],
    techStack: ["Reasoning", "Sequential LLM", "CUDA"],
    details: `
- Chain of Thought (CoT) based agent systems with self-aware iteration
- Innovative sequential code execution approach
- Advanced reasoning capabilities
    `
  },
  {
    title: "Closetmate - AI Fashion Assistant",
    description: "AI-powered fashion recommendation system",
    images: ["/images/closetmate.png"],
    link: "https://github.com/MinwooKim1990/closetmate",
    category: ["vision", "machine-learning"],
    techStack: ["DeiT", "Vectorized Search", "K-means Clustering", "Boolean Masking"],
    details: `
- Personal wardrobe management and styling suggestions
- Image-based fashion item recognition
- Advanced recommendation algorithms
    `
  },
  {
    title: "J.A.R.V.I.S - Multimodal General Assistant",
    description: "AI-powered Multimodal Assistant system",
    images: ["/images/JARVIS.png"],
    link: "https://github.com/MinwooKim1990/portfolio/tree/d316a12a73eb0ae7d2c7c3c913f6f1603f55a51f/JARVIS",
    category: ["vision", "nlp"],
    techStack: ["Function Call", "Image Understanding", "STT, TTS", "Reduce Latency"],
    details: `
- Understand Image, Text, Audio, Function Call
- Response with Discord Bot
- Advanced multimodal processing
    `
  },
  {
    title: "Quantum Mechanics Research",
    description: "Advanced Physics Research in Quantum Computing",
    images: ["/images/quantum.gif"],
    link: "#",
    category: ["research", 'physics'],
    techStack: ["Quantum Computing", "Physics", "Mathematical Analysis"],
    details: `
- Quantum Computing research
- Feynman Integral analysis
- Advanced theoretical physics applications
    `
  },
  {
    title: "LLM Architecture Research",
    description: "Research on New Architecture for LLM",
    images: [],
    link: "#",
    category: ["research"],
    techStack: ["Mamba", "Jamba", "Hymba", "LTC", "Probability field"],
    details: `
- Research New Architecture for LLM
- Optimize Computing
- Reduce Size of Model
    `
  },
  {
    title: "Paged Attention Research",
    description: "Model optimization research in KV cache",
    images: ["/images/PagedAttention.png"],
    link: "https://github.com/MinwooKim1990/portfolio/blob/d316a12a73eb0ae7d2c7c3c913f6f1603f55a51f/PagedAttention/PA_Report.md",
    category: ["research"],
    techStack: ["vLLM", "PyTorch", "CUDA"],
    details: `
- Memory efficiency improvements
- Performance optimization techniques
- Advanced caching strategies
    `
  },
  {
    title: "Monosemantic Neuron Research",
    description: "Research on Neuron specific Monosemanticity",
    images: ["/images/monosemantic.png"],
    link: "https://github.com/MinwooKim1990/portfolio/blob/01f27bab8a1cf8d13a842b5d730e4527e0d95625/MonosemanticNeuron/Report.md",
    category: ["research"],
    techStack: ["Sparse AutoEncoder", "Transformer", "Monosemantic Neuron"],
    details: `
- Monosemanticity Checker with Sparse AutoEncoder
- Understanding LLM black box
- Advanced neural network analysis
    `
  },
  {
    title: "Parametric Neural Networks Integration",
    description: "Neural network-based approximation for Feynman integral",
    images: ["/images/pnni.jpg"],
    link: "https://github.com/MinwooKim1990/disser",
    category: ["research", "machine-learning", 'physics'],
    techStack: ["Deep Learning", "PyTorch", "Physics"],
    details: `
- Developed neural network-based approximation methods for Feynman integral calculations
- Reduced computational costs significantly compared to traditional methods
- Optimized for CERN LHC-like particle collision experiments
    `
  },
  {
    title: "Reinforcement Learning Chess",
    description: "Chess AI with MCTS and Deep Q-Network",
    images: ["/images/RLChess.png"],
    link: "https://github.com/MinwooKim1990/RLChess",
    category: ["machine-learning", "research"],
    techStack: ["MCTS", "DQN", "Parallel Processing"],
    details: `
- Optimized movement search with Monte Carlo Tree Search
- Reinforcement Learning with Deep Q-Network
- Parallel Computing for enhanced performance
    `
  }
];
