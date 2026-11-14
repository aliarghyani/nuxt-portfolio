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
    label: "Software Engineer | AI-Assisted Solutions & Workflow Automation",
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
      "Software engineer combining production frontend delivery with seven years in telecom operations. I translate operational problems and stakeholder discussions into requirements and maintainable software. At NexaPortal, I contribute to healthcare products using Vue/Nuxt and TypeScript, with Codex-assisted implementation, human review, and testing. My background includes KPI analysis, team leadership, and Python/Pandas/Excel reporting automation; I’m extending this foundation into workflow automation and broader solution development.",
  },

  work: [
    {
      company: "NexaPortal",
      position: "Frontend Developer (Remote)",
      location: "Izmir, Turkey",
      startDate: "2024-12",
      highlights: [
        "Developed patient and admin interfaces for **Elara Medical** and **Artemis Clinics**; current Artemis work includes CEO discussions, structured requirements, planning, frontend delivery, and verification",
        "Built a drag-and-drop **PDF template editor** with dynamic variables and multi-page support so staff could create patient documents without developer intervention",
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
        "Advised the CEO and technical team on business problems, technical options, and requirements during a temporary, part-time engagement",
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
      position: "Senior Performance Team Analyst and Team Lead",
      location: "Tehran, Iran",
      startDate: "2022-04",
      endDate: "2023-08",
      highlights: [
        "Led network KPI analysis, trend monitoring, and incident coordination across nationwide infrastructure",
        "Automated reporting workflows using **Python**, **Pandas**, and **Excel** to support network performance analysis",
        "Established operational standards and mentored team members through process reviews and knowledge sharing",
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
        "Codex",
        "Repository Context & Instructions",
        "Scoped Agent Workflows",
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
        "Python/Pandas/Excel",
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
