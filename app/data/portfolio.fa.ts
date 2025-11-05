import type { PortfolioData } from '@/types/portfolio.types'

const portfolioFa: PortfolioData = {
  profile: {
    name: 'علی ارغیانی',
    title: 'توسعه‌دهنده فرانت‌اند',
    // location: 'Tehran Province - Iran , Remote - Turkey',
    location: 'استان تهران، ایران',
    summary:
      'توسعه‌دهندهٔ فرانت‌اند با تجربه در Vue.js، Nuxt.js و TypeScript. مهاجرت از حوزهٔ رهبری تیم و تحلیل در مخابرات به توسعهٔ وب مدرن با تمرکز بر تجربهٔ توسعه‌دهنده، دسترس‌پذیری، کارایی و تحویلِ متمرکز بر نیاز مشتری.',
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
    title: 'ابزارهای اصلی',
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
    title: 'نقش‌ها',
    items: [
      { label: 'توسعه‌دهندهٔ فرانت‌اند', icon: 'i-twemoji-laptop' },
      { label: 'SSR با Nuxt', icon: 'i-twemoji-rocket' },
      { label: 'مهندسی رابط کاربری', icon: 'i-twemoji-toolbox' },
      { label: 'DX و عملکرد', icon: 'i-twemoji-high-voltage' },
    ],
  },

  values: {
    title: 'ارزش‌ها',
    items: [
      { label: 'خودمختاری و مالکیت', icon: 'i-twemoji-key', description: 'پیش‌قدم و مسئولیت‌پذیر؛ تحویل کار از ابتدا تا انتها.' },
      { label: 'استانداردهای بالا', icon: 'i-twemoji-sparkles', description: 'کیفیت به‌جای میانبر؛ کار را بهتر از قبل رها کن.' },
      { label: 'تحویل متمرکز بر مشتری', icon: 'i-twemoji-handshake', description: 'هدف را بفهم، مرحله‌ای بساز، نتیجه را همسو نگه‌دار.' },
      { label: 'کار تیمی و منتورینگ', icon: 'i-twemoji-people-holding-hands', description: 'دانش را به‌اشتراک بگذار، تیم را رشد بده، قابل اتکا باش.' },
      { label: 'ارتباط شفاف', icon: 'i-twemoji-speech-balloon', description: 'چرایی/چی/چطور را بگو؛ کوتاه و ترجیحاً غیرهم‌زمان.' },
    ],
  },

  experiences: [
    {
      company: 'NexaPortal',
      link: 'https://nexaportal.com/',
      logo: '/img/NexaPortal1.png',
      location: 'ازمیر، ترکیه · ریموت',
      type: 'تمام‌وقت',
      positions: [
        {
          title: 'توسعه‌دهندهٔ فرانت‌اند',
          start: 'دسامبر ۲۰۲۴',
          ongoing: true,
          description: [
            'مشارکت در پلتفرمی برای دگرگونی مدیریت کسب‌وکار گردشگری سلامت؛ ساخت فرانت‌اندهای امن و مقیاس‌پذیر.',
            'پیاده‌سازی معماری Vue 3 + TypeScript با Vuetify، Vite، Pinia، RBAC و i18n؛ تمرکز بر DX، عملکرد و دسترس‌پذیری.',
            'ساخت اپ کاربر و داشبورد ادمین: https://app.elaramedical.com/ · https://dashboard.elaramedical.com/',
            'قابلیت‌های PWA، فلوهای فرمی سنگین، تقویم و زمان‌بندی، یکپارچه‌سازی با Google API و بلادرنگ با WebSocket.',
            'دروازه‌های کیفیت: ESLint سخت‌گیرانه، تست‌های E2E با Cypress، بیلدهای سازگار با CI و کدریویو.'
          ],
          icons: ['i-logos-vue', 'i-logos-vuetifyjs', 'i-logos-typescript-icon', 'i-logos-vitejs', 'i-logos-pinia', 'i-logos-eslint', 'i-logos-cypress'],
          link: 'https://app.elaramedical.com/',
          linkLabel: 'پلتفرم Elara',
        },
      ],
    },
    {
      company: 'Freelancer',
      type: 'خویش‌فرما',
      location: 'تهران، ایران · هیبرید',
      positions: [
        {
          title: 'توسعه‌دهندهٔ فرانت‌اند | Vue.js، Nuxt.js، TailwindCSS',
          start: 'سپتامبر ۲۰۲۳',
          end: 'دسامبر ۲۰۲۴',
          description: [
            'تحویل اپ‌های SSR پرفورمنس با Nuxt 3 و Vue 3؛ بهبود سرعت و SEO.',
            'طراحی سیستم‌های کامپوننتی ماژولار و نگهداشت‌پذیر؛ اطمینان از واکنش‌گرایی و دسترس‌پذیری در همه دستگاه‌ها.',
            'همکاری بین‌وظیفه‌ای با Git؛ ارسال مرحله‌ای با تمرکز بر اهداف مشتری.',
            'بهره‌گیری از Vuetify و VueUse برای تسریع توسعه؛ قابلیت انطباق سریع با React در صورت نیاز.',
            'نمونه‌های اخیر: https://ideh.app/ · https://insho.app/ · https://laservice.ir/ · https://bamashin.net/ · https://hiloop.app/ · https://atdeloop.com/'
          ],
          icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon', 'i-logos-vuetifyjs', 'i-logos-typescript-icon'],
        },
      ],
    },
    {
      company: 'Huawei',
      logo: '/img/huawei.svg',
      location: 'تهران، ایران',
      positions: [
        {
          title: 'کارشناس ارشد عملکرد و رهبر تیم',
          start: 'آوریل ۲۰۲۲',
          end: 'آگوست ۲۰۲۳',
          description: [
            'نگهداشت عملکرد و در‌دسترس‌بودن ~۱۴٬۵۰۰ سایت MTN Irancell در سراسر کشور.',
            'رهبری تحلیل KPI (2G/3G/4G)، چک‌های TCHA، ریشه‌یابی و پیگیری سرتاسری رخدادها تا حل.',
            'تهیه گزارش‌های هفتگی/ماهانه/فصلانه برای ذی‌نفعان؛ پایش OLA/SLA و تصعید ریسک‌ها.',
            'هماهنگی پیمانکاران و زیرپیمانکاران؛ برنامه‌ریزی و رهگیری ابتکارهای پرریسک و اقدامات بازیابی.',
            'تعریف محدوده، زمان‌بندی، سیاست‌ها و رویه‌ها؛ بهبود فرآیند، ممیزی و کیفیت عملیات.',
            'بهینه‌سازی OPEX با حذف هزینه‌های غیرضروری؛ پیش‌بینی و بودجه‌بندی با صورت‌های مالی به‌موقع.',
            'مالک ارتباط با مشتری؛ تحقق اهداف مالی و قراردادی به‌موقع.',
            'تسلط بر ابزارهای OSS/MW اکوسیستم Ericsson/Huawei/Nokia؛ منتورینگ اعضای تیم.'
          ],
        },
        {
          title: 'کارشناس ارشد عملکرد',
          start: 'جولای ۲۰۱۸',
          end: 'جولای ۲۰۲۳',
          description: [
            'راندن تحلیل KPI شبکه در 2G/3G/LTE؛ شناسایی روندها و فرصت‌های بهبود.',
            'مشارکت در ممیزی‌ها، بهبود فرآیند و داشبوردهای عملکرد؛ پشتیبانی از فرایندهای حل رخداد.'
          ],
        },
        {
          title: 'دستیار مدیر منطقه',
          start: 'مارس ۲۰۱۸',
          end: 'جولای ۲۰۱۸',
          description: [
            'نگهداشت ~۳۰۰۰ سایت BTS در استان تهران (2G/3G/4G)؛ تحقق اهداف تحویل/پذیرش و صرفه‌جویی هزینه.',
            'مدیریت زیرپیمانکاران و رابط برنامه‌ریزی؛ ترجمه طرح‌های فنی به برنامه‌های اجرایی.',
            'رفع موانع حین پذیرش؛ تصعید ریسک‌های خارج از محدوده برای دستیابی به نتیجه برد-برد با مشتری.'
          ],
        },
        {
          title: 'رهبر تیم TCHA',
          start: 'ژوئن ۲۰۱۷',
          end: 'مارس ۲۰۱۸',
          description: [
            'ساخت داشبوردهای جامع در‌دسترس‌بودن؛ مالک اصلی هم‌راستاسازی ذی‌نفعان زیر الزامات قراردادی سخت.',
            'تحلیل KPI و کانال‌های ترافیک/کنترلی؛ اقدامات راه‌دور و پیگیری تصعیدها تا حل نهایی.',
            'کسب عنوان فارغ‌التحصیل برتر در گردهمایی سالانه Huawei.'
          ],
        },
        {
          title: 'کارمند بک‌آفیس',
          start: 'ژوئن ۲۰۱۶',
          end: 'ژوئن ۲۰۱۷',
          description: [
            'پشتیبانی عملیات OSS، چک‌های عملکرد و گزارش‌دهی؛ کمک به کارایی تیم و رضایت مشتری.'
          ],
        },
      ],
    },
    {
      company: 'Solar Energy World',
      positions: [
        {
          title: 'مدیر سیستم Solaris',
          start: 'جولای ۲۰۱۵',
          end: 'ژوئن ۲۰۱۶',
          description: ['مانیتورینگ سیستم‌های خورشیدی و ادمین Solaris.'],
        },
      ],
    },
    {
      company: 'Adfa l آدفا',
      location: 'استان تهران، ایران',
      positions: [
        {
          title: 'ادمین',
          start: 'ژوئن ۲۰۱۵',
          end: 'ژوئن ۲۰۱۶',
          description: [
            'پشتیبانی سخت‌افزار/نرم‌افزار و امور اداری شهرداری منطقه ۳ تهران.',
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: 'دانشگاه صنعتی قم',
      degree: 'کارشناسی مهندسی مخابرات',
      start: '۲۰۱۰',
      end: '۲۰۱۵',
      icons: ['i-material-symbols-school'],
      logo: '/img/qut_logo-light.jpg',
    },
  ],

  projects: [
    {
      name: 'vue-cursor-rules',
      description: 'قواعد Cursor مبتنی بر قرارداد برای Vue 3 + TypeScript با تمرکز بر DX، دسترس‌پذیری، امنیت و خروجی قابل اتکا.',
      links: [
        { label: 'GitHub', to: 'https://github.com/aliarghyani/vue-cursor-rules', icon: 'i-mdi-github' },
      ],
      icons: ['i-logos-vue', 'i-logos-typescript-icon'],
      status: 'فعال',
      opensource: true,
      category: 'public',
    },
    {
      name: 'ایده — پلتفرم نوآوری',
      description: 'پلتفرمی پویا و مقیاس‌پذیر برای ارزیابی ایده‌ها و بینش‌های بازار.',
      thumbnail: '/img/projects/ideh.png',
      status: 'فعال',
      opensource: false,
      links: [
        { label: 'وب‌سایت', to: 'https://ideh.app/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
      category: 'freelance',
    },
    {
      name: 'Insho — بازار تبلیغات',
      description: 'مارکت‌پلیس رسانه برای پیوند دادن آژانس‌ها و تولیدکنندگان محتوا در کمپین‌های تبلیغاتی پراثر.',
      thumbnail: '/img/projects/insho.png',
      status: 'فعال',
      opensource: false,
      links: [
        { label: 'وب‌سایت', to: 'https://insho.app/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
      category: 'freelance',
    },
    {
      name: 'باماشین — سامانه اجاره ناوگان',
      description: 'پلتفرم اجاره برای رزرو خودرو، قایق، بالگرد، ون، دوچرخه و ناوگان متنوع در سراسر ایران.',
      thumbnail: '/img/projects/bamashin.png',
      status: 'فعال',
      opensource: false,
      links: [
        { label: 'وب‌سایت', to: 'https://bamashin.net/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
      category: 'freelance',
    },
    {
      name: 'Elara Panel',
      description: 'ما بسیار فراتر از یک مجموعه گردشگری سلامت هستیم. بیماران ما ارزشمندترین و محوری‌ترین نقطه ما هستند. خوشحالی آن‌ها، دریافت راهنمایی درست و تجربه خدمات بی‌نقص برای ما حیاتی است. می‌دانیم هر بیمار انتظارات و نیازهای متفاوتی دارد. در این پنل شخصی‌سازی‌شده، به اطلاعاتی دسترسی دارید که مخصوص شماست. در هر آنچه بخواهید شخصی‌سازی کنید کنار شما هستیم. با Elara Medical، درهای یک تجربه فراموش‌نشدنی گردشگری سلامت را بگشایید.',
      thumbnail: '/img/elara-logo.png',
      status: 'فعال',
      opensource: false,
      links: [
        { label: 'وب‌سایت', to: 'https://app.elaramedical.com/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-vue', 'i-logos-vuetifyjs', 'i-logos-typescript-icon', 'i-logos-vitejs'],
      category: 'current',
    },
    {
      name: 'Artemis Clinics',
      description: 'آرتمیس، ارائه‌دهنده قابل اعتماد خدمات پزشکی در ترکیه، شما را به طیف گسترده‌ای از خدمات سلامت باکیفیت با هزینه‌ای به‌مراتب کمتر از آمریکای شمالی و اروپا متصل می‌کند، حتی با احتساب هزینه‌های سفر.',
      thumbnail: '/img/artemis-new-logo.png',
      status: 'فعال',
      opensource: false,
      links: [
        { label: 'وب‌سایت', to: 'https://app.artemisclinics.com/', icon: 'i-mdi-link' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
      category: 'current',
    },
    {
      name: 'NuxtUi-Portfolio-Ali',
      description: 'پورتفولیو من با Nuxt 3 و Nuxt UI v4، شامل پروژه‌ها، مهارت‌ها و سوابق.',
      status: 'فعال',
      opensource: true,
      links: [
        { label: 'GitHub', to: 'https://github.com/aliarghyani/NuxtUi-Portfolio-Ali', icon: 'i-mdi-github' },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
      category: 'public',
    },
  ],
}

export default portfolioFa
