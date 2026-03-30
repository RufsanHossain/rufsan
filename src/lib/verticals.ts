export interface Capability {
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface Principle {
  title: string;
  description: string;
  step?: string;
}

// ─── AI / ML ─────────────────────────────────────────────────

export const AI_CAPS: Capability[] = [
  { title: "LLM Integration", description: "Production integrations with OpenAI, Anthropic, and open-source. Multi-agent orchestration.", tags: ["OpenAI", "Anthropic", "LangChain"], icon: "llm" },
  { title: "RAG Pipelines", description: "Retrieval-Augmented Generation grounded in proprietary data. Hybrid retrieval.", tags: ["Pinecone", "Weaviate", "ChromaDB"], icon: "rag" },
  { title: "Fine-tuning", description: "Custom model fine-tuning. LoRA, QLoRA, evaluation frameworks.", tags: ["HuggingFace", "PyTorch", "W&B"], icon: "brain" },
  { title: "Computer Vision", description: "Classification, detection, visual understanding. Custom CNNs to multimodal.", tags: ["OpenCV", "YOLO", "GPT-4V"], icon: "eye" },
  { title: "AI Features", description: "Smart search, content generation, workflows, recommendation engines.", tags: ["API Design", "Streaming", "Caching"], icon: "sparkles" },
  { title: "MLOps", description: "Pipelines, versioning, A/B testing, monitoring, scalable inference.", tags: ["Docker", "SageMaker", "FastAPI"], icon: "gear" },
];

export const AI_TOOLS: ToolCategory[] = [
  { category: "LLM Providers", items: ["OpenAI", "Anthropic", "Mistral", "Llama", "Cohere"] },
  { category: "Frameworks", items: ["LangChain", "LlamaIndex", "Semantic Kernel", "AutoGen", "CrewAI"] },
  { category: "Vector DBs", items: ["Pinecone", "Weaviate", "ChromaDB", "Qdrant", "pgvector"] },
  { category: "ML/DL", items: ["PyTorch", "TensorFlow", "HuggingFace", "scikit-learn", "spaCy"] },
  { category: "Infra", items: ["Docker", "AWS", "FastAPI", "Celery", "Redis"] },
];

// ─── DEVELOPMENT ─────────────────────────────────────────────

export const DEV_CAPS: Capability[] = [
  { title: "SaaS Architecture", description: "Multi-tenant systems with subscriptions, RBAC, team workspaces.", tags: ["Multi-tenant", "Stripe", "RBAC"], icon: "layers" },
  { title: "Full-Stack Next.js", description: "Server-first apps with App Router, RSC, streaming, edge.", tags: ["App Router", "RSC", "Edge"], icon: "triangle" },
  { title: "API Design", description: "Production APIs — versioning, rate limiting, Zod, OpenAPI.", tags: ["Express", "Zod", "OpenAPI"], icon: "plug" },
  { title: "Database", description: "MongoDB schema design, aggregation, PostgreSQL with Prisma.", tags: ["MongoDB", "PostgreSQL", "Prisma"], icon: "database" },
  { title: "Auth & Security", description: "HTTP-only cookies, CSRF, RBAC, sanitization, Helmet.", tags: ["JWT", "OAuth 2.0", "Helmet"], icon: "shield" },
  { title: "DevOps", description: "Automated pipelines, containerization, monitoring, IaC.", tags: ["Docker", "GitHub Actions", "AWS"], icon: "rocket" },
];

export const DEV_PRINCIPLES: Principle[] = [
  { title: "Server-First", description: "Default Server Components. 'use client' only when hooks demand it." },
  { title: "Type Safety", description: "Strict TypeScript. Zod runtime. No any, no shortcuts." },
  { title: "Security by Default", description: "HTTP-only cookies, RBAC on every route, Helmet, sanitization." },
  { title: "Performance Budget", description: "Core Web Vitals as constraints. Dynamic imports, edge caching." },
];

export const DEV_TOOLS: ToolCategory[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "tRPC", "GraphQL", "Fastify"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Mongoose"] },
  { category: "Auth", items: ["NextAuth", "Clerk", "Stripe", "Resend", "Twilio"] },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx"] },
];

// ─── DATA SCIENCE ────────────────────────────────────────────

export const DS_CAPS: Capability[] = [
  { title: "Data Pipelines", description: "Robust ETL for messy real-world data. Batch and streaming.", tags: ["Spark", "Airflow", "Kafka"], icon: "flow" },
  { title: "Visualization", description: "Interactive dashboards — raw data to actionable insights.", tags: ["D3.js", "Plotly", "Recharts"], icon: "chart" },
  { title: "Statistical Modeling", description: "Hypothesis testing, regression, time series, A/B design.", tags: ["scikit-learn", "StatsModels", "SciPy"], icon: "compass" },
  { title: "Predictive Analytics", description: "Churn, forecasting, segmentation, anomaly detection.", tags: ["XGBoost", "Prophet", "MLflow"], icon: "trend" },
  { title: "Data Engineering", description: "Warehouses, lakehouse, data mesh. Query optimization.", tags: ["Snowflake", "BigQuery", "dbt"], icon: "server" },
  { title: "Business Intelligence", description: "KPI frameworks, metric trees, attribution, reporting.", tags: ["SQL", "Looker", "Tableau"], icon: "lightbulb" },
];

export const DS_PROCESS: Principle[] = [
  { step: "01", title: "Discover", description: "Business problem, data sources, success criteria." },
  { step: "02", title: "Explore", description: "EDA, data quality, feature engineering." },
  { step: "03", title: "Model", description: "Cross-validation, significance testing." },
  { step: "04", title: "Deploy", description: "Drift detection, alerting, retraining." },
];

export const DS_TOOLS: ToolCategory[] = [
  { category: "Languages", items: ["Python", "SQL", "R", "Julia", "Bash"] },
  { category: "Analysis", items: ["Pandas", "NumPy", "SciPy", "StatsModels", "scikit-learn"] },
  { category: "Viz", items: ["D3.js", "Plotly", "Matplotlib", "Seaborn", "Recharts"] },
  { category: "Infra", items: ["Spark", "Airflow", "Kafka", "dbt", "Snowflake"] },
  { category: "ML", items: ["XGBoost", "Prophet", "MLflow", "FastAPI", "Docker"] },
];

// ─── HOME PAGE ───────────────────────────────────────────────

export const HOME_STATS = [
  { v: "5+", l: "Years Experience" },
  { v: "40+", l: "Projects Delivered" },
  { v: "10+", l: "SaaS Products" },
  { v: "100%", l: "Client Satisfaction" },
];

export const HOME_VERTICALS = [
  { id: "ai", n: "01", title: "AI / Machine Learning", desc: "Building intelligent systems that learn, adapt, and deliver measurable outcomes.", tags: ["LLMs", "RAG", "Fine-tuning", "CV"], icon: "brain", route: "/ai" },
  { id: "dev", n: "02", title: "Development", desc: "Full-stack SaaS with MERN and Next.js. Scalable, secure, production-grade.", tags: ["Next.js", "React", "Node.js", "TS"], icon: "code", route: "/dev" },
  { id: "ds", n: "03", title: "Data Science", desc: "Raw data into strategic decisions. Pipelines, models, and dashboards.", tags: ["Python", "Pandas", "D3.js", "ML"], icon: "chart", route: "/ds" },
];

export const HOME_TOOLS: ToolCategory[] = [
  { category: "Development", items: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Framer Motion"] },
  { category: "AI / ML", items: ["OpenAI", "LangChain", "HuggingFace", "TensorFlow", "Python"] },
  { category: "Data", items: ["Pandas", "NumPy", "D3.js", "Spark", "Jupyter"] },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx"] },
];

// ─── ABOUT PAGE ──────────────────────────────────────────────

export const TIMELINE = [
  { year: "2025–Now", role: "Full-Stack Developer", company: "Media Pantheon, Inc.", desc: "Building production web applications full-time. Full-stack development with modern frameworks." },
  { year: "2024–Now", role: "Founder & Lead Developer", company: "Agency / Freelance", desc: "AI-integrated SaaS products for US-market clients. End-to-end product delivery." },
  { year: "2023–2024", role: "Brand Representative", company: "Interactive Cares", desc: "Product research and software industry representation in the Dhaka tech ecosystem." },
  { year: "2023–2024", role: "Senior Content Writer", company: "A1 DIGI", desc: "SEO-optimized content strategy, product research, and technical writing." },
];