import type { Resume } from "~/types/resume";
import { resumeData as en } from "./resume.en";

const workTranslations: Record<string, Partial<Resume["work"][number]>> = {
  "NexaPortal:2024-12": {
    position: "توسعه‌دهنده فرانت‌اند (دورکاری)",
    location: "ازمیر، ترکیه",
    highlights: [
      "توسعه رابط‌های بیماران و گردش‌کارهای مدیریت در **NexaPortal** برای **Elara Medical** و **Artemis Clinics**، همراه با پشتیبانی چندزبانه و قابلیت‌های PWA",
      "ساخت **PDF Template Editor** با Drag and Drop، متغیرهای پویا و پشتیبانی چندصفحه‌ای برای ایجاد مدارک بیماران توسط کارکنان بدون نیاز به برنامه‌نویس",
      "پیاده‌سازی **Role-Based Access Control (RBAC)** و مجوزهای سطح فیلد برای گردش‌کارهای کسب‌وکار",
      "توسعه **Schema-Based Form Builder** با Validation و چیدمان Drag and Drop برای ساخت فرم‌های قابل استفاده مجدد",
      "پیاده‌سازی پیام‌رسانی Real-time با **Pusher WebSockets** برای WhatsApp و کانال‌های داخل برنامه، همراه با انیمیشن‌های **Canvas** و شبیه‌سازی فیزیک",
      "به‌کارگیری Code Splitting، Lazy Loading و مدیریت State با Pinia؛ استفاده از ابزارهای AI همراه با Code Review و تست",
    ],
  },
  "Freelance:2023-09": {
    company: "پروژه‌های فریلنسری",
    position: "توسعه‌دهنده فرانت‌اند (دورکاری)",
    location: "تهران، ایران",
    highlights: [
      "توسعه فرانت‌اند با Vue/Nuxt برای **Ideh**، **Insho** و **BaMashin**، شامل صفحات Responsive و Componentهای قابل استفاده مجدد",
      "استفاده از ابزارهای AI برای پیاده‌سازی و Debugging، همراه با بازبینی پیش از تحویل",
      "**Ideh** — ساخت رابط‌های Responsive با Nuxt/Vue و Componentهای مشترک برای پلتفرم ارزیابی ایده",
      "**Insho** — توسعه رابط Marketplace و فرم‌های Schema-Based برای اتصال گردش‌کارهای فرانت‌اند به داده‌های Backend",
      "**BaMashin** — ساخت کاتالوگ اجاره و رابط‌های رزرو برای موبایل و دسکتاپ",
      "مدیریت ارتباط با مشتری، تبدیل نیازهای کسب‌وکار به مشخصات فنی و تحویل مرحله‌ای همراه با مستندات و گزارش پیشرفت",
    ],
  },
  "Huawei Technologies:2022-04": {
    position: "سرپرست ارشد تیم تحلیل عملکرد",
    location: "تهران، ایران",
    highlights: [
      "هدایت تحلیل عملکرد شبکه و هماهنگی رسیدگی به رخدادها در زیرساخت سراسری",
      "خودکارسازی گزارش‌دهی با **Python** و **Pandas** برای پشتیبانی از تحلیل عملکرد شبکه",
      "تدوین استانداردهای عملیاتی و راهنمایی اعضای تیم از طریق بازبینی فرایندها و اشتراک دانش",
      "تحلیل KPIهای شبکه، شناسایی روندهای عملکرد و هماهنگی پیگیری رخدادها",
      "مدیریت ارتباط با ذی‌نفعان و ارائه گزارش‌های هفتگی و ماهانه به **مدیران ارشد** با توضیح تأثیر شاخص‌های فنی بر کسب‌وکار",
      "توسعه انضباط عملیاتی در مستندسازی، Monitoring، Incident Management و کنترل کیفیت و به‌کارگیری این تجربه در مهندسی فرانت‌اند",
    ],
  },
  "Huawei Technologies:2016-06": {
    position: "نقش‌های فنی و سرپرستی",
    location: "تهران، ایران",
    highlights: [
      "**تحلیلگر ارشد عملکرد** (۲۰۱۸–۲۰۲۲): تحلیل KPIهای شبکه 2G/3G/LTE و مشارکت در ممیزی، بهبود فرایندها و داشبوردهای عملکرد",
      "**دستیار مدیر منطقه** (۲۰۱۸): مدیریت حدود **۳٬۰۰۰ سایت BTS** در استان تهران، هماهنگی پیمانکاران و تبدیل مشخصات فنی به برنامه اجرایی",
      "**سرپرست تیم TCHA** (۲۰۱۷–۲۰۱۸): ساخت داشبوردهای دسترس‌پذیری و هماهنگی ذی‌نفعان؛ تقدیر به‌عنوان **فارغ‌التحصیل تازه‌وارد برتر** در گردهمایی سالانه Huawei",
      "**عملیات Back Office** (۲۰۱۶–۲۰۱۷): پشتیبانی عملیات OSS، کنترل عملکرد و گزارش‌دهی و مشارکت در بهبود کارایی تیم و رضایت مشتری",
    ],
  },
};

const skillNames: Record<string, string> = {
  "Frontend Core": "مهارت‌های اصلی فرانت‌اند",
  "AI-Assisted Development": "توسعه با کمک AI",
  "Architecture & Performance": "معماری و عملکرد",
  "Development Tools & Workflow": "ابزارها و فرایند توسعه",
  "Quality & Accessibility": "کیفیت و دسترس‌پذیری",
};

const projectTranslations: Record<
  string,
  Partial<NonNullable<Resume["projects"]>[number]>
> = {
  Ideh: {
    description:
      "پلتفرم ارزیابی ایده و تحلیل بازار با معماری قابل توسعه و کتابخانه Componentهای مشترک",
    highlights: [
      "Componentهای قابل استفاده مجدد",
      "معماری قابل توسعه با Vue.js",
      "ساخت فرم‌های پویا",
    ],
    roles: ["توسعه‌دهنده فرانت‌اند"],
  },
  Insho: {
    description:
      "Marketplace رسانه و تبلیغات برای همکاری آژانس‌ها و تولیدکنندگان محتوا در کمپین‌ها",
    highlights: [
      "مدیریت فرم‌های پویا با معماری Schema-Based، اعتبارسنجی، منطق شرطی و به‌روزرسانی Real-time",
      "اتصال فرم‌های Schema-Based به جریان داده Backend",
      "رابط Responsive برای ارتباط برندها و تولیدکنندگان محتوا و مدیریت فهرست‌ها و پیشنهادها",
    ],
    roles: ["توسعه‌دهنده فرانت‌اند"],
  },
  BaMashin: {
    description:
      "پلتفرم اجاره خودرو، قایق و هلیکوپتر با گردش‌کار رزرو و رابط دسترس‌پذیر",
    highlights: [
      "سامانه اجاره با چند دسته‌بندی",
      "رابط Responsive با توجه به دسترس‌پذیری",
      "رابط‌های کاربری رزرو",
    ],
    roles: ["توسعه‌دهنده فرانت‌اند"],
  },
};

// Dates, contact details and technology keywords stay shared with the English version.
export const resumeData: Resume = {
  ...en,
  basics: {
    ...en.basics,
    name: "علی ارغیانی",
    label: "توسعه‌دهنده فرانت‌اند | Vue.js • Nuxt.js • TypeScript",
    location: { city: "تهران", country: "ایران" },
    summary:
      "توسعه‌دهنده فرانت‌اند با Vue/Nuxt و TypeScript برای ساخت داشبوردهای CRM، پنل‌های مدیریت و برنامه‌های کسب‌وکار متصل به API هستم. در NexaPortal رابط‌های کاربری حوزه گردشگری سلامت را توسعه می‌دهم. سابقه من در Huawei از ۲۰۱۶ تا ۲۰۲۳ شامل تحلیل عملکرد، هماهنگی تیم و همکاری به زبان انگلیسی با تیم‌های چندملیتی است. در توسعه نرم‌افزار از ابزارهای AI در کنار Code Review و تست استفاده می‌کنم.",
  },
  work: en.work.map((job) => ({
    ...job,
    ...workTranslations[job.company + ":" + job.startDate],
  })),
  education: en.education.map((entry) => ({
    ...entry,
    institution: "دانشگاه صنعتی قم",
    area: "مهندسی مخابرات",
    studyType: "کارشناسی",
    courses: [
      "Software Architecture",
      "Systems Design",
      "Network Management",
      "Digital Signal Processing",
    ],
  })),
  skills: en.skills.map((skill) => ({
    ...skill,
    name: skillNames[skill.name] ?? skill.name,
  })),
  languages: [
    { language: "فارسی", fluency: "زبان مادری" },
    { language: "انگلیسی", fluency: "تسلط حرفه‌ای در محیط کار" },
  ],
  projects: en.projects?.map((project) => ({
    ...project,
    ...projectTranslations[project.name],
  })),
};
