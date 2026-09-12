// References reviewed September 8, 2026. New specialist topics are marked as exploration.
export type AiGroup = "ide_dev" | "protocols" | "concepts" | "approaches";
export const AI_GROUPS: readonly AiGroup[] = [
  "ide_dev",
  "protocols",
  "concepts",
  "approaches",
];
export type AiItem = {
  id: string;
  name: string;
  group: AiGroup;
  icon: string;
  shortWhy: string;
  fa: { shortWhy: string };
  source: string;
  exploring: boolean;
};
export const aiStackItems: AiItem[] = [
  {
    id: "context-engineering",
    name: "Context Engineering",
    group: "concepts",
    icon: "i-twemoji-card-index-dividers",
    shortWhy:
      "Select relevant code, constraints, and documentation; summarize decisions so longer tasks retain useful context.",
    fa: {
      shortWhy:
        "انتخاب کد، محدودیت‌ها و مستندات مرتبط و خلاصه‌سازی تصمیم‌ها برای حفظ اطلاعات مفید در کارهای طولانی.",
    },
    source:
      "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    exploring: false,
  },
  {
    id: "spec-driven",
    name: "Spec-Driven Development",
    group: "approaches",
    icon: "i-twemoji-open-book",
    shortWhy:
      "Turn requirements into a reviewed plan, small tasks, and acceptance criteria before implementation.",
    fa: {
      shortWhy:
        "تبدیل نیازمندی‌ها به برنامه قابل بازبینی، کارهای کوچک و معیارهای پذیرش پیش از پیاده‌سازی.",
    },
    source: "https://github.github.com/spec-kit/",
    exploring: false,
  },
  {
    id: "repo-instructions",
    name: "AGENTS.md & Repo Rules",
    group: "concepts",
    icon: "i-mdi-file-document-outline",
    shortWhy:
      "Give coding agents project conventions, setup commands, test instructions, and clear scope boundaries.",
    fa: {
      shortWhy:
        "ارائه قراردادهای پروژه، دستورهای راه‌اندازی و تست و محدوده روشن کار به عامل‌های کدنویسی.",
    },
    source: "https://agents.md/",
    exploring: false,
  },
  {
    id: "agent-skills",
    name: "Agent Skills",
    group: "concepts",
    icon: "i-twemoji-jigsaw",
    shortWhy:
      "Package repeatable workflows in SKILL.md with supporting resources, loaded only when the task needs them.",
    fa: {
      shortWhy:
        "بسته‌بندی گردش‌کارهای تکرارپذیر در SKILL.md همراه با منابع کمکی که فقط هنگام نیاز بارگذاری می‌شوند.",
    },
    source: "https://agentskills.io/home",
    exploring: true,
  },
  {
    id: "human-review",
    name: "Human Review & Ownership",
    group: "approaches",
    icon: "i-twemoji-handshake",
    shortWhy:
      "Review diffs, understand tradeoffs, and verify behavior before accepting generated code. Keep product decisions accountable to a person.",
    fa: {
      shortWhy:
        "بازبینی تغییرات، درک بده‌بستان‌ها و بررسی رفتار پیش از پذیرش کد تولیدشده؛ مسئولیت تصمیم‌های محصول با انسان است.",
    },
    source: "https://code.visualstudio.com/docs/agents/overview",
    exploring: false,
  },
  {
    id: "verification",
    name: "Browser & Test Verification",
    group: "approaches",
    icon: "i-mdi-check-decagram-outline",
    shortWhy:
      "Check types, tests, and real browser behavior, including accessibility and responsive layouts; keep evidence of what passed.",
    fa: {
      shortWhy:
        "بررسی تایپ‌ها، تست‌ها و رفتار واقعی مرورگر، از جمله دسترس‌پذیری و چیدمان واکنش‌گرا، همراه با ثبت نتایج.",
    },
    source: "https://github.com/microsoft/playwright-mcp",
    exploring: false,
  },
  {
    id: "agent-harnesses",
    name: "Agent Harnesses & Checkpoints",
    group: "approaches",
    icon: "i-mdi-cog-outline",
    shortWhy:
      "Explore durable progress notes, bounded tasks, and feedback loops so an agent can resume work and verify completion.",
    fa: {
      shortWhy:
        "بررسی یادداشت‌های پایدار پیشرفت، کارهای محدود و حلقه‌های بازخورد برای ادامه کار عامل و تأیید تکمیل آن.",
    },
    source:
      "https://www.anthropic.com/engineering/harness-design-long-running-apps",
    exploring: true,
  },
  {
    id: "evals",
    name: "Agent Evals & Regression Checks",
    group: "approaches",
    icon: "i-mdi-chart-box-outline",
    shortWhy:
      "Explore representative tasks, explicit success criteria, and trace inspection to compare changes across repeated runs.",
    fa: {
      shortWhy:
        "بررسی کارهای نماینده، معیارهای صریح موفقیت و مسیر اجرای عامل برای مقایسه تغییرات در اجراهای تکرارشونده.",
    },
    source:
      "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    exploring: true,
  },
  {
    id: "orchestration",
    name: "Scoped Agent Orchestration",
    group: "approaches",
    icon: "i-twemoji-people-holding-hands",
    shortWhy:
      "Split independent work with clear ownership and handoffs; use a single agent when coordination would add unnecessary overhead.",
    fa: {
      shortWhy:
        "تقسیم کارهای مستقل با مسئولیت و تحویل روشن؛ استفاده از یک عامل وقتی هماهنگی چند عامل هزینه اضافی ایجاد می‌کند.",
    },
    source: "https://www.anthropic.com/engineering/building-effective-agents",
    exploring: false,
  },
  {
    id: "sandboxing",
    name: "Sandboxing & Tool Permissions",
    group: "concepts",
    icon: "i-mdi-shield-check-outline",
    shortWhy:
      "Explore limiting filesystem and network access, treating retrieved instructions as untrusted, and reviewing sensitive tool actions.",
    fa: {
      shortWhy:
        "بررسی محدودسازی دسترسی فایل و شبکه، غیرقابل اعتماد دانستن دستورهای منابع بازیابی‌شده و بازبینی اقدام‌های حساس ابزارها.",
    },
    source: "https://www.anthropic.com/engineering/claude-code-sandboxing",
    exploring: true,
  },
  {
    id: "budgets",
    name: "Context, Cost & Latency Budgets",
    group: "concepts",
    icon: "i-twemoji-abacus",
    shortWhy:
      "Keep context focused, choose task-appropriate models, and bound retries and tool calls; evaluate quality alongside cost and latency.",
    fa: {
      shortWhy:
        "حفظ تمرکز کانتکست، انتخاب مدل متناسب با کار و محدودسازی تلاش مجدد و فراخوانی ابزار؛ سنجش کیفیت همراه با هزینه و تأخیر.",
    },
    source: "https://www.anthropic.com/engineering/building-effective-agents",
    exploring: false,
  },
  {
    id: "prompting",
    name: "Clear Prompts & Output Contracts",
    group: "concepts",
    icon: "i-twemoji-hammer-and-wrench",
    shortWhy:
      "Specify the goal, constraints, examples, and expected output. Request checkable results and validate structured data at boundaries.",
    fa: {
      shortWhy:
        "تعیین هدف، محدودیت‌ها، نمونه‌ها و خروجی مورد انتظار؛ درخواست نتایج قابل بررسی و اعتبارسنجی داده ساختاریافته در مرزهای سیستم.",
    },
    source:
      "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    exploring: false,
  },
  {
    id: "vscode",
    name: "VS Code",
    group: "ide_dev",
    icon: "i-logos-visual-studio-code",
    shortWhy:
      "Bring code navigation, terminal tools, agent instructions, and change review into the development workspace.",
    fa: {
      shortWhy:
        "ترکیب مرور کد، ابزارهای ترمینال، دستورهای عامل و بازبینی تغییرات در محیط توسعه.",
    },
    source: "https://code.visualstudio.com/docs/agents/overview",
    exploring: false,
  },
  {
    id: "cursor",
    name: "Cursor",
    group: "ide_dev",
    icon: "i-twemoji-sparkles",
    shortWhy:
      "Use repository context and project rules to guide multi-file edits, then inspect and test the result.",
    fa: {
      shortWhy:
        "هدایت ویرایش چندفایلی با کانتکست مخزن و قواعد پروژه و سپس بازبینی و تست نتیجه.",
    },
    source: "https://cursor.com/docs/agent/overview",
    exploring: false,
  },
  {
    id: "mcp",
    name: "Model Context Protocol (MCP)",
    group: "protocols",
    icon: "i-twemoji-globe-with-meridians",
    shortWhy:
      "Connect AI applications to tools, resources, and reusable prompts through a standard client–server protocol.",
    fa: {
      shortWhy:
        "اتصال برنامه‌های هوش مصنوعی به ابزارها، منابع و پرامپت‌های قابل استفاده مجدد از طریق پروتکل استاندارد کلاینت–سرور.",
    },
    source: "https://modelcontextprotocol.io/docs/getting-started/intro",
    exploring: false,
  },
  {
    id: "context7",
    name: "Context7 MCP",
    group: "protocols",
    icon: "i-twemoji-open-book",
    shortWhy:
      "Retrieve current, version-specific library documentation and examples before relying on a generated API suggestion.",
    fa: {
      shortWhy:
        "بازیابی مستندات و نمونه‌های به‌روز متناسب با نسخه کتابخانه پیش از اتکا به پیشنهاد API تولیدشده.",
    },
    source: "https://github.com/upstash/context7",
    exploring: false,
  },
  {
    id: "playwright",
    name: "Playwright MCP",
    group: "protocols",
    icon: "i-logos-playwright",
    shortWhy:
      "Let an agent inspect and interact with browser pages using accessibility snapshots; pair exploration with repeatable tests.",
    fa: {
      shortWhy:
        "بازرسی و تعامل عامل با صفحات مرورگر از طریق نمای دسترس‌پذیری؛ ترکیب بررسی تعاملی با تست‌های تکرارپذیر.",
    },
    source: "https://github.com/microsoft/playwright-mcp",
    exploring: false,
  },
  {
    id: "chrome-devtools",
    name: "Chrome DevTools MCP",
    group: "protocols",
    icon: "i-logos-chrome",
    shortWhy:
      "Inspect the DOM, console, network, and performance traces to diagnose frontend issues with browser evidence.",
    fa: {
      shortWhy:
        "بررسی DOM، کنسول، شبکه و ردگیری عملکرد برای تشخیص مشکلات فرانت‌اند با شواهد مرورگر.",
    },
    source: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    exploring: false,
  },
];
