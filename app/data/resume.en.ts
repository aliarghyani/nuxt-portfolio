/**
 * Resume Data - Ali Arghyani
 * Based on RESUME-STANDARDS.md (docs/RESUME-STANDARDS.md)
 * Optimized for ATS and 2025 best practices
 * Version: 2.0 - 2-Page Resume (International Remote Positions)
 *
 * ⚠️ BEFORE EDITING: Give docs/RESUME-UPDATE-RULES.md to any AI agent
 *
 * Quick command for AI:
 * "Read docs/RESUME-UPDATE-RULES.md and update my resume"
 */

import { contact } from "~/data/contact";
import type { Resume } from "~/types/resume";

export const resumeData: Resume = {
  basics: {
    name: "Ali Arghyani",
    label: "Frontend Developer | Vue.js • Nuxt.js • TypeScript",
    image: "/img/AliProfile.webp",
    email: contact.email,
    phone: contact.phone,
    url: "https://aliarghyani.vercel.app",
    location: {
      city: "Tehran",
      country: "Iran",
    },
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/aliarghyani",
        icon: "i-mdi-linkedin",
      },
      {
        network: "GitHub",
        url: "https://github.com/aliarghyani",
        icon: "i-mdi-github",
      },
      {
        network: "Portfolio",
        url: "https://aliarghyani.vercel.app",
        icon: "i-mdi-web",
      },
    ],
    summary:
      "Vue/Nuxt frontend developer building CRM and SaaS interfaces with TypeScript. At NexaPortal, I develop healthcare product workflows. Seven years at Huawei connected KPI analysis, team coordination, and process improvement with Python/Pandas reporting automation. I bring that operational understanding to software requirements and maintainable interfaces, using Codex and repository context alongside human code review and testing. I’m expanding into workflow digitization and integration planning.",
  },

  work: [
    {
      company: "NexaPortal",
      position: "Frontend Developer (Remote)",
      location: "Izmir, Turkey",
      startDate: "2024-12",
      highlights: [
        "Developed patient and admin interfaces for **Elara Medical** and **Artemis Clinics** at **NexaPortal**; current work includes the Artemis website",
        "Built custom **PDF template editor** with drag-and-drop interface, dynamic variable injection, and multi-page support, enabling non-technical staff to create patient documents without developer intervention",
        "Implemented **role-based access control** with field-level permissions for business workflows",
        "Developed a **schema-based form builder** with validation and drag-and-drop arrangement to support reusable form workflows",
        "Implemented real-time messaging via **Pusher WebSockets** supporting WhatsApp and in-app channels",
        "Applied code splitting, lazy loading, and Pinia state management; used AI tools alongside code review and testing",
      ],
    },
    {
      company: "DigiHinet",
      position: "Advisor to the CEO & Technical Team (Part-time, Temporary)",
      startDate: "2026-04",
      endDate: "2026-10",
      highlights: [
        "Advised the CEO and technical team during a temporary, part-time engagement",
        "Participated in soft-skills interviews and helped newcomers clarify career directions, learning priorities, and professional growth",
      ],
    },
    {
      company: "Freelance",
      position: "Frontend Developer (Remote)",
      location: "Tehran, Iran",
      startDate: "2023-09",
      endDate: "2024-12",
      highlights: [
        "Delivered responsive Vue/Nuxt interfaces and reusable components for **Ideh**, **Insho**, and **BaMashin**",
        "Built idea-evaluation pages, schema-based marketplace forms connected to backend data, and rental catalog and booking interfaces",
        "Translated client requirements into technical specifications and delivered iteratively with documentation and progress updates",
      ],
    },
    {
      company: "Huawei Technologies",
      position: "Senior Performance Team Lead",
      location: "Tehran, Iran",
      startDate: "2022-04",
      endDate: "2023-08",
      highlights: [
        "Led network performance analysis and incident coordination across nationwide infrastructure",
        "Automated reporting workflows using **Python** and **Pandas** to support network performance analysis",
        "Established operational standards and mentored team members through process reviews and knowledge sharing",
        "Analyzed network KPIs, identified performance trends, and coordinated follow-up on incidents",
        "Owned stakeholder communication interface; delivered weekly performance reports and monthly strategic updates to **C-level executives**, translating technical metrics into business impact",
        "Applied documentation, monitoring, incident management, and quality gates to operational delivery",
      ],
    },
    {
      company: "Huawei Technologies",
      position: "Technical & Leadership Roles",
      location: "Tehran, Iran",
      startDate: "2016-06",
      endDate: "2022-04",
      highlights: [
        "**Senior Performance Analyst** (2018-2022): Drove network KPI analysis across 2G/3G/LTE; contributed to audits, process improvements and performance dashboards",
        "**Assistant Regional Manager** (2018): Managed **~3,000** BTS sites across Tehran Province; coordinated subcontractors and translated technical specs into implementation plans",
        "**TCHA Team Lead** (2017-2018): Built availability dashboards and drove stakeholder alignment; recognized as **outstanding fresh graduate** at Huawei annual meeting",
        "**Back Office Operations** (2016-2017): Supported OSS operations, performance checks and reporting; contributed to team efficiency and customer satisfaction",
      ],
    },
  ],

  education: [
    {
      institution: "Qom University of Technology",
      area: "Telecommunications Engineering",
      studyType: "Bachelor’s degree",
      startDate: "2010-09",
      endDate: "2015-06",
      courses: [
        "Software Architecture",
        "Systems Design",
        "Network Management",
        "Digital Signal Processing",
      ],
    },
  ],

  skills: [
    {
      name: "Frontend Core",
      keywords: [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Pinia",
        "Vuetify",
        "Tailwind CSS",
      ],
    },
    {
      name: "AI-Assisted Development",
      keywords: [
        "Cursor AI",
        "GitHub Copilot",
        "Codex",
        "Claude/ChatGPT",
        "Repository Context & Instructions",
        "Human Review & Verification",
      ],
    },
    {
      name: "Architecture & Performance",
      keywords: [
        "SSR (Server-Side Rendering)",
        "SSG (Static Site Generation)",
        "PWA (Progressive Web Apps)",
        "RBAC Systems",
        "Code Splitting & Lazy Loading",
        "Performance Optimization",
      ],
    },
    {
      name: "Development Tools & Workflow",
      keywords: [
        "Git/GitHub",
        "GitHub Actions (CI/CD)",
        "ESLint/Prettier",
        "Vite",
        "VueUse",
        "REST APIs",
        "WebSocket",
        "Agile/Scrum",
      ],
    },
    {
      name: "Operations & Requirements",
      keywords: [
        "KPI Analysis",
        "Process Improvement",
        "Python/Pandas",
        "Requirements Analysis",
      ],
    },
    {
      name: "Quality & Accessibility",
      keywords: [
        "Accessibility Practices",
        "Lighthouse Optimization",
        "Cypress E2E Testing",
        "Code Review",
        "i18n Internationalization",
        "Responsive Design",
      ],
    },
  ],

  languages: [
    {
      language: "Persian",
      fluency: "Native",
    },
    {
      language: "English",
      fluency: "Professional working proficiency",
    },
  ],

  // Certification omitted until the original test result and scale are verified.
  certificates: [],

  projects: [
    {
      name: "Ideh",
      description:
        "Idea evaluation & market insights platform with scalable architecture and reusable component library",
      highlights: [
        "Reusable frontend components",
        "Scalable Vue.js architecture",
        "Dynamic form generation system",
      ],
      keywords: ["Vue.js", "Nuxt.js", "Component Library"],
      startDate: "2023-09",
      endDate: "2024-12",
      url: "https://ideh.app",
      roles: ["Frontend Developer"],
      type: "application",
    },
    {
      name: "Insho",
      description:
        "Media & advertising marketplace connecting agencies and creators for campaign collaboration",
      highlights: [
        "Advanced dynamic form handling with schema-based architecture enabling complex multi-functional forms with validation, conditional logic, and real-time updates",
        "Connected schema-based forms to backend data flows",
        "Responsive UI optimized for creator-brand matching with comprehensive listing and proposal management system",
      ],
      keywords: [
        "Vue.js",
        "Nuxt.js",
        "Dynamic Forms",
        "Schema-based Architecture",
        "Marketplace",
      ],
      startDate: "2023-09",
      endDate: "2024-12",
      url: "https://insho.app",
      roles: ["Frontend Developer"],
      type: "application",
    },
    {
      name: "BaMashin",
      description:
        "Mobility rental platform (cars, boats, helicopters) with comprehensive booking system and accessible UI",
      highlights: [
        "Multi-category rental system",
        "Responsive interface with attention to accessibility",
        "Booking-oriented interfaces",
      ],
      keywords: ["Vue.js", "TypeScript", "Responsive Design", "Accessibility"],
      startDate: "2023-09",
      endDate: "2024-12",
      url: "https://bamashin.net",
      roles: ["Frontend Developer"],
      type: "application",
    },
  ],
};
