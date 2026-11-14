import type { Resume } from "~/types/resume";
import { resumeData as en } from "./resume.en";

const workTranslations: Record<string, Partial<Resume["work"][number]>> = {
  "NexaPortal:2024-12": {
    position: "توسعه‌دهنده فرانت‌اند (دورکاری)",
    location: "ازمیر، ترکیه",
    highlights: [
      "توسعه رابط‌های بیمار و مدیریت برای **Elara Medical** و **Artemis Clinics** در **NexaPortal**؛ کار فعلی شامل وب‌سایت آرتمیس است",
      "ساخت **PDF Template Editor** با Drag and Drop، متغیرهای پویا و پشتیبانی چندصفحه‌ای برای ایجاد مدارک بیماران توسط کارکنان بدون نیاز به برنامه‌نویس",
      "پیاده‌سازی **Role-Based Access Control (RBAC)** و مجوزهای سطح فیلد برای گردش‌کارهای کسب‌وکار",
      "توسعه **Schema-Based Form Builder** با Validation و چیدمان Drag and Drop برای ساخت فرم‌های قابل استفاده مجدد",
      "پیاده‌سازی پیام‌رسانی بلادرنگ با **Pusher WebSockets** برای WhatsApp و کانال‌های داخل برنامه",
      "به‌کارگیری Code Splitting، Lazy Loading و مدیریت State با Pinia؛ استفاده از ابزارهای AI همراه با Code Review و تست",
    ],
  },
  "DigiHinet:2026-04": {
    company: "دیجی‌هاینت",
    position: "مشاور مدیرعامل و تیم فنی (پاره‌وقت، موقت)",
    highlights: [
      "ارائه مشاوره به مدیرعامل و تیم فنی در همکاری موقت و پاره‌وقت",
      "مشارکت در مصاحبه‌های مهارت‌های نرم و کمک به تازه‌واردها برای روشن‌کردن مسیر شغلی، اولویت‌های یادگیری و رشد حرفه‌ای",
    ],
  },
  "Freelance:2023-09": {
    company: "پروژه‌های فریلنسری",
    position: "توسعه‌دهنده فرانت‌اند (دورکاری)",
    location: "تهران، ایران",
    highlights: [
      "تحویل رابط‌های واکنش‌گرا با Vue/Nuxt و کامپوننت‌های قابل‌استفاده مجدد برای **Ideh**، **Insho** و **BaMashin**",
      "ساخت صفحات ارزیابی ایده، فرم‌های بازار متصل به داده‌های سرور، و رابط‌های کاتالوگ اجاره و رزرو",
      "تبدیل نیازهای مشتری به مشخصات فنی و تحویل مرحله‌ای همراه با مستندات و گزارش پیشرفت",
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
      "به‌کارگیری مستندسازی، پایش، مدیریت رخداد و کنترل کیفیت در تحویل کار عملیاتی",
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
  "Operations & Requirements": "عملیات و تحلیل نیازمندی‌ها",
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
      "توسعه‌دهنده فرانت‌اند با Vue/Nuxt و TypeScript برای رابط‌های CRM و SaaS هستم. در NexaPortal گردش‌کارهای محصولات سلامت را توسعه می‌دهم. تجربه هفت‌ساله در Huawei شامل تحلیل شاخص‌های عملکرد، هماهنگی تیم، بهبود فرایند و خودکارسازی گزارش با Python و Pandas است. این شناخت عملیاتی را در فهم نیازمندی‌ها و ساخت رابط‌های قابل‌نگهداشت به کار می‌گیرم؛ با کمک Codex و شناخت مخزن، همراه با بازبینی انسانی و تست. مسیرم به‌سوی دیجیتالی‌کردن گردش‌کارها و برنامه‌ریزی اتصال سامانه‌ها گسترش می‌یابد.",
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
