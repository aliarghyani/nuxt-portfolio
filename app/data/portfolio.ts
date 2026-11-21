import type { PortfolioData } from "@/types/portfolio.types";

export const portfolio: PortfolioData = {
  profile: {
    name: "Ali Arghyani",
    title: "Frontend Engineer",
    headline: "Practical solutions for complex workflows",
    location: "Based in Tehran, Iran · Working remotely with a team in Türkiye",
    summary:
      "I’ve worked in frontend development since 2023, building Vue and Nuxt interfaces for business teams and, more recently, for patients and clinic staff. At NexaPortal I help turn conversations about daily work into forms, permissions, and scheduling tools. Seven years in telecom taught me to investigate failures and automate recurring reports. I bring that experience to process improvement and use AI-assisted development with code review and testing.",
    seoDescription:
      "Ali Arghyani, Frontend Engineer working with Vue, Nuxt, and TypeScript. Explore healthcare interfaces, AI-assisted workflows, and reporting automation.",
    availability: "Available for selected freelance and contract projects.",
    focusAreas: [
      "Vue & Nuxt development",
      "Workflow automation",
      "Operational performance",
    ],
    avatar: "/img/AliProfile.webp",
    socials: {
      website: "https://aliarghyani.vercel.app",
      github: "https://github.com/aliarghyani",
      linkedin: "https://www.linkedin.com/in/aliarghyani/",
      spotify: "https://open.spotify.com/user/aliarghyani",
      bento: "https://bento.me/arghyani",
      instagram: "https://www.instagram.com/ali.arghyani/",
    },
  },

  mainTools: {
    title: "Main tools",
    items: [
      { label: "Vue.js", icon: "i-logos-vue" },
      { label: "Nuxt.js", icon: "i-logos-nuxt-icon" },
      { label: "TypeScript", icon: "i-logos-typescript-icon" },
      { label: "Vuetify", icon: "i-logos-vuetifyjs" },
      { label: "Tailwind CSS", icon: "i-logos-tailwindcss-icon" },
      { label: "Pinia", icon: "i-logos-pinia" },
      { label: "Vite", icon: "i-logos-vitejs" },
      { label: "Git/GitHub", icon: "i-mdi-github" },
    ],
  },

  roles: {
    title: "Roles",
    items: [
      { label: "Frontend Developer", icon: "i-twemoji-laptop" },
      { label: "SSR with Nuxt", icon: "i-twemoji-rocket" },
      { label: "UI Engineering", icon: "i-twemoji-toolbox" },
      { label: "DX & Performance", icon: "i-twemoji-high-voltage" },
    ],
  },

  values: {
    title: "Values",
    items: [
      {
        label: "Autonomy & Ownership",
        icon: "i-twemoji-key",
        description: "Take initiative and be accountable. Deliver end-to-end.",
      },
      {
        label: "High standards",
        icon: "i-twemoji-sparkles",
        description: "Aim for quality over shortcuts. Leave things better.",
      },
      {
        label: "Client-focused delivery",
        icon: "i-twemoji-handshake",
        description: "Understand goals, ship iteratively, and align outcomes.",
      },
      {
        label: "Teamwork & Mentoring",
        icon: "i-twemoji-people-holding-hands",
        description: "Share knowledge, elevate teammates, be reliable.",
      },
      {
        label: "Clear communication",
        icon: "i-twemoji-speech-balloon",
        description: "Explain the why/what/how. Prefer concise async updates.",
      },
    ],
  },

  services: [
    {
      step: "Understand",
      question: "What problem are we solving?",
      title: "Problem Discovery & Process Analysis",
      emphasis: "Telecom operations · Artemis · DigiHinet",
      description:
        "Understand the workflow, people, and constraints before choosing software. I draw on operational analysis and stakeholder discussions to structure requirements, identify bottlenecks, and clarify what needs further discovery.",
      outputs: ["Structured requirements", "Clear scope"],
      icon: "i-mdi-vector-polyline",
      to: "#work",
      linkLabel: "Explore the experience",
    },
    {
      step: "Build",
      question: "What is the practical next step?",
      title: "AI-Assisted Solution Development",
      emphasis: "Production frontend · Public engineering experiments",
      description:
        "Translate requirements into bounded implementation tasks. I build maintainable Vue/Nuxt applications and use Codex with repository context, explicit instructions, and review. Automation and broader system design are areas I’m developing through focused projects.",
      outputs: ["Working software", "Explicit system boundaries"],
      icon: "i-mdi-code-braces",
      to: "#projects",
      linkLabel: "Explore selected work",
    },
    {
      step: "Verify",
      question: "What evidence supports the result?",
      title: "Operational Performance & Delivery Quality",
      emphasis: "KPI analysis · Code review · Browser verification",
      description:
        "Check behavior against acceptance criteria, inspect failures, and keep limitations visible. My operational background informs how I use metrics, tests, browser checks, and decision records to review delivery and guide the next iteration.",
      outputs: ["Verification evidence", "Documented limitations"],
      icon: "i-mdi-check-decagram-outline",
      to: "#ai-stack",
      linkLabel: "Read the engineering notes",
    },
  ],

  stackGroups: [
    {
      title: "Core Frontend",
      description:
        "Primary frontend stack for production Vue and Nuxt applications.",
      items: [
        {
          label: "Vue.js",
          icon: "i-logos-vue",
          to: "https://vuejs.org",
          type: "Framework",
        },
        {
          label: "Nuxt",
          icon: "i-logos-nuxt-icon",
          to: "https://nuxt.com",
          type: "Framework",
        },
        {
          label: "TypeScript",
          icon: "i-logos-typescript-icon",
          to: "https://www.typescriptlang.org",
          type: "Language",
        },
        {
          label: "JavaScript",
          icon: "i-logos-javascript",
          to: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          type: "Language",
        },
        {
          label: "HTML",
          icon: "i-logos-html-5",
          to: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          type: "Language",
        },
        {
          label: "CSS",
          icon: "i-logos-css-3",
          to: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          type: "Language",
        },
      ],
    },
    {
      title: "UI & Styling",
      description:
        "Component systems and responsive interfaces for business software.",
      items: [
        {
          label: "Vuetify",
          icon: "i-logos-vuetifyjs",
          to: "https://vuetifyjs.com",
          type: "Library",
        },
        {
          label: "Tailwind CSS",
          icon: "i-logos-tailwindcss-icon",
          to: "https://tailwindcss.com",
          type: "Framework",
        },
        {
          label: "Nuxt UI",
          icon: "i-logos-nuxt-icon",
          to: "https://ui.nuxt.com",
          type: "Library",
        },
        { label: "Responsive Design", icon: "i-mdi-responsive", type: "Tool" },
        {
          label: "Component Architecture",
          icon: "i-mdi-cube-outline",
          type: "Tool",
        },
      ],
    },
    {
      title: "State, Data & APIs",
      description: "Data flow, integrations, and real-world product states.",
      items: [
        {
          label: "Pinia",
          icon: "i-logos-pinia",
          to: "https://pinia.vuejs.org",
          type: "Library",
        },
        { label: "REST APIs", icon: "i-mdi-api", type: "Data" },
        {
          label: "Axios / Fetch",
          icon: "simple-icons:axios",
          to: "https://axios-http.com",
          type: "Library",
        },
        {
          label: "WebSocket",
          icon: "i-twemoji-electric-plug",
          to: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
          type: "Library",
        },
        {
          label: "Authentication flows",
          icon: "i-mdi-shield-key-outline",
          type: "Tool",
        },
      ],
    },
    {
      title: "Dashboards & Product Features",
      description: "Common building blocks for CRM, SaaS, and admin products.",
      items: [
        {
          label: "ECharts",
          icon: "simple-icons:apacheecharts",
          to: "https://echarts.apache.org",
          type: "Library",
        },
        { label: "Forms", icon: "i-mdi-form-select", type: "Tool" },
        { label: "Tables", icon: "i-mdi-table", type: "Tool" },
        { label: "RBAC", icon: "i-mdi-account-lock-outline", type: "Tool" },
        {
          label: "i18n",
          icon: "i-twemoji-globe-with-meridians",
          to: "https://vue-i18n.intlify.dev",
          type: "Library",
        },
        { label: "PWA", icon: "i-mdi-cellphone-link", type: "Tool" },
      ],
    },
    {
      title: "Testing & Workflow",
      description:
        "Quality and delivery practices used around production frontend work.",
      items: [
        {
          label: "Cypress",
          icon: "logos:cypress-icon",
          to: "https://www.cypress.io",
          type: "Testing",
        },
        {
          label: "Git",
          icon: "i-logos-git-icon",
          to: "https://git-scm.com",
          type: "DevOps",
        },
        {
          label: "GitHub Actions",
          icon: "simple-icons:githubactions",
          to: "https://docs.github.com/actions",
          type: "DevOps",
        },
        { label: "CI/CD", icon: "i-mdi-source-branch-sync", type: "DevOps" },
        {
          label: "AI-assisted development",
          icon: "i-mdi-robot-outline",
          type: "Tool",
        },
      ],
    },
    {
      title: "Currently Expanding",
      description:
        "React ecosystem skills being built through production-style dashboard work.",
      items: [
        { label: "React", icon: "i-logos-react", type: "Framework" },
        { label: "Next.js", icon: "i-logos-nextjs-icon", type: "Framework" },
        {
          label: "TanStack Query",
          icon: "i-mdi-database-sync-outline",
          type: "Library",
        },
        {
          label: "React Hook Form",
          icon: "i-mdi-form-textbox",
          type: "Library",
        },
        { label: "Zod", icon: "i-mdi-shield-check-outline", type: "Library" },
        {
          label: "Shadcn/UI",
          icon: "i-mdi-view-grid-plus-outline",
          type: "Library",
        },
      ],
    },
  ],

  reactExpansion: {
    title: "Currently expanding into React and Next.js",
    description:
      "To increase cross-team flexibility, I am building production-style dashboard projects with React, Next.js, TypeScript, TanStack Query, React Hook Form, Zod, and Shadcn/UI. Vue, Nuxt, and TypeScript remain my strongest production stack.",
    items: [
      { label: "React", icon: "i-logos-react" },
      { label: "Next.js", icon: "i-logos-nextjs-icon" },
      { label: "TanStack Query", icon: "i-mdi-database-sync-outline" },
      { label: "React Hook Form", icon: "i-mdi-form-textbox" },
      { label: "Zod", icon: "i-mdi-shield-check-outline" },
      { label: "Shadcn/UI", icon: "i-mdi-view-grid-plus-outline" },
    ],
  },

  cta: {
    title: "Have a workflow or product problem to work through?",
    description:
      "Share the problem, current workflow, and constraints. I’m available for selected software implementation, frontend, and workflow automation projects on a freelance, part-time, or contract basis.",
  },

  experiences: [
    {
      company: "NexaPortal",
      link: "https://nexaportal.com/",
      logo: "/img/NexaPortal1.png",
      location: "İzmir, Türkiye · Remote",
      type: "Full-time",
      positions: [
        {
          title: "Frontend Developer",
          start: "Dec 2024",
          ongoing: true,
          description: [
            "Developing patient interfaces and operational workflows for Elara Medical and Artemis Clinics through NexaPortal.",
            "Contributing to Artemis product and technical discussions with the CEO, turning voice and text discussions into structured requirements and implementation context, and supporting planning, frontend delivery, and verification.",
            "Implementing Vue 3 + TypeScript architecture with Vuetify, Vite, Pinia, RBAC and i18n; focus on DX, performance and a11y.",
            "Built end-user app and admin dashboard: https://app.elaramedical.com/ · https://dashboard.elaramedical.com/",
            "PWA features, form-heavy flows, calendar and scheduling UX, Google API integrations, and real‑time via WebSocket.",
            "Quality gates: ESLint strict, E2E tests with Cypress, CI‑friendly builds and code reviews.",
          ],
          icons: [
            "i-logos-vue",
            "i-logos-vuetifyjs",
            "i-logos-typescript-icon",
            "i-logos-vitejs",
            "i-logos-pinia",
            "i-logos-eslint",
            "i-logos-cypress",
          ],
          link: "https://app.elaramedical.com/",
          linkLabel: "Elara Platform",
        },
      ],
    },
    {
      company: "DigiHinet",
      link: "https://digihinet.com/",
      type: "Part-time · Temporary",
      positions: [
        {
          title: "Advisor to the CEO & Technical Team",
          start: "Apr 2026",
          end: "Oct 2026",
          description: [
            "Advised the CEO and technical team on business problems, technical options, and requirements during a temporary, part-time engagement.",
            "Participated in interviews to understand candidates’ soft skills and helped newcomers clarify career directions, learning priorities, and professional growth.",
          ],
        },
      ],
    },
    {
      company: "Freelancer",
      type: "Self-employed",
      location: "Tehran, Iran · Hybrid",
      positions: [
        {
          title: "Frontend Developer | Vue.js, Nuxt.js, TailwindCSS",
          start: "Sep 2023",
          end: "Dec 2024",
          description: [
            "Built server-rendered pages with Nuxt 3 and Vue 3 for client websites.",
            "Designed modular, maintainable component systems; ensured responsive, accessible UIs across devices.",
            "Collaborated with cross‑functional teams using Git; shipped iteratively with clear client‑focused outcomes.",
            "Translated client requirements into frontend tasks and reusable components with Vue, Nuxt, Vuetify, and VueUse.",
            "Recent: https://ideh.app/ · https://insho.app/ · https://laservice.ir/ · https://bamashin.net/ · https://hiloop.app/ · https://atdeloop.com/",
          ],
          icons: [
            "i-logos-nuxt-icon",
            "i-logos-vue",
            "i-logos-tailwindcss-icon",
            "i-logos-vuetifyjs",
            "i-logos-typescript-icon",
          ],
        },
      ],
    },
    {
      company: "Huawei",
      logo: "/img/huawei.svg",
      location: "Tehran, Iran",
      positions: [
        {
          title: "Senior Performance Team Analyst and Team Lead",
          start: "Apr 2022",
          end: "Aug 2023",
          description: [
            "Monitored network performance and availability for MTN Irancell sites nationwide.",
            "Led KPI analysis (2G/3G/4G), TCHA checks, root‑cause analysis and end‑to‑end incident follow‑ups to resolution.",
            "Produced weekly/monthly/quarterly stakeholder reports; ensured contractual OLA/SLA compliance and risk escalation.",
            "Automated performance reporting with Python, Pandas, and Excel, connecting operational analysis to repeatable software workflows.",
            "Coordinated contractors and subcontractors; planned and tracked high‑risk initiatives and recovery actions.",
            "Defined scope, schedules, policies and procedures; improved processes, audits and operational quality.",
            "Optimized OPEX by eliminating needless costs; forecasting and budgeting with timely financial statements.",
            "Reported progress to the customer and followed up on financial and contractual commitments.",
            "Hands‑on with OSS/MW tools across Ericsson/Huawei/Nokia ecosystems; mentored team members.",
          ],
        },
        {
          title: "Senior Performance Analyst",
          start: "Jul 2018",
          end: "Apr 2022",
          description: [
            "Drove network KPI analysis across 2G/3G/LTE; identified trends and improvement opportunities.",
            "Contributed to audits, process improvements and performance dashboards; supported incident resolution workflows.",
          ],
        },
        {
          title: "Assistant Regional Manager",
          start: "Mar 2018",
          end: "Jul 2018",
          description: [
            "Coordinated BTS maintenance and site acceptance across Tehran Province for 2G, 3G, and 4G networks.",
            "Managed subcontractors and planning interface; translated technical specs into executable implementation plans.",
            "Removed blockers during acceptance; escalated out‑of‑scope risks to achieve win‑win outcomes with the customer.",
          ],
        },
        {
          title: "TCHA Team Lead",
          start: "Jun 2017",
          end: "Mar 2018",
          description: [
            "Built comprehensive availability dashboards; main owner driving stakeholder alignment under strict contracts.",
            "Analyzed KPIs and traffic/control channels; performed remote actions and tracked escalations end‑to‑end to resolution.",
            "Recognized as outstanding fresh graduate in Huawei annual meeting.",
          ],
        },
        {
          title: "Back Office Employee",
          start: "Jun 2016",
          end: "Jun 2017",
          description: [
            "Supported OSS operations, performance checks and reporting; contributed to team efficiency and customer satisfaction.",
          ],
        },
      ],
    },
    {
      company: "Solar Energy World",
      positions: [
        {
          title: "Solaris System Administrator",
          start: "Jul 2015",
          end: "Jun 2016",
          description: ["Solar systems monitoring and Solaris administration."],
        },
      ],
    },
    {
      company: "Adfa l آدفا",
      location: "Tehran Province, Iran",
      positions: [
        {
          title: "Administrator",
          start: "Jun 2015",
          end: "Jun 2016",
          description: [
            "Hardware/software support and administrative tasks for Municipality of District 3, Tehran.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: "Qom University of Technology",
      degree: "Bachelor’s degree, Telecommunications Engineering",
      start: "2010",
      end: "2015",
      icons: ["i-material-symbols-school"],
      logo: "/img/qut_logo-light.jpg",
    },
  ],

  projects: [
    {
      name: "nuxt-portfolio",
      featured: true,
      description:
        "This site lets a recruiter read a case study, switch languages, and download the corresponding résumé.",
      context:
        "Keeping a website and two separately formatted résumés in sync meant editing the same experience in several places.",
      role: "I maintain the bilingual portfolio and extended the existing Nuxt app with localized résumé content, PDF export, and browser checks.",
      features: [
        "Persian RTL and English LTR",
        "Light and dark themes",
        "Browser checks for navigation and export",
      ],
      stack: [
        "Nuxt 4",
        "TypeScript",
        "Nuxt UI",
        "Tailwind CSS",
        "Nuxt Content",
        "Puppeteer",
      ],
      outcome:
        "The preview and server-generated PDF read the same typed résumé for each language. Nuxt Content serves the engineering notes.",
      limitations:
        "PDF export requires the server runtime. A static copy serves the content pages only.",
      status: "Live portfolio",
      links: [
        {
          label: "Source code",
          to: "https://github.com/aliarghyani/nuxt-portfolio",
          icon: "i-mdi-github",
        },
        {
          label: "Live website",
          to: "https://aliarghyani.vercel.app/",
          icon: "i-mdi-web",
        },
      ],
      category: "public",
      opensource: true,
    },
    {
      name: "15ecosystem",
      featured: true,
      description:
        "A bilingual learning companion that turns a short assessment into a seven-day practice plan.",
      context:
        "A reader choosing among 15 skills needs a concrete place to start and a way to review the week.",
      role: "I developed the assessment-to-plan journey and the catalog that connects skills, books, and videos.",
      features: [
        "Browser-local progress",
        "Content validation",
        "Vitest and Playwright coverage",
      ],
      stack: [
        "Nuxt 4",
        "TypeScript",
        "PostgreSQL",
        "Drizzle",
        "Vitest",
        "Playwright",
      ],
      outcome:
        "Readers can check off daily practice and review their progress. Catalog APIs expose structured content backed by PostgreSQL and Drizzle.",
      limitations:
        "The public repository documents implementation and tests. User adoption has not been independently verified.",
      status: "Public project",
      links: [
        {
          label: "Source code",
          to: "https://github.com/aliarghyani/15ecosystem",
          icon: "i-mdi-github",
        },
      ],
      category: "public",
    },
    {
      name: "mybudget",
      featured: true,
      description:
        "A bilingual monthly budget starter for recording income, expenses, and payments in tomans.",
      context:
        "A monthly ledger needs quick entry and a consistent unit when amounts are entered in tomans, millions of tomans, or US dollars.",
      role: "I built the editable ledger, Pinia stores, and keyboard interactions for entering and saving rows.",
      features: ["Persian digits and RTL", "Keyboard entry", "Local autosave"],
      stack: ["Vue 3", "TypeScript", "Pinia", "VueUse", "Vite"],
      outcome:
        "The interface totals planned and paid amounts, autosaves to the browser, and switches between a desktop table and mobile cards.",
      limitations:
        "Records stay in the current browser. The user sets the exchange rate manually.",
      status: "App starter",
      links: [
        {
          label: "Source code",
          to: "https://github.com/aliarghyani/mybudget",
          icon: "i-mdi-github",
        },
      ],
      category: "public",
    },
    {
      name: "Offline Audio Transcription",
      featured: true,
      description:
        "A local Persian transcription pipeline with explicit recovery and human review boundaries.",
      context:
        "Long recordings need recoverable processing, traceable outputs, and a clear distinction between machine inference and confirmed speaker identity.",
      role: "Developing the pipeline and its recovery contracts: input integrity checks, resumable stages, bounded retries, alignment, diarization, and an explicit human identity gate.",
      features: [
        "Input integrity and provenance",
        "Resumable processing",
        "Bounded recovery",
        "Human review gate",
      ],
      stack: ["Python", "Whisper", "FFmpeg"],
      outcome:
        "The public repository documents a staged pipeline and synthetic acceptance tests for recovery behavior.",
      limitations:
        "Work in progress. Synthetic tests do not establish real-world transcription accuracy, throughput, or production readiness.",
      status: "Engineering work in progress",
      category: "public",
      links: [
        {
          label: "Repository & evidence",
          to: "https://github.com/aliarghyani/offline-audio-transcription",
          icon: "i-mdi-github",
        },
      ],
    },
    {
      name: "vue-cursor-rules",
      description:
        "Contract-driven Cursor rules for Vue 3 + TypeScript with a focus on DX, a11y, security and production-ready outputs.",
      context:
        "Open-source rule system for teams using Cursor with Vue and TypeScript projects.",
      role: "Created the ruleset, documentation, and production-oriented guardrails.",
      features: [
        "Vue 3 conventions",
        "TypeScript guidance",
        "Accessibility checks",
        "Security-aware prompts",
      ],
      stack: ["Vue", "TypeScript", "Cursor", "Markdown"],
      outcome:
        "Helps keep AI-assisted Vue work closer to production standards instead of generic code generation.",
      links: [
        {
          label: "GitHub",
          to: "https://github.com/aliarghyani/vue-cursor-rules",
          icon: "i-mdi-github",
        },
      ],
      icons: ["i-logos-vue", "i-logos-typescript-icon"],
      status: "Active",
      opensource: true,
      category: "public",
    },
    {
      name: "Ideh — Innovating Ideas Platform",
      description:
        "Dynamic, scalable platform for idea evaluation and market insights.",
      context:
        "Business platform for collecting, presenting, and evaluating ideas with a polished web experience.",
      role: "Delivered Nuxt/Vue frontend work focused on responsive UI, reusable sections, and launch-ready pages.",
      features: [
        "Nuxt frontend",
        "Responsive layouts",
        "Reusable sections",
        "SEO-friendly pages",
      ],
      stack: ["Nuxt", "Vue", "TypeScript"],
      outcome:
        "Created a clearer product surface for a live idea and market insight platform.",
      thumbnail: "/img/projects/ideh.png",
      status: "Active",
      opensource: false,
      links: [
        { label: "Website", to: "https://ideh.app/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue"],
      category: "freelance",
    },
    {
      name: "Insho Advertising Marketplace",
      description:
        "Media marketplace that helps agencies and creators collaborate on high-impact advertising campaigns.",
      context:
        "Marketplace product connecting media owners, agencies, and campaign buyers.",
      role: "Built frontend screens and UI structure for a marketplace-style product experience.",
      features: [
        "Marketplace UI",
        "Campaign browsing",
        "Responsive pages",
        "Reusable Nuxt components",
      ],
      stack: ["Nuxt", "Vue", "Tailwind CSS"],
      outcome:
        "Helped turn a multi-sided advertising workflow into a clearer web product.",
      thumbnail: "/img/projects/insho.png",
      status: "Active",
      opensource: false,
      links: [
        { label: "Website", to: "https://insho.app/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue", "i-logos-tailwindcss-icon"],
      category: "freelance",
    },
    {
      name: "BaMashin Mobility Rentals",
      description:
        "Rental platform for booking cars, boats, helicopters, vans, bikes, and more across Iran.",
      context:
        "Rental platform with multiple vehicle categories and discovery flows.",
      role: "Implemented frontend views for browsing, category presentation, and responsive booking-oriented pages.",
      features: [
        "Category browsing",
        "Responsive product pages",
        "Nuxt frontend",
        "Performance-minded UI",
      ],
      stack: ["Nuxt", "Vue"],
      outcome:
        "Presented a broad rental catalog in a cleaner, easier-to-scan interface.",
      thumbnail: "/img/projects/bamashin.png",
      status: "Active",
      opensource: false,
      links: [
        { label: "Website", to: "https://bamashin.net/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue"],
      category: "freelance",
    },
    {
      name: "Elara Panel",
      featured: true,
      description:
        "Medical tourism frontend platform with patient-facing flows, admin workflows, scheduling, and API-driven product features.",
      context:
        "Patient operations need coordinated forms, scheduling, and role-aware access to business data. I contribute to this NexaPortal healthcare product as a frontend developer.",
      role: "Implemented Vue 3/TypeScript interfaces with Vuetify and Pinia, connecting forms, scheduling, and real-time updates to APIs while handling validation and user permissions in the UI.",
      features: [
        "Patient app",
        "Admin dashboard",
        "Scheduling flows",
        "Form-heavy workflows",
        "Google API integrations",
        "PWA features",
        "WebSocket updates",
      ],
      stack: [
        "Vue 3",
        "TypeScript",
        "Vuetify",
        "Vite",
        "Pinia",
        "REST APIs",
        "WebSocket",
      ],
      outcome:
        "Delivered patient and admin screens that bring forms, scheduling, and real-time communication into daily medical tourism workflows.",
      thumbnail: "/img/elara-logo.png",
      status: "Active",
      opensource: false,
      links: [
        {
          label: "Website",
          to: "https://app.elaramedical.com/",
          icon: "i-mdi-link",
        },
        {
          label: "Instagram",
          to: "https://www.instagram.com/elaramedical/",
          icon: "i-mdi-instagram",
        },
      ],
      icons: [
        "i-logos-vue",
        "i-logos-vuetifyjs",
        "i-logos-typescript-icon",
        "i-logos-vitejs",
      ],
      category: "current",
    },
    {
      name: "Artemis Clinics",
      featured: true,
      description:
        "Healthcare website and application interfaces for patients exploring services in Turkey.",
      context:
        "Artemis Clinics is a healthcare product I contribute to through NexaPortal, helping patients explore services and begin medical travel workflows.",
      role: "Through NexaPortal, I contribute to product and technical discussions with the CEO, structure requirements from voice and text discussions, and support implementation planning, frontend delivery, UI/UX, and verification. I use scoped AI-assisted tasks with acceptance criteria and corrective review.",
      features: [
        "Healthcare service pages",
        "Responsive UI",
        "Nuxt frontend",
        "Patient-focused content structure",
      ],
      stack: ["Nuxt", "Vue", "Tailwind CSS"],
      outcome:
        "Implemented healthcare service interfaces; website development is ongoing and available as a development preview.",
      thumbnail: "/img/artemis-new-logo.png",
      status: "Website in development",
      opensource: false,
      links: [
        {
          label: "Website development preview",
          to: "https://dev.artemisclinics.com/",
          icon: "i-mdi-link",
        },
        {
          label: "Website",
          to: "https://app.artemisclinics.com/",
          icon: "i-mdi-link",
        },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue", "i-logos-tailwindcss-icon"],
      category: "current",
    },
    {
      name: "ADHD Interactive Explorer",
      description:
        "An architecture experiment for an accessible, bilingual knowledge graph.",
      context:
        "Interactive visualization should preserve the meaning of the knowledge model and remain usable when the visual renderer fails.",
      role: "Testing a separation between canonical knowledge, layout artifacts, route-owned selection, and a replaceable Vue/SVG renderer, with a server-rendered semantic browser.",
      features: [
        "Knowledge / renderer separation",
        "English and Persian RTL",
        "Keyboard navigation",
        "Renderer failure fallback",
      ],
      stack: ["Nuxt", "Vue", "TypeScript", "SVG"],
      outcome:
        "The published spike evaluation records keyboard, RTL, deep-link, hydration, and intentional renderer-failure checks.",
      limitations:
        "Architecture spike only; the broader product is incomplete. This is not a clinically validated tool.",
      status: "Architecture spike · Product in progress",
      category: "public",
      links: [
        {
          label: "Repository",
          to: "https://github.com/aliarghyani/ADHD-Interactive-Explorer",
          icon: "i-mdi-github",
        },
        {
          label: "Spike evaluation",
          to: "https://github.com/aliarghyani/ADHD-Interactive-Explorer/blob/main/VALIDATION_SPIKE_EVALUATION.md",
          icon: "i-mdi-file-document-outline",
        },
      ],
    },
  ],
};

export default portfolio;
