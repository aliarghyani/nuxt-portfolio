import type { PortfolioData } from '@/types/portfolio.types'

export const portfolio: PortfolioData = {
  profile: {
    name: 'Ali Arghyani',
    title: 'Frontend Developer',
    location: 'Tehran Province - Iran , Remote - Turkey',
    summary:
      'Passionate Frontend Developer with Vue.js, Nuxt.js, and TypeScript. Migrated from telecom team lead/analyst to modern web development with focus on DX, accessibility, performance and client-centric delivery.',
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
      description: 'More than a medical tourism platform — a personalized experience where each patient accesses tailored information and flawless service. With Elara Medical, unlock an unforgettable medical tourism journey.',
      thumbnail: '/img/elara-logo.png',
      status: 'Active',
      opensource: false,
      links: [
        { label: 'Website', to: 'https://app.elaramedical.com/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-vue', 'i-logos-vuetifyjs', 'i-logos-typescript-icon', 'i-logos-vitejs'],
      category: 'current',
    },
    {
      name: 'Artemis Clinics',
      description: 'Your trusted provider for medical services in Turkey, connecting you to top-quality health services at significantly lower costs than North America and Europe — even including travel expenses.',
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
      name: 'NuxtUi-Portfolio-Ali',
      description: 'My portfolio built with Nuxt 3 and Nuxt UI v4, showcasing projects, skills, and experiences.',
      status: 'Active',
      opensource: true,
      links: [
        { label: 'GitHub', to: 'https://github.com/aliarghyani/NuxtUi-Portfolio-Ali', icon: 'i-mdi-github' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
      category: 'public',
    },
  ],
}

export default portfolio
