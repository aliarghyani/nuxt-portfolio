# ST-03 — خط مبنای عملکرد پرتفولیو

ممیزی تولید در **۲۳ نوامبر ۲۰۲۶**، ساعت **۱۵:۴۴ تا ۱۵:۵۴ به وقت تهران**. سنجش روی دامنهٔ اصلی انجام شد. بررسی سورس به SHA زیر محدود بود. این شاخه گزارش و دادهٔ اندازه‌گیری را اضافه می‌کند.

```text
Production  https://aliarghyani.ir
Branch      phase01/st-03-performance-baseline
Base SHA    34afa15c6e3f86183632c24a870bc91909dbde85
```

## روش اندازه‌گیری

- **۳۲ اجرای معتبر Lighthouse** با نسخهٔ 13.6.0، Chrome Headless 157.0.8103.79 و Node.js 22.23.4. میزبان Windows x64 با build 26200، پردازندهٔ i7‑12700H، ۲۰ پردازندهٔ منطقی و ۱۶ گیبی‌بایت حافظه بود. Chrome برای هر اجرا با پروفایل تازه راه افتاد. مرورگر سرد بود و کش لبهٔ Vercel به وضعیت پاسخ تولید وابسته بود.
- پروفایل موبایل، Moto G Power شبیه‌سازی‌شده با viewport برابر 412×823، DPR برابر 1.75، شبکهٔ مدل‌شدهٔ Slow 4G با RTT برابر 150 ms، پهنای باند 1,638.4 Kbps و CPU برابر 4× بود. پروفایل دسکتاپ viewport برابر 1350×940، DPR برابر 1، RTT برابر 40 ms، پهنای باند 10,240 Kbps و CPU برابر 1× داشت. هر دو از مدل Simulated استفاده کردند. زمان‌های waterfall و trace خام، زمان مشاهده‌شده در Chrome هستند و می‌توانند با متریک‌های مدل‌شده فرق داشته باشند. [روش throttling](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md)
- دور اول هر هشت مسیر را در هر دو پروفایل پوشش داد. دور دوم همهٔ مسیرهای موبایل و دو خانهٔ دسکتاپ را تکرار کرد. دور سوم دو خانه را در هر دو پروفایل و دو فهرست وبلاگ را روی موبایل تکرار کرد. اجراها ترتیبی بودند. معیار پذیرش گزارش، تطابق URL نهایی و پروفایل، وجود امتیاز Performance و نبود خطای runtime بود.
- آزمایش‌های تکمیلی با Chrome DevTools Protocol و درخواست مستقیم HTTP برای تشخیص علت انجام شدند. جدول فقط از اجراهای استاندارد Lighthouse ساخته شده است. مرورگر، نسخهٔ کد ابزار و روش سنجش در بازتولید باید ثابت باشند.

## نتایج آزمایشگاهی

زمان‌ها برحسب **ms**، انتقال برحسب **KiB**، امتیاز از **۱۰۰** و CLS بدون واحد است. هر سلول میانهٔ همان متریک است و در ردیف‌های تک‌اجرا همان مشاهدهٔ منفرد است. ستون JS KiB مجموع transferSize درخواست‌های Script است. JS CPU زمان parse، compile و اجرای جاوااسکریپت در audit Lighthouse است. سهم خالص hydration جداگانه اندازه‌گیری نشده است.

| Route           | Device  |   n | Score |  LCP |   CLS |  TBT |  FCP | Speed Index | Total KiB | JS KiB | JS CPU ms |
| --------------- | ------- | --: | ----: | ---: | ----: | ---: | ---: | ----------: | --------: | -----: | --------: |
| /               | Mobile  |   3 |    70 | 1728 | 0.002 | 2025 | 1728 |        3488 |       843 |    353 |      1969 |
| /               | Desktop |   3 |    93 |  457 | 0.035 |  197 |  457 |        1440 |       846 |    353 |       491 |
| /fa             | Mobile  |   3 |    70 | 1743 | 0.002 | 1677 | 1743 |        3793 |       758 |    353 |      2080 |
| /fa             | Desktop |   3 |    70 | 1013 | 0.013 |  529 | 1013 |        2093 |       760 |    353 |       458 |
| /blog           | Mobile  |   3 |    65 | 4603 | 0.002 |  617 | 1903 |        3864 |       899 |    320 |       863 |
| /blog           | Desktop |   1 |    98 |  353 | 0.053 |  100 |  353 |        1087 |       860 |    255 |       191 |
| /fa/blog        | Mobile  |   3 |    68 | 4389 | 0.002 |  641 | 1689 |        3548 |       919 |    320 |       806 |
| /fa/blog        | Desktop |   1 |    93 |  929 | 0.019 |  153 |  929 |        1627 |       880 |    255 |       193 |
| English article | Mobile  |   2 |    66 | 4452 | 0.002 |  733 | 1452 |        3071 |       842 |    327 |      1006 |
| English article | Desktop |   1 |    96 | 1084 | 0.001 |   67 |  880 |        1309 |       809 |    262 |       179 |
| Persian article | Mobile  |   2 |    64 | 4571 | 0.002 |  726 | 1650 |        3863 |       792 |    327 |       940 |
| Persian article | Desktop |   1 |    96 | 1091 | 0.001 |   79 |  621 |        1352 |       726 |    262 |       213 |
| /resume         | Mobile  |   2 |    80 | 1249 | 0.002 | 1045 | 1249 |        2938 |       719 |    288 |       555 |
| /resume         | Desktop |   1 |    99 |  280 | 0.006 |   40 |  280 |        1438 |       719 |    288 |       127 |
| /fa/resume      | Mobile  |   2 |    81 | 1187 | 0.003 |  955 | 1187 |        3026 |       758 |    288 |       638 |
| /fa/resume      | Desktop |   1 |    82 | 1843 | 0.009 |   49 | 1843 |        1868 |       760 |    288 |       153 |

مقالهٔ نمونه در هر دو زبان مطلب منتشرشدهٔ یکسانی است.

```text
/blog/career-change-huawei-to-frontend
/fa/blog/career-change-huawei-to-frontend
```

### تغییرپذیری و تفاوت دو زبان

- LCP موبایل دو خانه در تمام تکرارها بین 1,554 و 1,941 ms بود. بازهٔ TBT خانهٔ انگلیسی 1,327–2,706 ms و خانهٔ فارسی 1,592–1,753 ms بود. بازهٔ LCP فهرست موبایل انگلیسی 4,321–5,617 ms و فارسی 3,902–4,409 ms بود. بازهٔ دو مقاله به‌ترتیب 4,373–4,530 و 4,380–4,763 ms بود.
- امتیاز دسکتاپ خانهٔ انگلیسی 78–98 و خانهٔ فارسی 69–91 بود. هم زمان اولین بایت و هم کار نخ اصلی میان اجراهای دسکتاپ تغییر کرد. شاخص benchmark میزبان در کل سری حدود 2,189–2,854 بود. این نوسان مقایسهٔ امتیاز دو زبان را محدود می‌کند. TBT موبایل رزومه نیز دامنهٔ وسیع داشت. بازهٔ انگلیسی 501–1,588 ms و فارسی 446–1,463 ms بود.
- بیشترین CLS در ۳۲ اجرا **0.053** در دسکتاپ فهرست انگلیسی بود. Lighthouse در چند نمونه جابه‌جایی‌های کوچک هدر و Hero را به بارگیری قلم مرتبط کرد. RTL فارسی و LTR انگلیسی برای هشت پاسخ HTML تأیید شد. LCP کندتر وبلاگ موبایل در هر دو زبان دیده شد.

## دادهٔ میدانی و خطاهای ابزار

- **CrUX:** درخواست‌های History API از رابط عمومی CrUX Vis برای origin و هر هشت URL در پروفایل‌های PHONE و DESKTOP، پاسخ **404 / NOT_FOUND — chrome ux report data not found** دادند. P75 میدانی LCP، CLS و **INP** در دسترس نبود. وضعیت قبولی Core Web Vitals قابل تعیین نیست. [پوشش CrUX Vis](https://developer.chrome.com/docs/crux/vis) · [آستانه‌های CWV](https://web.dev/articles/vitals)
- **PageSpeed Insights:** دو تلاش API بدون کلید برای خانهٔ انگلیسی HTTP 403 دادند. رابط عمومی در هر دو پروفایل پس از شروع تحلیل پیام **Unable to resolve** داد. Chrome محلی هر هشت مسیر تولید را با 200 باز کرد. علت پیام PSI از این شواهد معلوم نیست. [تفکیک دادهٔ آزمایشگاهی و میدانی PSI](https://developers.google.com/speed/docs/insights/v5/about)
- **TBT** معیار آزمایشگاهی کار مسدودکنندهٔ نخ اصلی هنگام بارگذاری است. INP فقط از دادهٔ واقعی کاربران گزارش می‌شود. [تعریف TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time)

## تشخیص‌های تأییدشده

- **HTML و payload.** سند خانه‌ها 330–334 KiB بازشده و حدود 61–62 KiB منتقل‌شده بود. payload درون‌خطی هر خانه کمتر از 2 KiB بود. DOM در trace به حدود ۱٬۸۳۰ عنصر رسید. در فهرست‌ها و مقاله‌ها، HTML بازشده 205–289 KiB و دادهٔ Nuxt حدود 138–197 KiB، معادل 64–72٪ سند، بود. در سند فهرست‌ها ۷ و ۸ فیلد بدنه و در دو مقاله ۱۰ و ۱۱ فیلد بدنه دیده شد. کد فهرست رکوردهای کامل محتوا را می‌گیرد و زمان مطالعه را از بدنه محاسبه می‌کند. صفحهٔ مقاله رکوردهای ناوبری و ترجمه را هم در async data می‌گیرد. سند رزومه‌ها 46–48 KiB بازشده بود. [فهرست وبلاگ](../app/pages/blog/index.vue#L64) · [دادهٔ مقاله](../app/pages/blog/%5B...slug%5D.vue#L37) · [زمان مطالعه](../app/composables/useBlog.ts#L7) · [تنظیم payload](../nuxt.config.ts#L18)
- **جاوااسکریپت، CSS و hydration.** در پایلوت موبایل خانهٔ انگلیسی، ورودی مشترک JS حدود 173 KiB انتقال داشت. Lighthouse برای همان اجرا حدود 52 KiB کد اجرا‌نشده در فایل ورودی تخمین زد. CSS ورودی حدود 52 KiB و در مسیر render-blocking بود. اجرای اول موبایل دو خانه حدود 6.1–6.7 ثانیه کار نخ اصلی و 2.00–2.35 ثانیه style/layout نشان داد. بخش‌های پایین صفحه import پویا دارند و در مصرف‌کننده شرط دیدپذیری برای hydrate یا fetch اولیهٔ GitHub دیده نشد. [ساخت خانه](../app/pages/index.vue#L1)
- **Hero و تصاویر.** عنصر LCP موبایل خانه‌ها متن بود. آواتار در نمونهٔ خانه حدود 4.5 KiB و AVIF بود. تصاویر پروژه‌ها lazy هستند. Lighthouse در پایلوت حدود 8 KiB فرصت کاهش لوگوی 180×180 با اندازهٔ نمایشی 28×28 CSS pixel تشخیص داد. تصویر شاخص فهرست‌ها و مقاله‌ها WebP بود و ظرف نسبت ثابت داشت. شروع درخواست تصویر LCP فهرست‌ها در شش trace موبایل 423–1,922 ms پس از TTFB بود. [Hero](../app/components/portfolio/Hero.vue#L301) · [تصاویر پروژه](../app/components/portfolio/ProjectsList.vue#L63) · [کارت وبلاگ](../app/components/blog/BlogCard.vue#L5) · [تصویر مقاله](../app/components/blog/BlogPost.vue#L22)
- **فونت و CLS.** در ردیف‌های جدول 259–386 KiB فونت منتقل شد. هر اجرای سرد حدود 136 KiB برای سه preload سراسری Roobert دریافت کرد. فارسی Vazirmatn متغیر را نیز preload می‌کند و رزومهٔ فارسی قلم‌های اختصاصی خودش را دارد. Chrome در جست‌وجوی font face روی هر هشت مسیر، هر سه وزن Roobert را unloaded گزارش کرد. نمونه‌های glyph در عنوان و متن از قلم‌های فعال هر زبان بودند. [preload ریشه](../app/app.vue#L28) · [قلم فارسی](../app/assets/css/main.css#L56) · [قلم رزومه](../app/components/resume/ResumePreview.vue#L48)
- **شبکه، GitHub و کش.** چهار درخواست مرورگری خارجی در سه اجرا ثبت شد. همه fallback آیکون به Iconify و هرکدام کمتر از 1 KiB بودند. در waterfallها درخواست Plausible یا Vercel Analytics مشاهده نشد. در ۱۲ اجرای خانه، درخواست هم‌مبدأ GitHub با 200 پاسخ گرفت و 1.91–4.95 ثانیه پس از شروع navigation آغاز شد. مدت مشاهده‌شدهٔ آن 450–922 ms و وزن انتقال حدود 1.4 KiB بود. دو GET مستقیم نیز تقویم معتبر، Vercel MISS و age 0 داشتند. محدودیت نرخ در نمونهٔ تولید رخ نداد. سورس سرور خطای upstream را منتقل می‌کند و مشتری پیام جایگزین نشان می‌دهد. همهٔ سندهای HTML و CSS ورودی در نمونه با Brotli آمدند. HTTP/2 در مرورگر مشاهده شد. فایل‌های دارای هش Nuxt در نمونه یک سال immutable بودند. هدر عمومی HTML وبلاگ no-store بود و همان پاسخ‌ها نشانگر داخلی Vercel HIT هم داشتند. [mount ویجت](../app/components/portfolio/GitHubActivity.vue#L285) · [handler سرور](../server/api/github/contributions.ts#L40) · [هدرهای Vercel](../vercel.json#L12)

## اولویت‌های پیشنهادی برای ST-04

### ۱. درخواست زودتر تصویر اصلی فهرست وبلاگ در موبایل

- **شدت و اثر.** بالا. میانهٔ LCP فهرست انگلیسی 4,603 ms و فارسی 4,389 ms بود. در هر شش اجرای موبایل، LCP تصویر کارت اول بود. تصویر در HTML اولیه وجود داشت، اما lazy بود و fetch priority بالا نداشت. با شبکهٔ واقعی ثبت‌شده، فاصلهٔ TTFB تا شروع درخواست 423–1,922 ms بود. دو مقالهٔ نمونه نیز LCP تصویری داشتند، ولی تصویر مقاله از ابتدا eager بود و فاصلهٔ شروع درخواست 80–272 ms بود. [کارت فهرست](../app/components/blog/BlogCard.vue#L5) · [ترتیب کارت‌ها](../app/pages/blog/index.vue#L19) · [تصویر مقاله](../app/components/blog/BlogPost.vue#L22)
- **کوچک‌ترین اصلاح.** پراپ اولویت را فقط برای کارت اول هر فهرست در بارگذاری اولیه و به شرط داشتن تصویر ارسال کنید. برای همان تصویر eager و fetchpriority بالا اعمال شود. رفتار lazy سایر کارت‌ها و نسبت ابعاد فعلی حفظ شود.
- **انتظار و اطمینان.** اطمینان بالا به اینکه کشف زودتر رخ می‌دهد و متوسط به بزرگی کاهش LCP. تأخیر مشاهده‌شده سقف تقریبی فرصتی است که فقط به زمان آغاز درخواست مربوط می‌شود. کاهش 500 ms در میانهٔ LCP معیار پیشنهادی پذیرش است، نه پیش‌بینی نتیجه.
- **ریسک و بازآزمایی.** درخواست با اولویت بالا می‌تواند با قلم یا CSS رقابت کند. هر فهرست را با همان پروفایل سه بار پیش و پس از تغییر بسنجید. زمان شروع تصویر LCP، FCP، LCP، TBT و bytes را مقایسه کنید. فیلتر، نبود تصویر، lazy بودن کارت‌های بعدی، دسکتاپ و RTL را هم بررسی کنید.

### ۲. حذف preload سه وزن بلااستفادهٔ Roobert

- **شدت و اثر.** متوسط و سراسری. در هر ۳۲ اجرای سرد، سه فایل Roobert حدود 136 KiB انتقال داشتند. در بررسی CDP روی هر هشت مسیر، هر سه font face وضعیت unloaded داشتند. نمونه‌های glyph فارسی با Vazirmatn، و نمونه‌های انگلیسی با Geist یا Space Grotesk رندر شدند. [preloadهای سراسری](../app/app.vue#L28) · [تعریف قلم‌ها](../app/assets/css/main.css#L21)
- **کوچک‌ترین اصلاح.** فقط سه link preload را از ریشه بردارید. تعریف font face، استک قلم، قلم فارسی و تنظیمات چاپ یا PDF را حفظ کنید.
- **انتظار و اطمینان.** اطمینان بالا به کاهش حدود 136 KiB و سه درخواست در cold load مسیرهای بررسی‌شده، به شرط حفظ وضعیت عدم مصرف. اثر LCP و CLS باید اندازه‌گیری شود. ریسک اصلی ظاهر شدن fallback در حالت یا مسیری است که در ممیزی نمونه‌برداری نشده است.
- **بازآزمایی.** در هر هشت مسیر، Network و قلم واقعی عنوان و متن را در EN و FA و هر دو theme مقایسه کنید. پس از تغییر تأییدشده، رگرسیون رزومهٔ HTML و PDF را هم با آزمون محلی انتشار و Puppeteer اجرا کنید.

### جمع‌بندی محدوده

ST-04 می‌تواند از اصلاح تصویر فهرست شروع کند و حذف preload را در تغییر جداگانه بسنجد تا اثر دو اصلاح قابل تفکیک باشد. برای CLS و چیدمان دسکتاپ و رزومه، با شواهد فعلی حفظ رفتار موجود پیشنهاد می‌شود.

TBT موبایل خانه بالاست. با این حال، علت به یک جزء قابل اصلاح محدود نشد. در دو آزمون جداگانهٔ CDP، برای هر زبان دو بار حالت عادی و دو بار حالت آزمایشی اجرا شد. CPU به‌صورت واقعی 4× و شبکه بدون throttling مصنوعی بود. یک تست فقط لایهٔ متحرک ستاره‌ها را در مرورگر پنهان کرد. تست دیگر درخواست اولیهٔ GitHub را در مرورگر تا انتهای پنجرهٔ نمونه‌گیری نگه داشت. معیار مقایسه سهم وظایف طولانی بیش از 50 ms در 6.5 ثانیهٔ اول بود. روی خانهٔ انگلیسی، بازهٔ سهم وظایف طولانی در حالت عادی آزمون ستاره‌ها 1,019–1,795 ms و در حالت پنهان 1,921–1,991 ms بود. در آزمون GitHub، دامنه‌های حالت عادی و تعویق همپوشانی داشتند. در فارسی بهبود تکرارپذیر نبود. این پروب‌ها سهم کد mount را جدا نمی‌کنند و جایگزین TBT خود Lighthouse نیستند. نتیجهٔ فعلی برای تغییر پس‌زمینه یا مسیر GitHub کفایت نمی‌کند. [پس‌زمینهٔ خانه](../app/components/backgrounds/StarsBackground.vue#L38) · [ویجت GitHub](../app/components/portfolio/GitHubActivity.vue#L285)

## گزارش‌ها و بازتولید

### بازتولید جدول از دادهٔ ذخیره‌شده

[دادهٔ ۳۲ اجرای Lighthouse](performance/st03-lighthouse-runs.json) از فایل اصلی metrics.json در پوشهٔ ممیزی استخراج شده است. هش SHA-256 فایل مبدأ، نام گزارش و زمان UTC هر اجرا، نسخهٔ ابزارها و تنظیمات هر پروفایل در JSON ثبت شده‌اند. مقدارهای هر اجرا با گزارش JSON همان اجرای Lighthouse تطبیق داده شدند. زمان‌ها برحسب میلی‌ثانیه، انتقال برحسب بایت و امتیاز بر مقیاس ۱۰۰ ذخیره شده‌اند. حجم کل از audit مربوط به total-byte-weight و حجم JS از مجموع انتقال منابع Script آمده است. زمان CPU جاوااسکریپت از audit مربوط به bootup-time است.

فرمان زیر را از ریشهٔ مخزن اجرا کنید. برای هر ترکیب مسیر و پروفایل، میانهٔ هر ستون را با دقت اصلی محاسبه می‌کند، بایت را به KiB تبدیل می‌کند و سپس نتیجهٔ گرد‌شده را با جدول گزارش تطبیق می‌دهد. این بررسی آفلاین و مستقل از فایل‌های موقت است.

```powershell
@'
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runs } = JSON.parse(readFileSync("docs/performance/st03-lighthouse-runs.json", "utf8"));
const markdown = readFileSync("docs/phase01-performance-baseline.md", "utf8");
const table = markdown.split(/\r?\n/)
  .filter(line => /^\| (?:\/|English article |Persian article )/.test(line))
  .map(line => line.slice(1, -1).split("|").map(cell => cell.trim()));
const articlePaths = {
  "English article": "/blog/career-change-huawei-to-frontend",
  "Persian article": "/fa/blog/career-change-huawei-to-frontend",
};
const columns = [
  "score", "lcpMs", "cls", "tbtMs", "fcpMs", "speedIndexMs",
  "totalTransferBytes", "javascriptTransferBytes", "javascriptCpuMs",
];

assert.equal(runs.length, 32);
assert.equal(new Set(runs.map(({ route, device, run }) => [route, device, run].join(" "))).size, 32);
assert.equal(table.length, 16);
assert.equal(new Set(table.map(([name, profile]) => [name, profile].join(" "))).size, 16);

for (const [name, profile, count, ...reported] of table) {
  const route = articlePaths[name] ?? name;
  const rows = runs.filter(run => run.route === route && run.device === profile.toLowerCase());
  assert.ok(rows.length, name + " " + profile);
  assert.equal(rows.length, Number(count), name + " " + profile);
  const actual = columns.map(column => {
    const values = rows.map(({ metrics }) => metrics[column]);
    assert.ok(values.every(Number.isFinite), column);
    values.sort((left, right) => left - right);
    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    if (column === "cls") return median.toFixed(3);
    return String(Math.round(column.endsWith("Bytes") ? median / 1024 : median));
  });
  assert.deepEqual(actual, reported, name + " " + profile);
}
console.log("All 16 report rows match the 32 preserved runs.");
'@ | node --input-type=module
```

### فایل‌های خام و اجرای دوبارهٔ ممیزی

آثار حجیم در پوشهٔ موقت خارج از مخزن ذخیره شدند. مرور گزارش‌های HTML با Chrome یا [Lighthouse Report Viewer](https://googlechrome.github.io/lighthouse/viewer/) ممکن است. HTML هر اجرا شواهد تصویری خود را دارد. دو تصویر واقعیِ CDP خانه نیز بررسی بصری شدند.

```text
C:/Users/aliar/AppData/Local/Temp/nuxt-portfolio-ST03-50aafbb0
reports/*.report.json            32 Lighthouse results
reports/*.report.html            32 inspectable Lighthouse reports
reports/*-0.trace.json           Selected mobile traces
reports/*-0.devtoolslog.json      Matching DevTools network logs
tools/package-lock.json          Exact audit dependencies
metrics.json                     Per-run metrics and diagnostics
http-inspection.json             HTML, inline payload, headers and GitHub GETs
field-inspection.json            PSI results and CrUX response status
cdp-inspection.json              Fonts and browser-only stars probe
cdp-github-delay.json             Browser-only GitHub delay probe
home-en-cdp.png / home-fa-cdp.png  EN and FA mobile screenshots
```

برای بازتولید ماتریس، Node.js 22.23.4 و Chrome 157.0.8103.79 را انتخاب کنید. کد زیر Lighthouse را در پوشهٔ موقت جداگانه نصب می‌کند. خروجی هر اجرا را پیش از استفاده از نظر URL نهایی، پروفایل و runtimeError بررسی کنید.

```powershell
$auditRoot = Join-Path $env:TEMP ('portfolio-st03-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
$reports = Join-Path $auditRoot 'reports'
$null = New-Item -ItemType Directory -Path $reports -Force
$env:CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
volta run --node 22.23.4 npm --prefix (Join-Path $auditRoot 'tools') --cache (Join-Path $auditRoot 'npm-cache') install --ignore-scripts --no-audit --no-fund --save-exact lighthouse@13.6.0
$lh = Join-Path $auditRoot 'tools/node_modules/lighthouse/cli/index.js'
$routes = [ordered]@{
  'home-en' = '/'
  'home-fa' = '/fa'
  'blog-en' = '/blog'
  'blog-fa' = '/fa/blog'
  'article-en' = '/blog/career-change-huawei-to-frontend'
  'article-fa' = '/fa/blog/career-change-huawei-to-frontend'
  'resume-en' = '/resume'
  'resume-fa' = '/fa/resume'
}
foreach ($round in 1..3) {
  foreach ($key in $routes.Keys) {
    foreach ($device in @('mobile', 'desktop')) {
      if ($round -eq 2 -and $device -eq 'desktop' -and $key -notlike 'home-*') { continue }
      if ($round -eq 3 -and -not ($key -like 'home-*' -or ($device -eq 'mobile' -and $key -like 'blog-*'))) { continue }
      $prefix = Join-Path $reports "$key-$device-r$round"
      $url = 'https://aliarghyani.ir' + $routes[$key]
      $flags = @('--only-categories=performance', '--throttling-method=simulate', '--locale=en-US',
        '--output=json', '--output=html', "--output-path=$prefix",
        '--chrome-flags=--headless=new --disable-extensions --lang=en-US')
      if ($device -eq 'desktop') { $flags += '--preset=desktop' } else { $flags += '--form-factor=mobile' }
      if ($round -eq 1 -and $device -eq 'mobile' -and $key -in @('home-en', 'home-fa', 'blog-en', 'article-en', 'resume-en')) { $flags += '--save-assets' }
      volta run --node 22.23.4 node $lh $url @flags *> "$prefix.log"
      if ($LASTEXITCODE -ne 0) { throw "Lighthouse failed for $url ($device, round $round)" }
    }
  }
}
```

برای بررسی‌های تکمیلی از پوشهٔ مخزن، فایل‌های probe را از پوشهٔ موقت این گزارش با Node اجرا کنید. برای اجرای پروب‌های مرورگری، ST03_REPO را برابر مسیر مخزن و CHROME_PATH را برابر مسیر Chrome قرار دهید. summarize.mjs گزارش‌ها را از پوشهٔ reports کنار خودش می‌خواند.

```text
summarize.mjs
inspect-http.mjs
inspect-field.mjs
inspect-cdp.mjs
inspect-github-delay.mjs
```

برای دادهٔ میدانی، در CrUX Vis ابتدا origin و سپس هر URL را با Phone و Desktop باز کنید. HAR یا خروجی Network باید درخواست queryHistoryRecord با پارامتر مربوطه را نشان دهد. برای قیاس آزمایشگاهی دوباره URL را در PSI عمومی در هر دو پروفایل امتحان کنید. [CrUX Vis](https://cruxvis.withgoogle.com/) · [PageSpeed Insights](https://pagespeed.web.dev/)

## اعتبارسنجی و محدودیت‌ها

- بررسی انتشار تولید با pnpm check:production، هر شش حالت را گذراند. گزارش‌های Lighthouse برای هر اجرا با URL و دستگاه مورد انتظار مطابقت داشتند و خطای runtime ثبت نشد. هر ۱۶ ردیف جدول با دادهٔ ذخیره‌شده تطبیق داده شد. اصلاح مستندات با همان اجراهای قبلی انجام شد.
- این آزمایش Chrome سرد، تم پیش‌فرض تیره و یک میزبان را پوشش می‌دهد. دستگاه فیزیکی موبایل و warm navigation سنجیده نشدند. یک اجرای دسکتاپ برای هر مسیر غیر از خانه برای استنتاج توزیع کافی نیست. زمان‌های آزمایشگاهی ممکن است با شرایط لبه، شبکه و CPU تغییر کنند.
- SHA بالا مبنای بررسی سورس است. سنجش HTTP و مرورگر روی دامنهٔ عمومی اجرا شد و SHA استقرار Vercel از داشبورد بررسی نشد. تست مصنوعی برای ایجاد rate limit، اندازه‌گیری PDF دانلودی یا افزودن تحلیل‌گر انجام نشد.
