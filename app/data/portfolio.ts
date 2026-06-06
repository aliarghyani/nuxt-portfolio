import type { PortfolioData } from '@/types/portfolio.types'

export const portfolio: PortfolioData = {
  profile: {
    name: 'Ali Arghyani',
    title: 'Vue/Nuxt Frontend Developer',
    headline: 'Frontend Developer for CRM, SaaS Dashboards, and Business Platforms',
    location: 'Tehran Province - Iran , Remote - Turkey',
    summary:
      'I build production-ready frontend systems for CRM platforms, admin panels, medical tourism software, and API-heavy business applications using Vue, Nuxt, TypeScript, and modern frontend workflows.',
    availability: 'Available for selected freelance, part-time, and contract frontend projects.',
    focusAreas: ['CRM dashboards', 'SaaS admin panels', 'Vue/Nuxt apps', 'API-heavy business tools'],
    avatar: '/img/AliProfile.webp',
    socials: {
      website: 'https://www.linkedin.com/in/aliarghyani/',
      github: 'https://github.com/aliarghyani',
      linkedin: 'https://www.linkedin.com/in/aliarghyani/',
      telegram: 'https://t.me/Ali_Argh',
      whatsapp: 'https://wa.me/989123220694',
      spotify: 'https://open.spotify.com/user/aliarghyani',
      bento: 'https://bento.me/arghyani',
      instagram: 'https://www.instagram.com/ali.arghyani/',
    },
  },

  mainTools: {
    title: 'Main tools',
    items: [
      { label: 'Vue.js', icon: 'i-logos-vue' },
      { label: 'Nuxt.js', icon: 'i-logos-nuxt-icon' },
      { label: 'TypeScript', icon: 'i-logos-typescript-icon' },
      { label: 'Vuetify', icon: 'i-logos-vuetifyjs' },
      { label: 'Tailwind CSS', icon: 'i-logos-tailwindcss-icon' },
      { label: 'Pinia', icon: 'i-logos-pinia' },
      { label: 'Vite', icon: 'i-logos-vitejs' },
      { label: 'Git/GitHub', icon: 'i-mdi-github' },
    ],
  },

  roles: {
    title: 'Roles',
    items: [
      { label: 'Frontend Developer', icon: 'i-twemoji-laptop' },
      { label: 'SSR with Nuxt', icon: 'i-twemoji-rocket' },
      { label: 'UI Engineering', icon: 'i-twemoji-toolbox' },
      { label: 'DX & Performance', icon: 'i-twemoji-high-voltage' },
    ],
  },

  values: {
    title: 'Values',
    items: [
      { label: 'Autonomy & Ownership', icon: 'i-twemoji-key', description: 'Take initiative and be accountable. Deliver end-to-end.' },
      { label: 'High standards', icon: 'i-twemoji-sparkles', description: 'Aim for quality over shortcuts. Leave things better.' },
      { label: 'Client-focused delivery', icon: 'i-twemoji-handshake', description: 'Understand goals, ship iteratively, and align outcomes.' },
      { label: 'Teamwork & Mentoring', icon: 'i-twemoji-people-holding-hands', description: 'Share knowledge, elevate teammates, be reliable.' },
      { label: 'Clear communication', icon: 'i-twemoji-speech-balloon', description: 'Explain the why/what/how. Prefer concise async updates.' },
    ],
  },

  services: [
    {
      title: 'CRM & Admin Panel Frontend Development',
      description: 'Structured interfaces for managing leads, users, sales pipelines, reports, and operational workflows.',
      icon: 'i-mdi-view-dashboard-outline',
    },
    {
      title: 'Vue / Nuxt Application Development',
      description: 'Production-ready Vue and Nuxt apps with clean component architecture, SSR where needed, and maintainable TypeScript.',
      icon: 'i-logos-nuxt-icon',
    },
    {
      title: 'SaaS Dashboard UI Development',
      description: 'Data-heavy screens built for scanning, filtering, comparison, status tracking, and repeated daily use.',
      icon: 'i-mdi-chart-box-outline',
    },
    {
      title: 'API Integration & Form-heavy Interfaces',
      description: 'Frontend flows connected to real APIs, authentication, validation, multi-step forms, tables, and async states.',
      icon: 'i-mdi-api',
    },
    {
      title: 'Frontend Refactoring & Performance Improvements',
      description: 'Targeted cleanup for fragile UI code, slow views, repeated components, and hard-to-maintain frontend logic.',
      icon: 'i-mdi-speedometer',
    },
    {
      title: 'React / Next.js Dashboard Development',
      description: 'Currently expanding with production-style React and Next.js dashboard projects for broader team flexibility.',
      icon: 'i-logos-react',
    },
  ],

  stackGroups: [
    {
      title: 'Core Frontend',
      description: 'Primary frontend stack for production Vue and Nuxt applications.',
      items: [
        { label: 'Vue.js', icon: 'i-logos-vue', to: 'https://vuejs.org', type: 'Framework' },
        { label: 'Nuxt', icon: 'i-logos-nuxt-icon', to: 'https://nuxt.com', type: 'Framework' },
        { label: 'TypeScript', icon: 'i-logos-typescript-icon', to: 'https://www.typescriptlang.org', type: 'Language' },
        { label: 'JavaScript', icon: 'i-logos-javascript', to: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'Language' },
        { label: 'HTML', icon: 'i-logos-html-5', to: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'Language' },
        { label: 'CSS', icon: 'i-logos-css-3', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', type: 'Language' },
      ],
    },
    {
      title: 'UI & Styling',
      description: 'Component systems and responsive interfaces for business software.',
      items: [
        { label: 'Vuetify', icon: 'i-logos-vuetifyjs', to: 'https://vuetifyjs.com', type: 'Library' },
        { label: 'Tailwind CSS', icon: 'i-logos-tailwindcss-icon', to: 'https://tailwindcss.com', type: 'Framework' },
        { label: 'Nuxt UI', icon: 'i-logos-nuxt-icon', to: 'https://ui.nuxt.com', type: 'Library' },
        { label: 'Responsive Design', icon: 'i-mdi-responsive', type: 'Tool' },
        { label: 'Component Architecture', icon: 'i-mdi-cube-outline', type: 'Tool' },
      ],
    },
    {
      title: 'State, Data & APIs',
      description: 'Data flow, integrations, and real-world product states.',
      items: [
        { label: 'Pinia', icon: 'i-logos-pinia', to: 'https://pinia.vuejs.org', type: 'Library' },
        { label: 'REST APIs', icon: 'i-mdi-api', type: 'Data' },
        { label: 'Axios / Fetch', icon: 'simple-icons:axios', to: 'https://axios-http.com', type: 'Library' },
        { label: 'WebSocket', icon: 'i-twemoji-electric-plug', to: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', type: 'Library' },
        { label: 'Authentication flows', icon: 'i-mdi-shield-key-outline', type: 'Tool' },
      ],
    },
    {
      title: 'Dashboards & Product Features',
      description: 'Common building blocks for CRM, SaaS, and admin products.',
      items: [
        { label: 'ECharts', icon: 'simple-icons:apacheecharts', to: 'https://echarts.apache.org', type: 'Library' },
        { label: 'Forms', icon: 'i-mdi-form-select', type: 'Tool' },
        { label: 'Tables', icon: 'i-mdi-table', type: 'Tool' },
        { label: 'RBAC', icon: 'i-mdi-account-lock-outline', type: 'Tool' },
        { label: 'i18n', icon: 'i-twemoji-globe-with-meridians', to: 'https://vue-i18n.intlify.dev', type: 'Library' },
        { label: 'PWA', icon: 'i-mdi-cellphone-link', type: 'Tool' },
      ],
    },
    {
      title: 'Testing & Workflow',
      description: 'Quality and delivery practices used around production frontend work.',
      items: [
        { label: 'Cypress', icon: 'logos:cypress-icon', to: 'https://www.cypress.io', type: 'Testing' },
        { label: 'Git', icon: 'i-logos-git-icon', to: 'https://git-scm.com', type: 'DevOps' },
        { label: 'GitHub Actions', icon: 'simple-icons:githubactions', to: 'https://docs.github.com/actions', type: 'DevOps' },
        { label: 'CI/CD', icon: 'i-mdi-source-branch-sync', type: 'DevOps' },
        { label: 'AI-assisted development', icon: 'i-mdi-robot-outline', type: 'Tool' },
      ],
    },
    {
      title: 'Currently Expanding',
      description: 'React ecosystem skills being built through production-style dashboard work.',
      items: [
        { label: 'React', icon: 'i-logos-react', type: 'Framework' },
        { label: 'Next.js', icon: 'i-logos-nextjs-icon', type: 'Framework' },
        { label: 'TanStack Query', icon: 'i-mdi-database-sync-outline', type: 'Library' },
        { label: 'React Hook Form', icon: 'i-mdi-form-textbox', type: 'Library' },
        { label: 'Zod', icon: 'i-mdi-shield-check-outline', type: 'Library' },
        { label: 'Shadcn/UI', icon: 'i-mdi-view-grid-plus-outline', type: 'Library' },
      ],
    },
  ],

  reactExpansion: {
    title: 'Currently expanding into React and Next.js',
    description:
      'To increase cross-team flexibility, I am building production-style dashboard projects with React, Next.js, TypeScript, TanStack Query, React Hook Form, Zod, and Shadcn/UI. Vue, Nuxt, and TypeScript remain my strongest production stack.',
    items: [
      { label: 'React', icon: 'i-logos-react' },
      { label: 'Next.js', icon: 'i-logos-nextjs-icon' },
      { label: 'TanStack Query', icon: 'i-mdi-database-sync-outline' },
      { label: 'React Hook Form', icon: 'i-mdi-form-textbox' },
      { label: 'Zod', icon: 'i-mdi-shield-check-outline' },
      { label: 'Shadcn/UI', icon: 'i-mdi-view-grid-plus-outline' },
    ],
  },

  cta: {
    title: 'Available for selected part-time and freelance frontend projects',
    description:
      'I am especially interested in CRM dashboards, SaaS admin panels, Vue/Nuxt applications, React/Next.js dashboards, and business tools that need clean frontend architecture.',
  },

  experiences: [
    {
      company: 'NexaPortal',
      link: 'https://nexaportal.com/',
      logo: '/img/NexaPortal1.png',
      location: 'İzmir, Türkiye · Remote',
      type: 'Full-time',
      positions: [
        {
          title: 'Frontend Developer',
          start: 'Dec 2024',
          ongoing: true,
          description: [
            'Contributing to a platform transforming medical tourism business management; building secure, scalable frontends.',
            'Implementing Vue 3 + TypeScript architecture with Vuetify, Vite, Pinia, RBAC and i18n; focus on DX, performance and a11y.',
            'Built end-user app and admin dashboard: https://app.elaramedical.com/ · https://dashboard.elaramedical.com/',
            'PWA features, form-heavy flows, calendar and scheduling UX, Google API integrations, and real‑time via WebSocket.',
            'Quality gates: ESLint strict, E2E tests with Cypress, CI‑friendly builds and code reviews.'
          ],
          icons: ['i-logos-vue', 'i-logos-vuetifyjs', 'i-logos-typescript-icon', 'i-logos-vitejs', 'i-logos-pinia', 'i-logos-eslint', 'i-logos-cypress'],
          link: 'https://app.elaramedical.com/',
          linkLabel: 'Elara Platform',
        },
      ],
    },
    {
      company: 'Freelancer',
      type: 'Self-employed',
      location: 'Tehran, Iran · Hybrid',
      positions: [
        {
          title: 'Frontend Developer | Vue.js, Nuxt.js, TailwindCSS',
          start: 'Sep 2023',
          end: 'Dec 2024',
          description: [
            'Delivered high‑performance SSR apps with Nuxt 3 and Vue 3, improving speed and SEO.',
            'Designed modular, maintainable component systems; ensured responsive, accessible UIs across devices.',
            'Collaborated with cross‑functional teams using Git; shipped iteratively with clear client‑focused outcomes.',
            'Leveraged Vuetify and VueUse to accelerate delivery; comfortable adapting to React when needed.',
            'Recent: https://ideh.app/ · https://insho.app/ · https://laservice.ir/ · https://bamashin.net/ · https://hiloop.app/ · https://atdeloop.com/'
          ],
          icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon', 'i-logos-vuetifyjs', 'i-logos-typescript-icon'],
        },
      ],
    },
    {
      company: 'Huawei',
      logo: '/img/huawei.svg',
      location: 'Tehran, Iran',
      positions: [
        {
          title: 'Senior Performance Team Analyst and Team Lead',
          start: 'Apr 2022',
          end: 'Aug 2023',
          description: [
            'Maintained performance and availability for ~14,500 MTN Irancell sites nationwide.',
            'Led KPI analysis (2G/3G/4G), TCHA checks, root‑cause analysis and end‑to‑end incident follow‑ups to resolution.',
            'Produced weekly/monthly/quarterly stakeholder reports; ensured contractual OLA/SLA compliance and risk escalation.',
            'Coordinated contractors and subcontractors; planned and tracked high‑risk initiatives and recovery actions.',
            'Defined scope, schedules, policies and procedures; improved processes, audits and operational quality.',
            'Optimized OPEX by eliminating needless costs; forecasting and budgeting with timely financial statements.',
            'Owned customer communication interface; ensured financial and contractual targets were met on time.',
            'Hands‑on with OSS/MW tools across Ericsson/Huawei/Nokia ecosystems; mentored team members.'
          ],
        },
        {
          title: 'Senior Performance Analyst',
          start: 'Jul 2018',
          end: 'Jul 2023',
          description: [
            'Drove network KPI analysis across 2G/3G/LTE; identified trends and improvement opportunities.',
            'Contributed to audits, process improvements and performance dashboards; supported incident resolution workflows.'
          ],
        },
        {
          title: 'Assistant Regional Manager',
          start: 'Mar 2018',
          end: 'Jul 2018',
          description: [
            'Maintained ~3000 BTS sites across Tehran Province (2G/3G/4G); ensured delivery/acceptance and cost‑saving targets.',
            'Managed subcontractors and planning interface; translated technical specs into executable implementation plans.',
            'Removed blockers during acceptance; escalated out‑of‑scope risks to achieve win‑win outcomes with the customer.'
          ],
        },
        {
          title: 'TCHA Team Lead',
          start: 'Jun 2017',
          end: 'Mar 2018',
          description: [
            'Built comprehensive availability dashboards; main owner driving stakeholder alignment under strict contracts.',
            'Analyzed KPIs and traffic/control channels; performed remote actions and tracked escalations end‑to‑end to resolution.',
            'Recognized as outstanding fresh graduate in Huawei annual meeting.'
          ],
        },
        {
          title: 'Back Office Employee',
          start: 'Jun 2016',
          end: 'Jun 2017',
          description: [
            'Supported OSS operations, performance checks and reporting; contributed to team efficiency and customer satisfaction.'
          ],
        },
      ],
    },
    {
      company: 'Solar Energy World',
      positions: [
        {
          title: 'Solaris System Administrator',
          start: 'Jul 2015',
          end: 'Jun 2016',
          description: ['Solar systems monitoring and Solaris administration.'],
        },
      ],
    },
    {
      company: 'Adfa l آدفا',
      location: 'Tehran Province, Iran',
      positions: [
        {
          title: 'Administrator',
          start: 'Jun 2015',
          end: 'Jun 2016',
          description: [
            'Hardware/software support and administrative tasks for Municipality of District 3, Tehran.',
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: 'Qom University of Technology',
      degree: 'B.A., Telecommunications Engineering',
      start: '2010',
      end: '2015',
      icons: ['i-material-symbols-school'],
      logo: '/img/qut_logo-light.jpg',
    },
  ],

  projects: [
    {
      name: 'vue-cursor-rules',
      description: 'Contract-driven Cursor rules for Vue 3 + TypeScript with a focus on DX, a11y, security and production-ready outputs.',
      context: 'Open-source rule system for teams using Cursor with Vue and TypeScript projects.',
      role: 'Created the ruleset, documentation, and production-oriented guardrails.',
      features: ['Vue 3 conventions', 'TypeScript guidance', 'Accessibility checks', 'Security-aware prompts'],
      stack: ['Vue', 'TypeScript', 'Cursor', 'Markdown'],
      outcome: 'Helps keep AI-assisted Vue work closer to production standards instead of generic code generation.',
      links: [
        { label: 'GitHub', to: 'https://github.com/aliarghyani/vue-cursor-rules', icon: 'i-mdi-github' },
      ],
      icons: ['i-logos-vue', 'i-logos-typescript-icon'],
      status: 'Active',
      opensource: true,
      category: 'public',
    },
    {
      name: 'Ideh — Innovating Ideas Platform',
      description: 'Dynamic, scalable platform for idea evaluation and market insights.',
      context: 'Business platform for collecting, presenting, and evaluating ideas with a polished web experience.',
      role: 'Delivered Nuxt/Vue frontend work focused on responsive UI, reusable sections, and launch-ready pages.',
      features: ['Nuxt frontend', 'Responsive layouts', 'Reusable sections', 'SEO-friendly pages'],
      stack: ['Nuxt', 'Vue', 'TypeScript'],
      outcome: 'Created a clearer product surface for a live idea and market insight platform.',
      thumbnail: '/img/projects/ideh.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://ideh.app/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
      category: 'freelance',
    },
    {
      name: 'Insho Advertising Marketplace',
      description: 'Media marketplace that helps agencies and creators collaborate on high-impact advertising campaigns.',
      context: 'Marketplace product connecting media owners, agencies, and campaign buyers.',
      role: 'Built frontend screens and UI structure for a marketplace-style product experience.',
      features: ['Marketplace UI', 'Campaign browsing', 'Responsive pages', 'Reusable Nuxt components'],
      stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
      outcome: 'Helped turn a multi-sided advertising workflow into a clearer web product.',
      thumbnail: '/img/projects/insho.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://insho.app/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
      category: 'freelance',
    },
    {
      name: 'BaMashin Mobility Rentals',
      description: 'Rental platform for booking cars, boats, helicopters, vans, bikes, and more across Iran.',
      context: 'Rental platform with multiple vehicle categories and discovery flows.',
      role: 'Implemented frontend views for browsing, category presentation, and responsive booking-oriented pages.',
      features: ['Category browsing', 'Responsive product pages', 'Nuxt frontend', 'Performance-minded UI'],
      stack: ['Nuxt', 'Vue'],
      outcome: 'Presented a broad rental catalog in a cleaner, easier-to-scan interface.',
      thumbnail: '/img/projects/bamashin.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://bamashin.net/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
      category: 'freelance',
    },
    {
      name: 'Elara Panel',
      description: 'Medical tourism frontend platform with patient-facing flows, admin workflows, scheduling, and API-driven product features.',
      context: 'Production medical tourism platform that supports patient operations and internal business workflows.',
      role: 'Frontend developer working on Vue 3, TypeScript, Vuetify, state management, forms, PWA behavior, and API integrations.',
      features: ['Patient app', 'Admin dashboard', 'Scheduling flows', 'Form-heavy workflows', 'Google API integrations', 'PWA features', 'WebSocket updates'],
      stack: ['Vue 3', 'TypeScript', 'Vuetify', 'Vite', 'Pinia', 'REST APIs', 'WebSocket'],
      outcome: 'Supports real operational usage across medical tourism workflows with maintainable frontend delivery.',
      thumbnail: '/img/elara-logo.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://app.elaramedical.com/', icon: 'i-mdi-link' },
        { label: 'Instagram', to: 'https://www.instagram.com/elaramedical/', icon: 'i-mdi-instagram' },
      ],
      icons: ['i-logos-vue', 'i-logos-vuetifyjs', 'i-logos-typescript-icon', 'i-logos-vitejs'],
      category: 'current',
    },
    {
      name: 'Artemis Clinics',
      description: 'Medical services web application connecting patients to healthcare options in Turkey.',
      context: 'Healthcare product surface for patients comparing services and starting medical travel workflows.',
      role: 'Built Nuxt/Vue frontend pieces with responsive UI and product-focused page structure.',
      features: ['Healthcare service pages', 'Responsive UI', 'Nuxt frontend', 'Patient-focused content structure'],
      stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
      outcome: 'Improved the frontend surface for a healthcare service product aimed at international patients.',
      thumbnail: '/img/artemis-new-logo.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://app.artemisclinics.com/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
      category: 'current',
    },
    {
      name: 'nuxt-portfolio',
      description: 'My portfolio built with Nuxt 3 and Nuxt UI v4, showcasing projects, skills, and experiences.',
      context: 'Personal portfolio and resume platform built as a Nuxt application.',
      role: 'Designed and implemented the Nuxt app, portfolio sections, blog structure, i18n, resume page, and PDF export workflow.',
      features: ['Nuxt portfolio', 'Blog with Nuxt Content', 'i18n', 'Resume preview', 'PDF generation', 'Theme controls'],
      stack: ['Nuxt', 'Vue', 'TypeScript', 'Nuxt UI', 'Tailwind CSS'],
      outcome: 'Provides a maintainable portfolio system that can evolve with projects, writing, and resume content.',
      status: 'Active',
      opensource: true,
      links: [
        { label: 'GitHub', to: 'https://github.com/aliarghyani/nuxt-portfolio', icon: 'i-mdi-github' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
      category: 'public',
    },
  ],
}

export default portfolio
