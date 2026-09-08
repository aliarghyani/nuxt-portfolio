import { portfolio as englishPortfolio } from "./portfolio";
import type { PortfolioData } from "@/types/portfolio.types";

const stackCopy = [
  ["فرانت‌اند اصلی", "Vue و Nuxt با TypeScript."],
  ["رابط و استایل", "کامپوننت‌ها و صفحات واکنش‌گرا."],
  ["داده و API", "مدیریت وضعیت، احراز هویت و ارتباط با سرور."],
  ["قابلیت‌های محصول", "فرم، جدول و دسترسی‌های کاربران."],
  ["تست و تحویل", "بازبینی، تست و انتشار کد."],
  ["در حال گسترش", "تجربه در حال توسعه با React و Next.js."],
];
const stackLabels: Record<string, string> = {
  "Responsive Design": "طراحی واکنش‌گرا",
  "Component Architecture": "معماری کامپوننت",
  "Authentication flows": "احراز هویت",
  Forms: "فرم‌ها",
  Tables: "جدول‌ها",
  "AI-assisted development": "توسعه با کمک هوش مصنوعی",
};

const portfolioFa: PortfolioData = {
  profile: {
    name: "علی ارغیانی",
    title: "توسعه‌دهنده فرانت‌اند Vue/Nuxt",
    headline: "توسعه‌دهنده Vue/Nuxt برای CRM و داشبوردهای SaaS",
    availability: "آماده همکاری در پروژه‌های منتخب فریلنسری و قراردادی.",
    focusAreas: [
      "داشبوردهای CRM",
      "پنل‌های مدیریتی SaaS",
      "اپلیکیشن‌های Vue/Nuxt",
      "ابزارهای متصل به API",
    ],
    // location: 'Tehran Province - Iran , Remote - Turkey',
    location: "ساکن تهران، ایران · همکاری ریموت با تیمی در ترکیه",
    summary:
      "با Vue، Nuxt و TypeScript داشبوردهای CRM، پنل‌های مدیریتی و نرم‌افزارهای کسب‌وکار متصل به API می‌سازم. کار فعلی من در NexaPortal به فرایندهای عملیاتی گردشگری سلامت کمک می‌کند.",
    avatar: "/img/AliProfile.webp",
    socials: {
      website: "https://aliarghyani.vercel.app",
      github: "https://github.com/aliarghyani",
      linkedin: "https://www.linkedin.com/in/aliarghyani/",
      telegram: "https://t.me/Ali_Argh",
      whatsapp: "https://wa.me/989123220694",
      spotify: "https://open.spotify.com/user/aliarghyani",
      bento: "https://bento.me/arghyani",
      instagram: "https://www.instagram.com/ali.arghyani/",
    },
  },

  mainTools: {
    title: "ابزارهای اصلی",
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
    title: "نقش‌ها",
    items: [
      { label: "توسعه‌دهندهٔ فرانت‌اند", icon: "i-twemoji-laptop" },
      { label: "SSR با Nuxt", icon: "i-twemoji-rocket" },
      { label: "مهندسی رابط کاربری", icon: "i-twemoji-toolbox" },
      { label: "DX و عملکرد", icon: "i-twemoji-high-voltage" },
    ],
  },

  values: {
    title: "ارزش‌ها",
    items: [
      {
        label: "خودمختاری و مالکیت",
        icon: "i-twemoji-key",
        description: "پیش‌قدم و مسئولیت‌پذیر؛ تحویل کار از ابتدا تا انتها.",
      },
      {
        label: "استانداردهای بالا",
        icon: "i-twemoji-sparkles",
        description: "کیفیت به‌جای میانبر؛ کار را بهتر از قبل رها کن.",
      },
      {
        label: "تحویل متمرکز بر مشتری",
        icon: "i-twemoji-handshake",
        description: "هدف را بفهم، مرحله‌ای بساز، نتیجه را همسو نگه‌دار.",
      },
      {
        label: "کار تیمی و منتورینگ",
        icon: "i-twemoji-people-holding-hands",
        description: "دانش را به‌اشتراک بگذار، تیم را رشد بده، قابل اتکا باش.",
      },
      {
        label: "ارتباط شفاف",
        icon: "i-twemoji-speech-balloon",
        description: "چرایی/چی/چطور را بگو؛ کوتاه و ترجیحاً غیرهم‌زمان.",
      },
    ],
  },

  services: [
    {
      title: "توسعه فرانت‌اند CRM و پنل‌های مدیریتی",
      description:
        "رابط‌های ساختاریافته برای مدیریت سرنخ‌ها، کاربران، فرایندهای فروش، گزارش‌ها و گردش‌کارهای عملیاتی.",
      icon: "i-mdi-view-dashboard-outline",
    },
    {
      title: "توسعه اپلیکیشن‌های Vue / Nuxt",
      description:
        "اپلیکیشن‌های آماده تولید Vue و Nuxt با معماری تمیز کامپوننت‌ها، SSR در صورت نیاز و TypeScript نگهداشت‌پذیر.",
      icon: "i-logos-nuxt-icon",
    },
    {
      title: "توسعه رابط کاربری داشبوردهای SaaS",
      description:
        "صفحه‌های داده‌محور برای مرور سریع، فیلتر، مقایسه، پیگیری وضعیت و استفاده روزمره.",
      icon: "i-mdi-chart-box-outline",
    },
    {
      title: "یکپارچه‌سازی API و رابط‌های فرم‌محور",
      description:
        "جریان‌های فرانت‌اند متصل به APIهای واقعی، احراز هویت، اعتبارسنجی، فرم‌های چندمرحله‌ای، جدول‌ها و وضعیت‌های ناهمگام.",
      icon: "i-mdi-api",
    },
    {
      title: "بازآرایی فرانت‌اند و بهبود عملکرد",
      description:
        "بهسازی هدفمند کدهای رابط کاربری شکننده، نماهای کند، کامپوننت‌های تکراری و منطق فرانت‌اند دشوار برای نگهداشت.",
      icon: "i-mdi-speedometer",
    },
    {
      title: "React / Next.js — در حال گسترش تجربه",
      description:
        "در حال گسترش تجربه با پروژه‌های داشبوردی React و Next.js در سطح محصول برای انعطاف بیشتر در همکاری با تیم‌ها.",
      icon: "i-logos-react",
    },
  ],

  cta: {
    title: "برای پروژه فرانت‌اند خود به همکار نیاز دارید؟",
    description:
      "برای همکاری فریلنسری، پاره‌وقت یا قراردادی در CRM، داشبوردهای SaaS و اپلیکیشن‌های Vue/Nuxt، درباره پروژه، فناوری‌ها و زمان‌بندی موردنظرتان بنویسید.",
  },

  stackGroups: englishPortfolio.stackGroups?.map((group, index) => ({
    title: stackCopy[index]![0]!,
    description: stackCopy[index]![1]!,
    items: group.items.map((item) => ({
      ...item,
      label: stackLabels[item.label] || item.label,
    })),
  })),
  reactExpansion: {
    title: "در حال گسترش تجربه با React و Next.js",
    description:
      "برای همکاری با تیم‌های بیشتر، داشبوردهای تمرینی نزدیک به نیازهای محصول با React و Next.js می‌سازم. Vue، Nuxt و TypeScript همچنان فناوری‌های اصلی من در پروژه‌های واقعی هستند.",
    items: englishPortfolio.reactExpansion?.items ?? [],
  },
  experiences: [
    {
      company: "NexaPortal",
      link: "https://nexaportal.com/",
      logo: "/img/NexaPortal1.png",
      location: "ازمیر، ترکیه · ریموت",
      type: "تمام‌وقت",
      positions: [
        {
          title: "توسعه‌دهندهٔ فرانت‌اند",
          start: "دسامبر ۲۰۲۴",
          ongoing: true,
          description: [
            "مشارکت در پلتفرمی برای دگرگونی مدیریت کسب‌وکار گردشگری سلامت؛ ساخت فرانت‌اندهای امن و مقیاس‌پذیر.",
            "پیاده‌سازی معماری Vue 3 + TypeScript با Vuetify، Vite، Pinia، RBAC و i18n؛ تمرکز بر DX، عملکرد و دسترس‌پذیری.",
            "ساخت اپ کاربر و داشبورد ادمین: https://app.elaramedical.com/ · https://dashboard.elaramedical.com/",
            "قابلیت‌های PWA، فلوهای فرمی سنگین، تقویم و زمان‌بندی، یکپارچه‌سازی با Google API و بلادرنگ با WebSocket.",
            "دروازه‌های کیفیت: ESLint سخت‌گیرانه، تست‌های E2E با Cypress، بیلدهای سازگار با CI و کدریویو.",
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
          linkLabel: "پلتفرم Elara",
        },
      ],
    },
    {
      company: "Freelancer",
      type: "خویش‌فرما",
      location: "تهران، ایران · هیبرید",
      positions: [
        {
          title: "توسعه‌دهندهٔ فرانت‌اند | Vue.js، Nuxt.js، TailwindCSS",
          start: "سپتامبر ۲۰۲۳",
          end: "دسامبر ۲۰۲۴",
          description: [
            "تحویل اپ‌های SSR پرفورمنس با Nuxt 3 و Vue 3؛ بهبود سرعت و SEO.",
            "طراحی سیستم‌های کامپوننتی ماژولار و نگهداشت‌پذیر؛ اطمینان از واکنش‌گرایی و دسترس‌پذیری در همه دستگاه‌ها.",
            "همکاری بین‌وظیفه‌ای با Git؛ ارسال مرحله‌ای با تمرکز بر اهداف مشتری.",
            "بهره‌گیری از Vuetify و VueUse برای تسریع توسعه؛ قابلیت انطباق سریع با React در صورت نیاز.",
            "نمونه‌های اخیر: https://ideh.app/ · https://insho.app/ · https://laservice.ir/ · https://bamashin.net/ · https://hiloop.app/ · https://atdeloop.com/",
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
      location: "تهران، ایران",
      positions: [
        {
          title: "کارشناس ارشد عملکرد و رهبر تیم",
          start: "آوریل ۲۰۲۲",
          end: "آگوست ۲۰۲۳",
          description: [
            "نگهداشت عملکرد و در‌دسترس‌بودن ~۱۴٬۵۰۰ سایت MTN Irancell در سراسر کشور.",
            "رهبری تحلیل KPI (2G/3G/4G)، چک‌های TCHA، ریشه‌یابی و پیگیری سرتاسری رخدادها تا حل.",
            "تهیه گزارش‌های هفتگی/ماهانه/فصلانه برای ذی‌نفعان؛ پایش OLA/SLA و تصعید ریسک‌ها.",
            "هماهنگی پیمانکاران و زیرپیمانکاران؛ برنامه‌ریزی و رهگیری ابتکارهای پرریسک و اقدامات بازیابی.",
            "تعریف محدوده، زمان‌بندی، سیاست‌ها و رویه‌ها؛ بهبود فرآیند، ممیزی و کیفیت عملیات.",
            "بهینه‌سازی OPEX با حذف هزینه‌های غیرضروری؛ پیش‌بینی و بودجه‌بندی با صورت‌های مالی به‌موقع.",
            "مالک ارتباط با مشتری؛ تحقق اهداف مالی و قراردادی به‌موقع.",
            "تسلط بر ابزارهای OSS/MW اکوسیستم Ericsson/Huawei/Nokia؛ منتورینگ اعضای تیم.",
          ],
        },
        {
          title: "کارشناس ارشد عملکرد",
          start: "جولای ۲۰۱۸",
          end: "آوریل ۲۰۲۲",
          description: [
            "راندن تحلیل KPI شبکه در 2G/3G/LTE؛ شناسایی روندها و فرصت‌های بهبود.",
            "مشارکت در ممیزی‌ها، بهبود فرآیند و داشبوردهای عملکرد؛ پشتیبانی از فرایندهای حل رخداد.",
          ],
        },
        {
          title: "دستیار مدیر منطقه",
          start: "مارس ۲۰۱۸",
          end: "جولای ۲۰۱۸",
          description: [
            "نگهداشت ~۳۰۰۰ سایت BTS در استان تهران (2G/3G/4G)؛ تحقق اهداف تحویل/پذیرش و صرفه‌جویی هزینه.",
            "مدیریت زیرپیمانکاران و رابط برنامه‌ریزی؛ ترجمه طرح‌های فنی به برنامه‌های اجرایی.",
            "رفع موانع حین پذیرش؛ تصعید ریسک‌های خارج از محدوده برای دستیابی به نتیجه برد-برد با مشتری.",
          ],
        },
        {
          title: "رهبر تیم TCHA",
          start: "ژوئن ۲۰۱۷",
          end: "مارس ۲۰۱۸",
          description: [
            "ساخت داشبوردهای جامع در‌دسترس‌بودن؛ مالک اصلی هم‌راستاسازی ذی‌نفعان زیر الزامات قراردادی سخت.",
            "تحلیل KPI و کانال‌های ترافیک/کنترلی؛ اقدامات راه‌دور و پیگیری تصعیدها تا حل نهایی.",
            "کسب عنوان فارغ‌التحصیل برتر در گردهمایی سالانه Huawei.",
          ],
        },
        {
          title: "کارمند بک‌آفیس",
          start: "ژوئن ۲۰۱۶",
          end: "ژوئن ۲۰۱۷",
          description: [
            "پشتیبانی عملیات OSS، چک‌های عملکرد و گزارش‌دهی؛ کمک به کارایی تیم و رضایت مشتری.",
          ],
        },
      ],
    },
    {
      company: "Solar Energy World",
      positions: [
        {
          title: "مدیر سیستم Solaris",
          start: "جولای ۲۰۱۵",
          end: "ژوئن ۲۰۱۶",
          description: ["مانیتورینگ سیستم‌های خورشیدی و ادمین Solaris."],
        },
      ],
    },
    {
      company: "Adfa l آدفا",
      location: "ساکن تهران، ایران · همکاری ریموت با تیمی در ترکیه",
      positions: [
        {
          title: "ادمین",
          start: "ژوئن ۲۰۱۵",
          end: "ژوئن ۲۰۱۶",
          description: [
            "پشتیبانی سخت‌افزار/نرم‌افزار و امور اداری شهرداری منطقه ۳ تهران.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: "دانشگاه صنعتی قم",
      degree: "کارشناسی مهندسی مخابرات",
      start: "۲۰۱۰",
      end: "۲۰۱۵",
      icons: ["i-material-symbols-school"],
      logo: "/img/qut_logo-light.jpg",
    },
  ],

  projects: [
    {
      name: "vue-cursor-rules",
      description: "قواعد مستند برای توسعه Vue و TypeScript با کمک هوش مصنوعی.",
      context:
        "مجموعه قواعد متن‌باز برای کار با Cursor در پروژه‌های Vue و TypeScript.",
      role: "تدوین قواعد و مستندات برای خروجی قابل‌بررسی و قابل‌نگهداشت.",
      features: [
        "قراردادهای Vue 3",
        "راهنمای TypeScript",
        "دسترس‌پذیری",
        "بررسی امنیت",
      ],
      stack: ["Vue", "TypeScript", "Cursor", "Markdown"],
      outcome:
        "قواعد قابل‌استفاده مجدد برای بازبینی خروجی توسعه با کمک هوش مصنوعی.",
      links: [
        {
          label: "GitHub",
          to: "https://github.com/aliarghyani/vue-cursor-rules",
          icon: "i-mdi-github",
        },
      ],
      icons: ["i-logos-vue", "i-logos-typescript-icon"],
      status: "فعال",
      opensource: true,
      category: "public",
    },
    {
      name: "ایده — پلتفرم نوآوری",
      description: "پلتفرمی برای ارائه و ارزیابی ایده‌ها و بینش‌های بازار.",
      context: "محصول کسب‌وکاری برای جمع‌آوری و ارزیابی ایده‌ها.",
      role: "توسعه رابط Nuxt/Vue، بخش‌های قابل‌استفاده مجدد و صفحات واکنش‌گرا.",
      features: ["رابط Nuxt", "صفحات واکنش‌گرا", "کامپوننت‌های مشترک"],
      stack: ["Nuxt", "Vue", "TypeScript"],
      outcome: "ارائه رابط قابل‌نگهداشت برای معرفی و ارزیابی ایده‌ها.",
      thumbnail: "/img/projects/ideh.png",
      status: "فعال",
      opensource: false,
      links: [
        { label: "وب‌سایت", to: "https://ideh.app/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue"],
      category: "freelance",
    },
    {
      name: "Insho — بازار تبلیغات",
      description: "بازار تبلیغاتی برای ارتباط آژانس‌ها و تولیدکنندگان محتوا.",
      context: "محصولی برای اتصال صاحبان رسانه، آژانس‌ها و خریداران تبلیغات.",
      role: "پیاده‌سازی صفحات بازار و فرم‌های متصل به داده‌های بک‌اند.",
      features: [
        "رابط بازار",
        "فرم‌های مبتنی بر ساختار داده",
        "صفحات واکنش‌گرا",
      ],
      stack: ["Nuxt", "Vue", "Tailwind CSS"],
      outcome: "تبدیل گردش‌کار چندطرفه تبلیغات به رابط قابل‌استفاده در وب.",
      thumbnail: "/img/projects/insho.png",
      status: "فعال",
      opensource: false,
      links: [
        { label: "وب‌سایت", to: "https://insho.app/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue", "i-logos-tailwindcss-icon"],
      category: "freelance",
    },
    {
      name: "باماشین — سامانه اجاره ناوگان",
      description: "سامانه جست‌وجوی وسایل نقلیه اجاره‌ای در دسته‌های مختلف.",
      context: "کاتالوگ اجاره با دسته‌بندی و مسیرهای کشف محصول.",
      role: "توسعه صفحات مرور دسته‌ها و رابط واکنش‌گرا برای مسیر رزرو.",
      features: ["مرور دسته‌بندی‌ها", "صفحات محصول", "رابط مناسب موبایل"],
      stack: ["Nuxt", "Vue"],
      outcome: "نمایش کاتالوگ متنوع اجاره در رابطی خوانا و قابل مرور.",
      thumbnail: "/img/projects/bamashin.png",
      status: "فعال",
      opensource: false,
      links: [
        { label: "وب‌سایت", to: "https://bamashin.net/", icon: "i-mdi-link" },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue"],
      category: "freelance",
    },
    {
      name: "Elara Panel",
      description: "پنل گردشگری سلامت با گردش‌کار بیمار، مدیریت و زمان‌بندی.",
      context:
        "Elara Medical محصولی است که در NexaPortal روی آن کار می‌کنم و فرایندهای بیمار و عملیات داخلی را پشتیبانی می‌کند.",
      role: "توسعه فرانت‌اند با Vue 3، TypeScript، Vuetify، مدیریت وضعیت، فرم‌ها، PWA و اتصال به API.",
      features: [
        "اپ بیمار",
        "داشبورد مدیریت",
        "زمان‌بندی",
        "فرم‌های عملیاتی",
        "Google API",
        "PWA",
        "WebSocket",
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
        "پشتیبانی از فرایندهای عملیاتی گردشگری سلامت با رابط‌های قابل‌نگهداشت.",
      thumbnail: "/img/elara-logo.png",
      status: "فعال",
      opensource: false,
      links: [
        {
          label: "وب‌سایت",
          to: "https://app.elaramedical.com/",
          icon: "i-mdi-link",
        },
        {
          label: "اینستاگرام",
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
      description: "اپلیکیشن خدمات سلامت برای بررسی خدمات و آغاز سفر درمانی.",
      context:
        "Artemis Clinics محصول حوزه سلامت است که از طریق NexaPortal در توسعه آن مشارکت دارم.",
      role: "پیاده‌سازی بخش‌های Nuxt/Vue و صفحات واکنش‌گرا با تمرکز بر مسیر استفاده بیمار.",
      features: [
        "صفحات خدمات سلامت",
        "رابط واکنش‌گرا",
        "ساختار محتوای بیمارمحور",
      ],
      stack: ["Nuxt", "Vue", "Tailwind CSS"],
      outcome:
        "فراهم‌کردن صفحات قابل‌استفاده برای معرفی خدمات سلامت به بیماران بین‌المللی.",
      thumbnail: "/img/artemis-new-logo.png",
      status: "فعال",
      opensource: false,
      links: [
        {
          label: "وب‌سایت",
          to: "https://app.artemisclinics.com/",
          icon: "i-mdi-link",
        },
      ],
      icons: ["i-logos-nuxt-icon", "i-logos-vue", "i-logos-tailwindcss-icon"],
      category: "current",
    },
    {
      name: "nuxt-portfolio",
      description: "پورتفولیوی دوزبانه Nuxt 4 با گردش‌کار رزومه به‌صورت کد.",
      context:
        "به‌روزرسانی جداگانه پورتفولیو و رزومه باعث تکرار کار و ناهماهنگی محتوا می‌شد.",
      role: "طراحی و پیاده‌سازی اپ Nuxt، بلاگ، ترجمه‌ها، پیش‌نمایش رزومه و تولید PDF.",
      features: [
        "محتوای تایپ‌شده",
        "بلاگ Nuxt Content",
        "پشتیبانی فارسی",
        "پیش‌نمایش رزومه",
        "تولید PDF",
      ],
      stack: ["Nuxt 4", "Vue", "TypeScript", "Nuxt UI", "Tailwind CSS"],
      outcome:
        "نگهداشت داده رزومه، تاریخچه تغییرات، پیش‌نمایش وب و خروجی PDF در یک مخزن.",
      status: "فعال",
      opensource: true,
      links: [
        {
          label: "GitHub",
          to: "https://github.com/aliarghyani/nuxt-portfolio",
          icon: "i-mdi-github",
        },
      ],
      icons: [
        "i-logos-nuxt-icon",
        "i-logos-vue",
        "i-logos-typescript-icon",
        "i-logos-tailwindcss-icon",
      ],
      category: "public",
    },
  ],
};

export default portfolioFa;
