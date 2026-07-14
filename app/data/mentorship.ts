export type MentorshipArea = {
  title: string;
  description: string;
  icon: string;
};

export type MentorshipAttribute = {
  label: string;
  icon: string;
};

export type MentorshipProcessStep = {
  title: string;
  description: string;
};

export type MentorshipContent = {
  eyebrow: string;
  title: string;
  introduction: string;
  support: string;
  attributesLabel: string;
  attributes: MentorshipAttribute[];
  ctaLabel: string;
  areas: MentorshipArea[];
  processTitle: string;
  processSteps: MentorshipProcessStep[];
  expectationsNote: string;
};

export type MentorshipLocale = "en" | "fa";

export const mentorshipContent: Record<MentorshipLocale, MentorshipContent> = {
  en: {
    eyebrow: "New Service",
    title: "Personalized Mentorship for Soft Skills & Professional Growth",
    introduction:
      "One-to-one mentorship for students and early-career professionals focused on self-awareness, clearer decisions, stronger communication, better learning, and practical AI use.",
    support:
      "Each roadmap adapts to the mentee’s goals, context, and progress—not a fixed syllabus.",
    attributesLabel: "Mentorship program attributes",
    attributes: [
      { label: "One-to-One", icon: "i-mdi-account-outline" },
      { label: "Personalized", icon: "i-mdi-tune-variant" },
      {
        label: "Practice-Led",
        icon: "i-mdi-checkbox-marked-circle-outline",
      },
    ],
    ctaLabel: "Request an Intro Call",
    areas: [
      {
        title: "Self-Awareness & Decision-Making",
        description:
          "Understand strengths, motivations, behavioral patterns, and growth areas.",
        icon: "i-mdi-account-search-outline",
      },
      {
        title: "Communication & Presentation",
        description:
          "Build practical communication, presentation, listening, and question-asking skills.",
        icon: "i-mdi-presentation-play",
      },
      {
        title: "Thinking & Problem Solving",
        description:
          "Improve decisions through structured thinking, critical analysis, and mental models.",
        icon: "i-mdi-lightbulb-on-outline",
      },
      {
        title: "Learning & Research",
        description:
          "Research effectively, evaluate sources, and build a reliable learning system.",
        icon: "i-mdi-book-search-outline",
      },
      {
        title: "AI & Modern Tools",
        description:
          "Use AI for practical research, learning, productivity, and problem-solving.",
        icon: "i-mdi-robot-outline",
      },
      {
        title: "Career Direction & Growth",
        description:
          "Explore realistic directions, complementary skills, and a personal growth roadmap.",
        icon: "i-mdi-briefcase-outline",
      },
    ],
    processTitle: "How it works",
    processSteps: [
      {
        title: "Discover",
        description:
          "Clarify the mentee’s goals, context, and current challenges.",
      },
      {
        title: "Build the Roadmap",
        description: "Set priorities and exercises around individual needs.",
      },
      {
        title: "Act and Review",
        description: "Execute, review, and improve through practical feedback.",
      },
    ],
    expectationsNote:
      "Topics and assignments adapt to each mentee’s progress. Active participation is expected; specific career or income outcomes are not guaranteed.",
  },
  fa: {
    eyebrow: "خدمت جدید",
    title: "منتورشیپ اختصاصی مهارت‌های نرم و رشد\u00A0حرفه‌ای",
    introduction:
      "برای دانشجوها و افراد ابتدای مسیر حرفه‌ای؛ با تمرکز بر خودشناسی، تصمیم‌گیری بهتر، ارتباط مؤثر، یادگیری هدفمند و استفاده کاربردی از هوش مصنوعی.",
    support:
      "مسیر هر نفر براساس اهداف، شرایط و میزان پیشرفتش تنظیم می‌شود؛ نه یک سرفصل ثابت برای همه.",
    attributesLabel: "ویژگی‌های برنامه منتورشیپ",
    attributes: [
      { label: "یک‌به‌یک", icon: "i-mdi-account-outline" },
      { label: "شخصی‌سازی‌شده", icon: "i-mdi-tune-variant" },
      { label: "تمرین‌محور", icon: "i-mdi-checkbox-marked-circle-outline" },
    ],
    ctaLabel: "درخواست جلسه آشنایی",
    areas: [
      {
        title: "خودشناسی و تصمیم‌گیری",
        description:
          "شناخت ارزش‌ها، انگیزه‌ها، الگوهای رفتاری و نقاط قابل‌بهبود.",
        icon: "i-mdi-account-search-outline",
      },
      {
        title: "ارتباط و ارائه",
        description: "تقویت پرزنتیشن، پرسشگری، گوش‌دادن فعال و تعامل حرفه‌ای.",
        icon: "i-mdi-presentation-play",
      },
      {
        title: "تفکر و حل مسئله",
        description:
          "تصمیم‌گیری شفاف‌تر، تحلیل انتقادی و مدل‌های ذهنی کاربردی.",
        icon: "i-mdi-lightbulb-on-outline",
      },
      {
        title: "یادگیری و پژوهش",
        description:
          "سرچ هدفمند، ارزیابی منابع و ساخت یک سیستم یادگیری قابل‌اعتماد.",
        icon: "i-mdi-book-search-outline",
      },
      {
        title: "هوش مصنوعی و ابزارهای مدرن",
        description:
          "استفاده مؤثر از \u2066AI\u2069 برای تحقیق، یادگیری، بهره‌وری و حل مسئله.",
        icon: "i-mdi-robot-outline",
      },
      {
        title: "مسیر شغلی و رشد حرفه‌ای",
        description:
          "کشف فرصت‌ها، شناخت مهارت‌های مکمل و طراحی یک نقشه رشد واقع‌بینانه.",
        icon: "i-mdi-briefcase-outline",
      },
    ],
    processTitle: "فرایند کوتاه منتورشیپ",
    processSteps: [
      {
        title: "شناخت اولیه",
        description: "اهداف، شرایط و چالش‌های فعلی را مشخص می‌کنیم.",
      },
      {
        title: "طراحی مسیر شخصی",
        description: "اولویت‌ها و تمرین‌ها متناسب با نیاز فرد تنظیم می‌شوند.",
      },
      {
        title: "اقدام و بازبینی",
        description: "خروجی‌ها اجرا، بررسی و در هر مرحله اصلاح می‌شوند.",
      },
    ],
    expectationsNote:
      "موضوعات و تمرین‌ها براساس نیاز و پیشرفت فرد تغییر می‌کنند. مشارکت فعال ضروری است و نتیجه شغلی یا درآمد مشخصی تضمین نمی‌شود.",
  },
};
