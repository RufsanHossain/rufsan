export interface BlogSection {
  type: "text" | "heading" | "code" | "callout";
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  sections: BlogSection[];
  relatedCases: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-0", slug: "crdts-vs-ot", title: "Why I Chose CRDTs Over OT for Real-Time Collaboration",
    tag: "Engineering", date: "Jan 15, 2025", readTime: "8 min",
    excerpt: "After benchmarking both approaches at scale, CRDTs won on every metric that mattered — here's the data.",
    heroImage: "#1a2e2e",
    sections: [
      { type: "text", content: "When I started building the real-time collaboration engine for a 50K+ concurrent user platform, the first architectural fork was clear: Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs). Google Docs famously uses OT. Figma chose CRDTs. Both work — but at scale, the differences compound into radically different operational realities." },
      { type: "heading", content: "The Core Difference" },
      { type: "text", content: "OT requires a central server to transform operations in order. Every edit must pass through a single coordination point. This works beautifully for Google — they own the infrastructure. For a startup shipping on a $40K/month AWS budget, that coordination bottleneck becomes the single point of failure and the scaling ceiling simultaneously." },
      { type: "text", content: "CRDTs take a fundamentally different approach: they encode conflict resolution into the data structure itself. Two users can edit simultaneously, offline, on different continents — and the documents will converge to the same state without any coordination. The math guarantees it." },
      { type: "heading", content: "Benchmarking at Scale" },
      { type: "text", content: "I built proof-of-concept implementations of both approaches and ran them through three scenarios: 100 users editing simultaneously, 1,000 users with 10% concurrent edits, and the stress test — 10,000 users with network partitions simulated every 30 seconds." },
      { type: "code", content: "// CRDT merge — no coordination needed\nconst mergedDoc = CRDT.merge(localState, remoteState);\n// Result is deterministic regardless of merge order\nassert(CRDT.merge(a, b) === CRDT.merge(b, a));" },
      { type: "text", content: "The results were decisive. OT held up fine at 100 users but latency spiked 4x at 1,000 during burst edits as the transform queue backed up. At 10,000 with network partitions, OT required complex reconciliation logic and occasionally dropped edits during recovery. CRDTs handled all three scenarios with near-identical latency profiles." },
      { type: "heading", content: "The Offline Factor" },
      { type: "text", content: "The killing blow for OT was offline support. Our product requirement was clear: users must be able to edit offline and sync seamlessly on reconnect. With OT, offline edits create a divergence problem that requires careful rebasing. With CRDTs, offline edits just... merge. The Service Worker queues operations locally, and on reconnect, the CRDT merge function handles everything deterministically." },
      { type: "heading", content: "The Tradeoffs" },
      { type: "text", content: "CRDTs aren't free. The metadata overhead is real — each character carries a unique ID and logical clock, which inflates document size roughly 2-3x compared to plain text. For our use case (documents under 100KB), this was negligible. For a platform like Google Docs handling 50-page academic papers, the calculus might differ." },
      { type: "text", content: "The implementation complexity is also front-loaded. Building a correct CRDT is harder than implementing basic OT. But once it's correct, the operational simplicity is transformative — no coordination server, no transform queue, no edge cases during network partitions." },
      { type: "heading", content: "The Result" },
      { type: "text", content: "Six months in production: 50K+ concurrent users, sub-80ms sync latency globally, zero data conflicts, 99.99% sync reliability. The CRDT architecture hasn't required a single hotfix related to conflict resolution. The decision paid for itself in the first month of operation." },
      { type: "callout", content: "Key takeaway: Choose OT if you control the infrastructure and need minimal metadata overhead. Choose CRDTs if you need offline support, peer-to-peer sync, or want to eliminate coordination complexity at scale." },
    ],
    relatedCases: ["realtime-collaboration"],
  },
  {
    id: "blog-1", slug: "rag-pipelines-no-hallucination", title: "Building RAG Pipelines That Don't Hallucinate",
    tag: "AI / ML", date: "Dec 8, 2024", readTime: "12 min",
    excerpt: "Grounding LLMs in your data is easy. Grounding them accurately is the hard part. Here's my production playbook.",
    heroImage: "#1a1a2e",
    sections: [
      { type: "text", content: "Every week I see another \"Build RAG in 10 minutes\" tutorial. They all follow the same pattern: chunk documents, embed them, stuff them into the prompt, done. And every week, production teams discover that this naive approach hallucinates 15-30% of the time. Here's what actually works after building RAG systems processing 10K+ daily queries with 97%+ accuracy." },
      { type: "heading", content: "The Chunking Problem Nobody Talks About" },
      { type: "text", content: "Most tutorials chunk by token count — 512 tokens with 50-token overlap. This is the single biggest source of RAG hallucinations. When you split a paragraph mid-thought, the embedding captures half an idea. The retriever returns a fragment. The LLM fills in the gap with plausible-sounding fabrication." },
      { type: "text", content: "The fix is semantic chunking. Parse document structure first — headings, paragraphs, lists, tables. Chunk at semantic boundaries. A paragraph that explains a concept stays together. A table row stays with its headers. This alone dropped our hallucination rate from 23% to 8%." },
      { type: "code", content: "// Semantic chunking pseudocode\nconst chunks = document.sections.flatMap(section => {\n  if (section.tokenCount <= MAX_TOKENS) return [section];\n  return section.paragraphs.reduce((acc, para) => {\n    const current = acc[acc.length - 1];\n    if (current.tokenCount + para.tokenCount <= MAX_TOKENS) {\n      current.content += '\\n' + para.content;\n      current.tokenCount += para.tokenCount;\n    } else {\n      acc.push({ ...para });\n    }\n    return acc;\n  }, [{ content: '', tokenCount: 0 }]);\n});" },
      { type: "heading", content: "Hybrid Retrieval: The Secret Weapon" },
      { type: "text", content: "Pure vector search fails on exact matches. Ask \"What is error code E-4012?\" and semantic search returns results about error handling in general. Pure keyword search fails on conceptual queries. The solution is hybrid retrieval: run both vector search and BM25 in parallel, then use Reciprocal Rank Fusion to merge the results. Hybrid retrieval improved recall@10 from 72% (vector only) to 91%." },
      { type: "heading", content: "The Confidence Scoring Layer" },
      { type: "text", content: "This is the piece that gets the hallucination rate from 8% to under 3%. After retrieval, before generation, run a cross-encoder reranker on the top candidates. Score each chunk's relevance to the query on a 0-1 scale. If no chunk scores above 0.6, don't generate — return 'I don't have enough information to answer that accurately.'" },
      { type: "text", content: "Yes, refusing to answer feels counterintuitive. But users trust a system that says 'I don't know' far more than one that confidently fabricates. Our CSAT scores jumped from 3.8 to 4.5 after adding the confidence gate." },
      { type: "heading", content: "Grounding the Generation" },
      { type: "text", content: "Even with perfect retrieval, the LLM can still hallucinate during generation. Two techniques eliminated this: structured prompting ('Answer ONLY using facts stated in the provided context. Cite the specific section for each claim.') and citation verification — for each claim in the response, tracing it back to a specific chunk." },
      { type: "heading", content: "Production Numbers" },
      { type: "text", content: "The full pipeline processes 10K+ queries daily. Accuracy sits at 97.2%. Average latency is 1.8 seconds end-to-end. The system handles 50K+ knowledge base articles across 3 languages." },
      { type: "callout", content: "The RAG accuracy stack: Semantic chunking (23% → 8% hallucination) + Hybrid retrieval (8% → 5%) + Confidence gating (5% → 3%) + Citation verification (3% → < 2%). Each layer compounds." },
    ],
    relatedCases: ["ai-qa-platform", "conversational-ai-assistant"],
  },
  {
    id: "blog-2", slug: "multi-tenant-tax", title: "The Multi-Tenant Tax: Architecture Decisions That Cost $200K",
    tag: "Architecture", date: "Nov 22, 2024", readTime: "10 min",
    excerpt: "Lessons learned from building tenant isolation the wrong way first, and how compound indexes saved us.",
    heroImage: "#2e1a1a",
    sections: [
      { type: "text", content: "I've built three multi-tenant SaaS platforms. The first one cost an extra $200K in engineering time because of decisions made in week one. The third one — the one serving 500+ organizations with $2M+ ARR — was built in half the time. Here's what I learned the expensive way." },
      { type: "heading", content: "The Database-Per-Tenant Trap" },
      { type: "text", content: "The first platform used database-per-tenant isolation. The pitch sounds great: complete data isolation, easy to reason about, simple backup per tenant. The reality was a maintenance nightmare. At 500 tenants, deployment took 45 minutes just for migrations." },
      { type: "code", content: "// The wrong way: database-per-tenant\nconst db = getConnection(`tenant_${tenantId}`);\n// 500 tenants = 500 connections = pool exhaustion\n\n// The right way: shared database, compound indexes\nconst results = await Order.find({\n  tenantId,  // Compound index: { tenantId: 1, createdAt: -1 }\n  createdAt: { $gte: startDate }\n});" },
      { type: "heading", content: "The Compound Index Revelation" },
      { type: "text", content: "The solution was embarrassingly simple: shared database, row-level isolation via tenantId field on every document, compound indexes leading with tenantId. Query performance actually improved — from 120ms (database-per-tenant with cold connections) to 8ms (shared database with warm compound index)." },
      { type: "heading", content: "The Middleware Layer" },
      { type: "text", content: "Row-level isolation only works if it's impossible to forget the tenant filter. We built ORM-level middleware that automatically injects tenantId into every query — as an infrastructure guarantee, not developer responsibility." },
      { type: "code", content: "// Tenant isolation middleware\nschema.pre(/^find/, function() {\n  const tenantId = getTenantContext();\n  if (!tenantId) throw new IsolationError('No tenant context');\n  this.where({ tenantId });\n});\n\n// Developers write normal queries\nconst orders = await Order.find({ status: 'active' });\n// Middleware transforms to: { status: 'active', tenantId: 'org_xyz' }" },
      { type: "text", content: "In two years of production, we've had zero cross-tenant data leaks. Not because our developers are perfect — because the middleware makes it architecturally impossible to query without tenant context." },
      { type: "heading", content: "The Billing Complexity" },
      { type: "text", content: "Usage-based billing is the second place multi-tenancy gets expensive. Our first attempt used synchronous metering — every API call checked usage against plan limits in real-time. At 1,000 RPS, this doubled API latency. The fix: asynchronous metering with Bull MQ. API calls fire-and-forget a usage event to a background queue. Plan limit checks use a Redis counter that's eventually consistent (within 30 seconds)." },
      { type: "heading", content: "The $200K Lesson" },
      { type: "text", content: "The first platform's database-per-tenant architecture required 3 additional engineers for 4 months to migrate to shared-database. At fully loaded cost, that's roughly $200K. The third platform started with shared-database, compound indexes, and ORM middleware from day one. It reached 500 tenants in 18 months with a team of 4." },
      { type: "callout", content: "Rules of multi-tenancy: (1) Shared database with compound indexes beats database-per-tenant for 95% of SaaS. (2) Tenant isolation belongs in middleware, not developer discipline. (3) Usage metering must be async — synchronous metering kills latency at scale." },
    ],
    relatedCases: ["multi-tenant-saas"],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
