/* ===========================================================================
   PORTFOLIO CONTENT — this is the only file you edit to change the homepage.
   Plain JavaScript object, no build step. Open index.html to see changes.

   Notes:
   * Fields ending in `Html` accept inline tags (<b>, <a>). Everything else is
     plain text and is escaped before it reaches the page.
   * `null` means "not available yet" — nothing is rendered for it.
   * index.html also contains a static copy of this content so the page still
     reads correctly with JavaScript disabled. If you change something here,
     change the matching block in index.html too (or accept that the no-JS
     fallback is slightly out of date).
   * Dates, links and stacks must match ../../resume/data.typ.
   =========================================================================== */

window.SITE = {
  name: "Manjeet Tiwari",
  role: "Backend Engineer · Java / Spring Boot",
  location: "New Delhi, India",
  graduating: "June 2027",
  availability: "Open to backend / SDE roles",

  taglineHtml:
    "I build backends that stay <b>correct under retries, concurrency and failure</b> — transactional money movement, role-based authorization, and applied cryptography. Final-year Computer Science student at GGSIPU, New Delhi.",

  aboutHtml: [
    "<p>Final-year Computer Science student at Guru Gobind Singh Indraprastha University (GPA 8.9/10 overall, 9.23/10 in the 6th semester). My work is Java and Spring Boot: REST APIs, PostgreSQL, and the unglamorous parts — locking order, idempotency, and what happens when a client retries a payment. An internship added NestJS, TypeScript and TypeORM.</p>",
    '<p>Three projects, two internships and a club role. <a href="saakh.html">SAAKH</a> is about financial-transfer correctness, the <a href="upi-mesh.html">offline mesh payment simulation</a> is about cryptography and duplicate delivery, and the <a href="rbac.html">JWT RBAC module</a> is about separating authentication from authorization. Each page below says plainly what the project does <em>not</em> claim.</p>',
  ],

  links: {
    github: "https://github.com/Manjeet2684",
    linkedin: "https://www.linkedin.com/in/manjeet-tiwari-324960360",
    email: "mailto:manjeettiwari2684@gmail.com",
    phone: "tel:+919430681239",
    resume: "./resume/Manjeet_Tiwari_Java_Backend_Developer.pdf",
    portfolio: "https://manjeet2684.github.io",
    // Fill these in when the profiles are real. While both are null the
    // "Problem solving" section stays hidden and section numbers shift up.
    leetcode: null,
    gfg: null,
  },

  // Shown as a strip under the hero. Facts only.
  proof: [
    { label: "Primary stack", value: "Java 21 · Spring Boot 3.5" },
    { label: "Data & messaging", value: "PostgreSQL · Kafka · Flyway" },
    { label: "SAAKH test suite", value: "47 tests · Testcontainers" },
    { label: "Graduating", value: "June 2027 · GGSIPU" },
  ],

  capabilities: [
    {
      title: "Transactional correctness",
      text: "Money moves inside one database transaction — debit, credit, immutable double-entry ledger, idempotency record and outbox event commit together or not at all.",
      chips: ["PostgreSQL", "SELECT … FOR UPDATE", "Idempotency-Key", "Transactional outbox"],
      href: "saakh.html",
      linkText: "See it in SAAKH →",
    },
    {
      title: "Authentication & authorization",
      text: "A JWT filter establishes who the caller is before any controller runs; roles and method-level rules decide what that caller is allowed to invoke.",
      chips: ["Spring Security", "JWT", "BCrypt", "@PreAuthorize"],
      href: "rbac.html",
      linkText: "See it in the RBAC module →",
    },
    {
      title: "Applied cryptography",
      text: "Payment packets survive untrusted hops: tampering fails the GCM tag, stale packets fail the freshness window, and replays lose the hash claim.",
      chips: ["RSA-OAEP", "AES-256-GCM", "SHA-256", "Replay protection"],
      href: "upi-mesh.html",
      linkText: "See it in the mesh simulation →",
    },
  ],

  projects: [
    {
      href: "saakh.html",
      title: "SAAKH",
      tag: "Flagship",
      featured: true,
      problem:
        "Retries, duplicate requests and concurrent debits turn a straightforward transfer API into double-spends and missing events.",
      blurb:
        "A correctness-focused financial transfer and reconciliation backend. Spring Boot monolith where PostgreSQL is the source of truth and Kafka is only ever touched after commit.",
      pointsHtml: [
        "<b>Guarantee.</b> One PostgreSQL transaction writes the debit, credit, transfer row, double-entry ledger lines, idempotency record and outbox event.",
        "<b>Concurrency.</b> Accounts are locked with ordered <code>SELECT … FOR UPDATE</code>, so overlapping A→B and B→A transfers cannot deadlock or lose updates.",
        "<b>Retries.</b> An <code>Idempotency-Key</code> plus a SHA-256 body fingerprint replays the original transfer and rejects conflicting reuse with 409.",
        "<b>Proof.</b> 47 automated tests, Testcontainers for PostgreSQL and Kafka, run on GitHub Actions.",
      ],
      chips: ["Java 21", "Spring Boot 3.5", "PostgreSQL", "Kafka", "Flyway", "Testcontainers", "Docker"],
      repo: "https://github.com/Manjeet2684/SAAKH",
    },
    {
      href: "upi-mesh.html",
      title: "UPI Offline Mesh Payment System",
      tag: "Simulation",
      featured: false,
      problem:
        "A payment instruction cannot reach a server that has no network — and once it finally arrives, several devices may deliver the same one.",
      blurb:
        "A simulation of deferred settlement without connectivity: encrypted payment packets hop a software mesh of untrusted devices until an internet-connected bridge uploads them.",
      pointsHtml: [
        "<b>Confidentiality.</b> Hybrid RSA-OAEP key wrapping over AES-256-GCM payloads, so intermediate devices only ever see opaque ciphertext.",
        "<b>Integrity.</b> GCM tag verification, <code>signedAt</code> freshness windows and SHA-256 ciphertext hashing before anything settles.",
        "<b>Duplicates.</b> An atomic hash claim plus a unique packet-hash constraint means concurrent duplicate deliveries settle once.",
        "<b>Scope.</b> A simulation and teaching demo — not NPCI, not a UPI switch, not a live payment network.",
      ],
      chips: ["Java", "Spring Boot", "RSA-OAEP", "AES-256-GCM", "SHA-256", "H2"],
      repo: "https://github.com/Manjeet2684/UPI-OFFLINE-MESH-PAYMENT-SYSTEM-",
    },
    {
      href: "rbac.html",
      title: "Common Login Module (RBAC)",
      tag: "AuthN / AuthZ",
      featured: false,
      problem:
        "APIs leak when identity and permission are decided in the same controller check.",
      blurb:
        "A reusable Spring Security login module that keeps authentication and authorization as two separate decisions instead of one tangled controller check.",
      pointsHtml: [
        "<b>Authentication.</b> <code>JwtAuthenticationFilter</code>, <code>CustomUserDetailsService</code> and BCrypt populate the security context before controllers run.",
        "<b>Authorization.</b> USER / MODERATOR / ADMIN roles enforced with method-level <code>@PreAuthorize</code>, including admin-or-self access.",
        "<b>Failure modes.</b> Global JSON handling for 401, 403 and validation errors, and a filter chain that fails closed.",
      ],
      chips: ["Java", "Spring Boot", "Spring Security", "JWT", "JPA/Hibernate", "H2"],
      repo: null,
    },
  ],

  experience: [
    {
      role: "AI & Generative AI Intern — IBM SkillsBuild (Edunet Foundation)",
      dates: "Aug 2026 – Present",
      sub: "Generative AI, Agentic AI, Machine Learning, IBM watsonx, watsonx Orchestrate",
      bullets: [
        "Studying machine learning foundations and generative AI — large language model behaviour, prompt design, and responsible-use limits — through hands-on IBM watsonx labs.",
        "Composing agents from tools and skills in IBM watsonx Orchestrate to automate multi-step workflows rather than one-shot prompts.",
      ],
    },
    {
      role: "Backend Developer Intern — PearlThoughts",
      dates: "Jul 2026 – Aug 2026",
      sub: "Remote · NestJS, TypeScript, PostgreSQL, TypeORM, REST APIs, JWT",
      bullets: [
        "Built Schedula, a doctor–patient appointment backend, with JWT authentication, doctor/patient onboarding, and recurring availability with date overrides.",
        "Implemented STREAM and WAVE booking modes on PostgreSQL with pessimistic locking, a 30-minute cancel/reschedule cutoff, and next-available-slot suggestions.",
      ],
    },
    {
      role: "Web Development Volunteer — Coding Rangers, College Coding Club",
      dates: "May 2025",
      sub: "TIIPS, Greater Noida · HTML, CSS, JavaScript",
      bullets: [
        "Built and maintained the club’s event-registration page and mentored juniors in front-end debugging during weekly sessions.",
      ],
    },
  ],

  skills: [
    { label: "Languages", items: ["Java", "TypeScript", "SQL", "Python", "JavaScript (fundamentals)"], lead: 1 },
    { label: "Backend", items: ["Spring Boot", "Spring Security", "JPA/Hibernate", "REST APIs", "JWT", "NestJS", "TypeORM"], lead: 1 },
    { label: "Data & messaging", items: ["PostgreSQL", "MySQL", "H2", "Flyway", "Apache Kafka"], lead: 1 },
    { label: "Platform & testing", items: ["Docker", "Docker Compose", "GitHub Actions", "Git", "JUnit", "MockMvc", "Testcontainers"], lead: 0 },
    { label: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"], lead: 0 },
    { label: "Familiar", items: ["Redis", "MongoDB", "FastAPI", "Kubernetes", "SonarQube", "AWS (EC2)"], lead: 0 },
  ],

  education: {
    school: "Guru Gobind Singh Indraprastha University",
    dates: "2023 – Expected June 2027",
    detail: "B.Tech, Computer Science & Technology — GPA 8.9/10 overall (9.23/10, 6th semester)",
    secondary: "Class XII (CBSE) 82.8%, Mar 2023 · Class X (CBSE) 93.16%, Mar 2021",
  },

  achievements: [
    { title: "Microsoft TechJam 2.0 — Round 3", detail: "Team S-Squad · Microsoft Sovereign Office, Noida · Nov 2025" },
    { title: "Smart India Hackathon 2025", detail: "Team quantum_Coders · Sep 2025" },
    { title: "Spring 5 Basics with Spring Boot", detail: "Infosys Springboard · Apr 2026" },
    { title: "Spring Microservices", detail: "Infosys Springboard · Apr 2026" },
    { title: "Web Development Professional Certification", detail: "MTF Institute · Jun 2026" },
    { title: "Generative AI Foundational Certificate", detail: "School of AI · Nov 2025" },
    { title: "Python Using AI Workshop", detail: "AI For Techies · May 2026" },
    { title: "Syncathon ’25", detail: "Logic Sync · TIIPS, Greater Noida · 2025" },
  ],

  footerNote: "Static HTML, CSS and vanilla JavaScript. Résumé typeset with Typst.",
};
