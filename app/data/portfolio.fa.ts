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
    title: "مهندس فرانت‌اند",
    headline: "راهکارهای عملی برای گردش‌کارهای پیچیده",
    availability: "آماده همکاری در پروژه‌های منتخب فریلنسری و قراردادی.",
    focusAreas: [
      "توسعه با Vue و Nuxt",
      "خودکارسازی گردش‌کارها",
      "عملکرد عملیاتی",
    ],
    // location: 'Tehran Province - Iran , Remote - Turkey',
    location: "ساکن تهران، ایران · همکاری از راه دور با تیمی در ترکیه",
    summary:
      "از سال ۲۰۲۳ در توسعهٔ فرانت‌اند کار می‌کنم. برای تیم‌های کسب‌وکار رابط کاربری ساخته‌ام و این روزها تمرکزم روی ابزارهای بیماران و کارکنان کلینیک است. در نکساپورتال، از گفت‌وگو با تیم تا طراحی فرم‌ها، تعیین دسترسی‌ها و پیاده‌سازی ابزارهای نوبت‌دهی مشارکت دارم. هفت سال کار در عملیات مخابرات به من یاد داد چطور علت اختلال را پیدا کنم و تهیهٔ گزارش‌های تکراری را خودکار کنم. در توسعهٔ فرانت‌اند هم از همین تجربه و از ابزارهای هوش مصنوعی همراه با بازبینی و آزمون کد کمک می‌گیرم.",
    seoDescription:
      "علی ارغیانی، مهندس فرانت‌اند با تمرکز بر Vue، Nuxt و TypeScript. نمونه‌کارهای نرم‌افزارهای سلامت، توسعه با کمک هوش مصنوعی و خودکارسازی گزارش‌ها.",
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
      step: "شناخت مسئله",
      question: "چه مسئله‌ای را حل می‌کنیم؟",
      title: "کشف مسئله و تحلیل فرایند",
      emphasis: "عملیات مخابرات · آرتمیس · دیجی‌هاینت",
      description:
        "پیش از انتخاب نرم‌افزار، گردش‌کار، افراد و محدودیت‌ها را می‌شناسم. تجربه تحلیل عملیاتی و گفت‌وگو با ذی‌نفعان را برای ساختاردهی نیازمندی‌ها، شناسایی گلوگاه‌ها و روشن‌کردن پرسش‌های باز به کار می‌گیرم.",
      outputs: ["نیازمندی‌های روشن", "محدوده مشخص"],
      icon: "i-mdi-vector-polyline",
      to: "#work",
      linkLabel: "مشاهده تجربه‌های مرتبط",
    },
    {
      step: "ساخت راهکار",
      question: "قدم عملی بعدی چیست؟",
      title: "توسعه راهکار با کمک هوش مصنوعی",
      emphasis: "فرانت‌اند در محصول · تجربه‌های مهندسی عمومی",
      description:
        "نیازمندی‌ها را به وظایف اجرایی با محدوده مشخص تبدیل می‌کنم. با Vue و Nuxt نرم‌افزار قابل‌نگهداشت می‌سازم و از Codex با شناخت مخزن، دستورهای روشن و بازبینی کمک می‌گیرم. خودکارسازی و طراحی سیستم را در پروژه‌های هدفمند توسعه می‌دهم.",
      outputs: ["نرم‌افزار قابل‌استفاده", "مرزهای روشن سیستم"],
      icon: "i-mdi-code-braces",
      to: "#projects",
      linkLabel: "مشاهده نمونه‌کارهای منتخب",
    },
    {
      step: "بررسی نتیجه",
      question: "چه شواهدی از نتیجه پشتیبانی می‌کند؟",
      title: "عملکرد عملیاتی و کیفیت تحویل",
      emphasis: "تحلیل شاخص‌ها · بازبینی کد · بررسی در مرورگر",
      description:
        "رفتار نرم‌افزار را با معیارهای پذیرش می‌سنجم، خطاها را بررسی می‌کنم و محدودیت‌ها را روشن نگه می‌دارم. تجربه عملیاتی‌ام در استفاده از شاخص‌ها، تست، بررسی مرورگر و ثبت تصمیم‌ها برای بازبینی تحویل و تعیین گام بعدی نقش دارد.",
      outputs: ["شواهد بررسی", "محدودیت‌های مستند"],
      icon: "i-mdi-check-decagram-outline",
      to: "#ai-stack",
      linkLabel: "مطالعه یادداشت‌های مهندسی",
    },
  ],

  cta: {
    title: "مسئله‌ای در گردش‌کار یا محصول دارید؟",
    description:
      "درباره مسئله، گردش‌کار فعلی و محدودیت‌ها بنویسید. برای پروژه‌های منتخب توسعه نرم‌افزار، فرانت‌اند و خودکارسازی گردش‌کار، به‌صورت فریلنسری، پاره‌وقت یا قراردادی آماده همکاری هستم.",
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
            "توسعه رابط‌های بیماران و گردش‌کارهای عملیاتی Elara Medical و Artemis Clinics از طریق NexaPortal.",
            "مشارکت در گفت‌وگوهای محصولی و فنی آرتمیس با مدیرعامل، تبدیل گفت‌وگوهای صوتی و متنی به نیازمندی ساخت‌یافته و زمینه پیاده‌سازی، و همراهی در برنامه‌ریزی، توسعه فرانت‌اند و بررسی نتیجه.",
            "پیاده‌سازی معماری Vue 3 + TypeScript با Vuetify، Vite، Pinia، RBAC و i18n؛ تمرکز بر DX، عملکرد و دسترس‌پذیری.",
            "ساخت اپ کاربر و داشبورد ادمین: https://app.elaramedical.com/ · https://dashboard.elaramedical.com/",
            "قابلیت‌های PWA، فرم‌های چندمرحله‌ای، تقویم و زمان‌بندی، یکپارچه‌سازی با Google API و بلادرنگ با WebSocket.",
            "بازبینی کد، بررسی ایستا با ESLint و آزمون سرتاسری با Cypress در فرایند تحویل نرم‌افزار.",
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
      company: "دیجی‌هاینت",
      link: "https://digihinet.com/",
      type: "پاره‌وقت · موقت",
      positions: [
        {
          title: "مشاور مدیرعامل و تیم فنی",
          start: "اردیبهشت ۱۴۰۵",
          end: "مهر ۱۴۰۵",
          description: [
            "مشاوره به مدیرعامل و تیم فنی درباره مسئله‌های کسب‌وکار، گزینه‌های فنی و نیازمندی‌ها در همکاری موقت و پاره‌وقت.",
            "مشارکت در مصاحبه برای شناخت مهارت‌های نرم افراد و کمک به تازه‌واردها برای روشن‌کردن مسیر شغلی، اولویت‌های یادگیری و رشد حرفه‌ای.",
          ],
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
            "توسعهٔ صفحه‌های وب با رندر سمت سرور برای پروژه‌های مشتریان با Nuxt 3 و Vue 3.",
            "طراحی سیستم‌های کامپوننتی ماژولار و نگهداشت‌پذیر؛ اطمینان از واکنش‌گرایی و دسترس‌پذیری در همه دستگاه‌ها.",
            "همکاری با اعضای تیم از طریق Git و تحویل مرحله‌ای قابلیت‌ها براساس نیاز مشتری.",
            "تبدیل نیازهای مشتری به وظایف فرانت‌اند و کامپوننت‌های مشترک با Vue، Nuxt، Vuetify و VueUse.",
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
          title: "تحلیلگر ارشد عملکرد و سرپرست تیم",
          start: "آوریل ۲۰۲۲",
          end: "آگوست ۲۰۲۳",
          description: [
            "پایش عملکرد و دسترس‌پذیری سایت‌های شبکهٔ ایرانسل در سراسر کشور.",
            "رهبری تحلیل KPI (2G/3G/4G)، چک‌های TCHA، ریشه‌یابی و پیگیری سرتاسری رخدادها تا حل.",
            "تهیهٔ گزارش‌های هفتگی، ماهانه و فصلی، پیگیری تعهدات سطح خدمت و گزارش ریسک‌ها به مدیران مسئول.",
            "خودکارسازی گزارش‌های عملکرد با Python، Pandas و Excel؛ پیوند تحلیل عملیاتی با گردش‌کارهای نرم‌افزاری تکرارپذیر.",
            "هماهنگی پیمانکاران و زیرپیمانکاران؛ برنامه‌ریزی و رهگیری ابتکارهای پرریسک و اقدامات بازیابی.",
            "تعریف محدوده، زمان‌بندی، سیاست‌ها و رویه‌ها؛ بهبود فرآیند، ممیزی و کیفیت عملیات.",
            "بهینه‌سازی OPEX با حذف هزینه‌های غیرضروری؛ پیش‌بینی و بودجه‌بندی با صورت‌های مالی به‌موقع.",
            "گزارش پیشرفت کار به مشتری و پیگیری تعهدات مالی و قراردادی.",
            "تسلط بر ابزارهای OSS/MW اکوسیستم Ericsson/Huawei/Nokia؛ منتورینگ اعضای تیم.",
          ],
        },
        {
          title: "کارشناس ارشد عملکرد",
          start: "جولای ۲۰۱۸",
          end: "آوریل ۲۰۲۲",
          description: [
            "تحلیل شاخص‌های عملکرد شبکه‌های 2G، 3G و LTE برای شناسایی روندها و موارد نیازمند بهبود.",
            "مشارکت در ممیزی‌ها، بهبود فرآیند و داشبوردهای عملکرد؛ پشتیبانی از فرایندهای حل رخداد.",
          ],
        },
        {
          title: "دستیار مدیر منطقه",
          start: "مارس ۲۰۱۸",
          end: "جولای ۲۰۱۸",
          description: [
            "هماهنگی نگهداری و تحویل سایت‌های BTS در استان تهران برای شبکه‌های نسل دوم تا چهارم.",
            "مدیریت زیرپیمانکاران و رابط برنامه‌ریزی؛ ترجمه طرح‌های فنی به برنامه‌های اجرایی.",
            "رفع موانع تحویل سایت‌ها و ارجاع ریسک‌های خارج از اختیار تیم به مسئول مربوط.",
          ],
        },
        {
          title: "رهبر تیم TCHA",
          start: "ژوئن ۲۰۱۷",
          end: "مارس ۲۰۱۸",
          description: [
            "ساخت داشبوردهای پایش دسترس‌پذیری شبکه و هماهنگی تیم‌های درگیر برای پیگیری تعهدات قراردادی.",
            "تحلیل شاخص‌های عملکرد و کانال‌های ترافیک و کنترل، انجام اقدامات از راه دور و پیگیری رخدادها تا رفع اختلال.",
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
      name: "nuxt-portfolio",
      featured: true,
      description:
        "استخدام‌کننده می‌تواند در همین سایت نمونه‌کارها را بخواند، زبان را عوض کند و رزومهٔ همان زبان را بگیرد.",
      context:
        "وقتی سایت و دو نسخهٔ رزومه جداگانه به‌روز می‌شدند، تغییر یک سابقه به چند بار ویرایش نیاز داشت.",
      role: "نگهداری نسخه‌های فارسی و انگلیسی سایت را بر عهده دارم. پیش‌نمایش رزومه، خروجی PDF و آزمون‌های مرورگر را در برنامهٔ موجود توسعه داده‌ام.",
      features: [
        "نمایش راست‌به‌چپ و چپ‌به‌راست",
        "پوستهٔ روشن و تیره",
        "آزمون پیمایش و دریافت رزومه",
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
        "پیش‌نمایش و PDF هر زبان از یک منبع دادهٔ TypeScript ساخته می‌شوند. یادداشت‌های فنی نیز با Nuxt Content منتشر می‌شوند.",
      limitations:
        "ساخت PDF به اجرای سرور نیاز دارد. نسخهٔ ایستا برای نمایش صفحه‌های محتوایی مناسب است.",
      status: "سایت منتشرشده",
      links: [
        {
          label: "کد منبع",
          to: "https://github.com/aliarghyani/nuxt-portfolio",
          icon: "i-mdi-github",
        },
        {
          label: "مشاهدهٔ سایت فارسی",
          to: "https://aliarghyani.vercel.app/fa",
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
        "ابزار یادگیری دوزبانه‌ای که بر پایهٔ یک ارزیابی کوتاه، برنامه‌ای هفت‌روزه برای تمرین پیشنهاد می‌دهد.",
      context:
        "کسی که میان ۱۵ مهارت انتخاب می‌کند به یک نقطهٔ شروع مشخص و راهی برای مرور پیشرفت هفتگی نیاز دارد.",
      role: "مسیر ارزیابی تا دریافت برنامه و فهرست مرتبط مهارت‌ها، کتاب‌ها و ویدئوها را توسعه داده‌ام.",
      features: [
        "ثبت پیشرفت در مرورگر",
        "اعتبارسنجی محتوا",
        "آزمون با Vitest و Playwright",
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
        "کاربر تمرین هر روز را ثبت و در پایان هفته پیشرفتش را مرور می‌کند. داده‌های فهرست از طریق API و با PostgreSQL و Drizzle در دسترس‌اند.",
      limitations:
        "مخزن عمومی، پیاده‌سازی و آزمون‌ها را مستند می‌کند. میزان استفادهٔ کاربران به‌طور مستقل تأیید نشده است.",
      status: "پروژهٔ عمومی",
      links: [
        {
          label: "کد منبع",
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
        "نمونهٔ اولیهٔ برنامه‌ای دوزبانه برای ثبت درآمد، هزینه و پرداخت‌های ماهانه به تومان.",
      context:
        "برای ثبت سریع دخل‌وخرج، مبلغ‌هایی که به تومان، میلیون تومان یا دلار وارد می‌شوند باید با واحد یکسان جمع زده شوند.",
      role: "جدول قابل ویرایش، مدیریت داده‌ها با Pinia و میان‌برهای صفحه‌کلید را برای ثبت و ذخیرهٔ ردیف‌ها پیاده کرده‌ام.",
      features: [
        "پشتیبانی از ارقام فارسی و راست‌به‌چپ",
        "ثبت با صفحه‌کلید",
        "ذخیرهٔ خودکار محلی",
      ],
      stack: ["Vue 3", "TypeScript", "Pinia", "VueUse", "Vite"],
      outcome:
        "برنامه مبلغ‌های پیش‌بینی‌شده و پرداخت‌شده را جمع می‌زند و تغییرات را خودکار ذخیره می‌کند. ردیف‌های جدول روی موبایل به شکل کارت نمایش داده می‌شوند.",
      limitations:
        "اطلاعات در همان مرورگر می‌ماند و کاربر نرخ تبدیل ارز را وارد می‌کند.",
      status: "نمونهٔ اولیه",
      links: [
        {
          label: "کد منبع",
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
        "ابزاری برای تبدیل فایل صوتی فارسی به متن روی رایانه، با امکان ادامهٔ پردازش پس از وقفه و تأیید گویندگان توسط کاربر.",
      context:
        "پردازش ضبط‌های طولانی به امکان ادامه کار پس از خطا، خروجی قابل‌ردیابی و تفکیک استنباط ماشین از تأیید هویت گوینده نیاز دارد.",
      role: "در حال توسعه خط لوله و قواعد بازیابی آن: بررسی یکپارچگی ورودی، ادامه مراحل، تلاش مجدد محدود، هم‌ترازی، تفکیک گویندگان و مرحله صریح تأیید هویت توسط انسان.",
      features: [
        "یکپارچگی و منشأ ورودی",
        "پردازش قابل‌ادامه",
        "بازیابی محدود",
        "تأیید انسانی",
      ],
      stack: ["Python", "Whisper", "FFmpeg"],
      outcome:
        "در مخزن، مراحل پردازش و آزمون‌های بازیابی با داده‌های ساختگی مستند شده‌اند.",
      limitations:
        "در حال توسعه است. آزمون‌های مصنوعی، دقت واقعی پیاده‌سازی صوت، سرعت پردازش یا آمادگی استفاده عملیاتی را اثبات نمی‌کنند.",
      status: "پروژه مهندسی در حال توسعه",
      category: "public",
      links: [
        {
          label: "مخزن و شواهد",
          to: "https://github.com/aliarghyani/offline-audio-transcription",
          icon: "i-mdi-github",
        },
      ],
    },
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
      featured: true,
      description: "پنل گردشگری سلامت با گردش‌کار بیمار، مدیریت و زمان‌بندی.",
      context:
        "عملیات بیماران به هماهنگی فرم‌ها، زمان‌بندی و دسترسی متناسب با نقش کاربر نیاز دارد. در این محصول حوزه سلامت، از طریق NexaPortal به‌عنوان توسعه‌دهنده فرانت‌اند مشارکت دارم.",
      role: "پیاده‌سازی رابط با Vue 3، TypeScript، Vuetify و Pinia؛ اتصال فرم‌ها، زمان‌بندی و به‌روزرسانی‌های بلادرنگ به API همراه با اعتبارسنجی و مدیریت مجوزها در رابط کاربری.",
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
        "تحویل صفحات بیمار و مدیریت برای استفاده از فرم‌ها، زمان‌بندی و ارتباط بلادرنگ در گردش‌کارهای روزانه گردشگری سلامت.",
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
      featured: true,
      description:
        "رابط وب‌سایت و اپلیکیشن سلامت برای بررسی خدمات درمانی در ترکیه.",
      context:
        "Artemis Clinics محصول حوزه سلامت است که از طریق NexaPortal در توسعه آن مشارکت دارم.",
      role: "از طریق NexaPortal در گفت‌وگوهای محصولی و فنی با مدیرعامل، ساختاردهی نیازمندی‌ها از گفت‌وگوهای صوتی و متنی، برنامه‌ریزی اجرا، توسعه فرانت‌اند، طراحی تجربه و رابط کاربری و بررسی نتیجه مشارکت دارم. وظایف مبتنی بر هوش مصنوعی را با محدوده روشن، معیار پذیرش و بازبینی اصلاحی پیش می‌برم.",
      features: [
        "صفحات خدمات سلامت",
        "رابط واکنش‌گرا",
        "ساختار محتوای بیمارمحور",
      ],
      stack: ["Nuxt", "Vue", "Tailwind CSS"],
      outcome:
        "پیاده‌سازی رابط‌های معرفی خدمات سلامت؛ وب‌سایت همچنان در حال توسعه است و پیش‌نمایش توسعه آن قابل مشاهده است.",
      thumbnail: "/img/artemis-new-logo.png",
      status: "وب‌سایت در حال توسعه",
      opensource: false,
      links: [
        {
          label: "پیش‌نمایش توسعه وب‌سایت",
          to: "https://dev.artemisclinics.com/",
          icon: "i-mdi-link",
        },
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
      name: "ADHD Interactive Explorer",
      description: "آزمایش معماری برای گراف دانش دوزبانه و دسترس‌پذیر.",
      context:
        "نمایش تعاملی باید معنای مدل دانش را حفظ کند و در صورت خرابی نمایشگر بصری، همچنان قابل‌استفاده بماند.",
      role: "آزمایش جداسازی دانش مرجع، خروجی چیدمان، انتخاب مبتنی بر مسیر و نمایشگر تعویض‌پذیر Vue/SVG؛ همراه با مرورگر معنایی روابط که در سرور رندر می‌شود.",
      features: [
        "جداسازی دانش و نمایشگر",
        "فارسی و انگلیسی",
        "ناوبری با صفحه‌کلید",
        "جایگزین هنگام خرابی نمایشگر",
      ],
      stack: ["Nuxt", "Vue", "TypeScript", "SVG"],
      outcome:
        "گزارش عمومی آزمایش، بررسی صفحه‌کلید، راست‌به‌چپ، پیوند مستقیم، هیدریشن و خرابی عمدی نمایشگر را ثبت کرده است.",
      limitations:
        "صرفاً نمونه آزمایشی معماری است؛ محصول گسترده‌تر کامل نشده و اعتبارسنجی بالینی ندارد.",
      status: "آزمایش معماری · محصول در حال توسعه",
      category: "public",
      links: [
        {
          label: "مخزن",
          to: "https://github.com/aliarghyani/ADHD-Interactive-Explorer",
          icon: "i-mdi-github",
        },
        {
          label: "ارزیابی آزمایش معماری",
          to: "https://github.com/aliarghyani/ADHD-Interactive-Explorer/blob/main/VALIDATION_SPIKE_EVALUATION.md",
          icon: "i-mdi-file-document-outline",
        },
      ],
    },
  ],
};

export default portfolioFa;
