export interface CaseMetric {
  v: string;
  l: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  vertical: string;
  verticalRoute: string | string[];
  title: string;
  outcome: string;
  overview: string;
  metrics: CaseMetric[];
  challenge: string;
  solutionSteps: string[];
  stack: string[];
  results: string;
  liveUrl?: string;
  mockupColor: string;
  images?: string[];
}

export const CASES: CaseStudy[] = [
  {
    id: "case-0", slug: "ai-qa-platform", vertical: "AI / ML", verticalRoute: "ai",
    title: "AI-Powered QA Platform", outcome: "60% reduction in QA cycle time",
    overview: "Built an automated testing pipeline that uses LLMs to generate test cases from user stories, execute them against staging environments, and report findings with suggested fixes.",
    metrics: [{ v: "60%", l: "Faster QA Cycles" }, { v: "3x", l: "More Test Coverage" }, { v: "85%", l: "Bug Detection Rate" }, { v: "< 5min", l: "Per Test Suite" }],
    challenge: "Generating contextually relevant test cases without hallucinating non-existent UI elements. The system needed to understand the actual application structure.",
    solutionSteps: [
      "Built a RAG pipeline grounded in the app's component tree and design system docs",
      "Implemented code-aware indexing extracting component props, routes, and state shapes",
      "Created multi-stage pipeline: context retrieval → test outline → full test → validation",
      "Added feedback loop where failed tests refine the model's understanding",
    ],
    stack: ["Next.js", "OpenAI GPT-4", "LangChain", "MongoDB", "Docker", "Redis", "Playwright", "TypeScript"],
    results: "Reduced QA cycle time by 60% while increasing test coverage 3x. Bug detection rate improved to 85% on first pass.",
    mockupColor: "#1a1a2e",
  },
  {
    id: "case-1", slug: "intelligent-document-processing", vertical: "AI / ML", verticalRoute: "ai",
    title: "Intelligent Document Processing", outcome: "85% automation rate",
    overview: "Enterprise system extracting, classifying, and validating information from contracts, invoices, and compliance documents using multimodal AI.",
    metrics: [{ v: "85%", l: "Automation Rate" }, { v: "97%", l: "Extraction Accuracy" }, { v: "50+", l: "Document Types" }, { v: "10x", l: "Processing Speed" }],
    challenge: "Diverse document formats with varying quality while maintaining 95%+ extraction accuracy across languages.",
    solutionSteps: [
      "Multi-stage pipeline: Tesseract OCR + GPT-4 Vision for layout understanding",
      "Classification model trained on 10K+ labeled examples",
      "Confidence scoring with automatic escalation below threshold",
      "Continuous learning from human corrections",
    ],
    stack: ["Python", "GPT-4 Vision", "Tesseract OCR", "PostgreSQL", "FastAPI", "Celery", "Redis", "Docker"],
    results: "85% full automation with 97% accuracy. Processing speed 10x over manual. Review team reduced from 12 to 4.",
    mockupColor: "#1a2e1a",
  },
  {
    id: "case-2", slug: "conversational-ai-assistant", vertical: "AI / ML", verticalRoute: "ai",
    title: "Conversational AI Assistant", outcome: "40% fewer support tickets",
    overview: "Customer-facing AI assistant with RAG knowledge base, multi-turn memory, and seamless human escalation. 10K+ daily conversations.",
    metrics: [{ v: "40%", l: "Fewer Tickets" }, { v: "10K+", l: "Daily Conversations" }, { v: "92%", l: "Resolution Rate" }, { v: "< 2s", l: "Response Time" }],
    challenge: "Conversation coherence across long interactions while knowing precisely when to escalate to humans.",
    solutionSteps: [
      "Sliding window context with semantic compression",
      "Hybrid RAG search over 50K+ knowledge base articles",
      "Confidence-calibrated escalation trained on 100K+ interactions",
      "Seamless handoff transferring full context to human agents",
    ],
    stack: ["Node.js", "Anthropic Claude", "Pinecone", "WebSocket", "React", "MongoDB", "Redis", "TypeScript"],
    results: "Ticket volume dropped 40%. 92% resolution without humans. CSAT improved from 3.8 to 4.5.",
    mockupColor: "#2e1a2e",
  },
  {
    id: "case-3", slug: "lucid-journal", vertical: "AI / ML", verticalRoute: ["ai", "dev"],
    title: "Lucid — AI-Powered Journal", outcome: "4 AI analysis lenses",
    overview: "A journal that thinks back. Rich-text journaling with mood tracking, quick capture, and four AI lenses — Challenge Mode, Pattern Recognition, Coaching Prompts, and Synthesis Reports — that turn daily writing into compounding self-awareness.",
    metrics: [{ v: "4", l: "AI Lenses" }, { v: "< 2s", l: "AI Response" }, { v: "PWA", l: "Mobile Ready" }, { v: "$8/mo", l: "Pro Tier" }],
    challenge: "Making AI analysis feel genuinely insightful rather than generic. Each lens needed to surface useful patterns from personal, unstructured writing — while the editor had to feel distraction-free yet powerful.",
    solutionSteps: [
      "Rich-text editor with mood tracking, word count, auto-save, and quick capture modal",
      "Four specialized Claude-powered lenses analyzing entries across weeks of context",
      "Semantic + full-text hybrid search for pattern detection over time",
      "Google & email auth with freemium model — 3 free entries/week, unlimited on Pro",
    ],
    stack: ["Next.js", "Anthropic Claude", "MongoDB", "Tailwind CSS", "PostHog", "TypeScript", "Vercel", "PWA"],
    results: "Public beta live with free and Pro ($8/mo) tiers. Four AI lenses deliver personalized weekly/monthly synthesis reports. Mobile-ready PWA with sub-2s AI responses.",
    liveUrl: "https://lucid-one-taupe.vercel.app",
    mockupColor: "#1a1a2e",
    images: [
      "/media/lucid.png",
      "/media/lenses.png",
      "/media/editor.jpg",
      "/media/challenge.png",
      "/media/quick-capture.png",
      "/media/login.png",
      "/media/insights.png",
      "/media/report.png",
      "/media/goals.png",
    ],
  },
  {
    id: "case-4", slug: "multi-tenant-saas", vertical: "Development", verticalRoute: "dev",
    title: "Multi-Tenant SaaS Platform", outcome: "$2M+ ARR",
    overview: "End-to-end SaaS with team workspaces, granular permissions, usage-based billing, and white-label support for 500+ orgs.",
    metrics: [{ v: "$2M+", l: "ARR" }, { v: "500+", l: "Organizations" }, { v: "< 50ms", l: "Avg Query" }, { v: "99.9%", l: "Uptime" }],
    challenge: "Strict data isolation across tenants with sub-50ms performance. Usage-based billing with real-time metering.",
    solutionSteps: [
      "Compound indexes with ORM-level isolation middleware",
      "Redis-backed tenant caching — config loads in < 1ms",
      "Stripe Connect with real-time metering via Bull MQ",
      "Dynamic theming via CSS custom properties at runtime",
    ],
    stack: ["Next.js", "MongoDB", "Stripe", "Redis", "Bull MQ", "Resend", "Docker", "AWS"],
    results: "$2M+ ARR in 18 months. 500+ orgs with 99.9% uptime. Zero data isolation incidents.",
    liveUrl: "https://saasplatform.rufsan.dev",
    mockupColor: "#1a2e2e",
  },
  {
    id: "case-5", slug: "realtime-collaboration", vertical: "Development", verticalRoute: "dev",
    title: "Real-Time Collaboration Tool", outcome: "50K+ concurrent users",
    overview: "Multiplayer editing with conflict-free sync, presence, version history, and offline support.",
    metrics: [{ v: "50K+", l: "Concurrent Users" }, { v: "< 80ms", l: "Sync Latency" }, { v: "0", l: "Data Conflicts" }, { v: "99.99%", l: "Reliability" }],
    challenge: "Concurrent edits from thousands of users without conflicts. Sub-100ms sync. Offline reconciliation.",
    solutionSteps: [
      "CRDT-based conflict resolution for eventual consistency",
      "Redis Pub/Sub across 6-node cluster",
      "Optimistic UI with server reconciliation",
      "Service Worker offline queue with CRDT merge",
    ],
    stack: ["Next.js", "WebSocket", "CRDT", "MongoDB", "Redis Pub/Sub", "Service Workers", "TypeScript", "Docker"],
    results: "50K+ concurrent users with sub-80ms latency. Zero conflicts. 99.99% sync reliability.",
    liveUrl: "https://collab.rufsan.dev",
    mockupColor: "#2e2e1a",
  },
  {
    id: "case-6", slug: "revenue-analytics", vertical: "Data Science", verticalRoute: "ds",
    title: "Revenue Analytics Dashboard", outcome: "2M+ daily events",
    overview: "Real-time revenue intelligence with predictive forecasting, cohort analysis, and anomaly detection for 200+ users.",
    metrics: [{ v: "2M+", l: "Daily Events" }, { v: "< 500ms", l: "Refresh" }, { v: "94%", l: "Forecast Accuracy" }, { v: "200+", l: "Active Users" }],
    challenge: "2M+ daily events with sub-second refresh and complex multi-touch attribution models.",
    solutionSteps: [
      "Kafka streaming into PostgreSQL materialized views",
      "Redis-cached rollups — 90% dashboard loads hit cache",
      "Multi-touch attribution as nightly batch with daily increments",
      "Prophet forecasting with confidence intervals",
    ],
    stack: ["Python", "D3.js", "PostgreSQL", "Redis", "Kafka", "Airflow", "Prophet", "Docker"],
    results: "Sub-500ms refresh at peak. 94% forecast accuracy at 30 days. Used daily by 200+ team members.",
    mockupColor: "#1a2e1a",
  },
  {
    id: "case-7", slug: "churn-prediction", vertical: "Data Science", verticalRoute: "ds",
    title: "Customer Churn Prediction", outcome: "35% less churn",
    overview: "ML-powered churn prediction identifying at-risk customers 30 days before cancellation with explainable insights.",
    metrics: [{ v: "35%", l: "Churn Reduction" }, { v: "30d", l: "Early Warning" }, { v: "88%", l: "Accuracy" }, { v: "$4.2M", l: "Revenue Saved" }],
    challenge: "5% churn rate class imbalance. CS team needed explainable predictions with recommended actions.",
    solutionSteps: [
      "SMOTE + calibrated probability scoring",
      "40+ signal feature engineering",
      "SHAP explanations in CS dashboard",
      "Automated intervention triggers by risk tier",
    ],
    stack: ["Python", "XGBoost", "Pandas", "FastAPI", "PostgreSQL", "Airflow", "SHAP", "Streamlit"],
    results: "Churn dropped 35%, saving $4.2M ARR. CS team proactively engages 30 days before cancellation.",
    mockupColor: "#2e1a2e",
  },
  {
    id: "case-8", slug: "supply-chain-optimization", vertical: "Data Science", verticalRoute: "ds",
    title: "Supply Chain Optimization", outcome: "$1.2M saved/year",
    overview: "Demand forecasting and inventory optimization across multi-warehouse e-commerce with 10K+ SKUs.",
    metrics: [{ v: "$1.2M", l: "Annual Savings" }, { v: "10K+", l: "SKUs" }, { v: "98.5%", l: "Service Level" }, { v: "40%", l: "Less Overstock" }],
    challenge: "10K+ SKUs with seasonal patterns, promotions, and supply disruptions across 8 warehouses.",
    solutionSteps: [
      "Hierarchical Prophet — top-down/bottom-up reconciled",
      "Promotional lift modeling from historical campaigns",
      "Linear programming via PuLP for 8-warehouse allocation",
      "Safety stock optimization per SKU",
    ],
    stack: ["Python", "Prophet", "PuLP", "Snowflake", "Streamlit", "Docker", "Pandas", "Airflow"],
    results: "$1.2M savings annually. 40% less overstock. 98.5% service levels. Runs daily automatically.",
    mockupColor: "#1a1a2e",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getCasesByVertical(verticalRoute: string): CaseStudy[] {
  return CASES.filter((c) =>
    Array.isArray(c.verticalRoute)
      ? c.verticalRoute.includes(verticalRoute)
      : c.verticalRoute === verticalRoute
  );
}
