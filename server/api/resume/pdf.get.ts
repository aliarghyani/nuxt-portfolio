import puppeteer from "puppeteer";
import { existsSync } from "node:fs";
import { resumeFilename } from "~~/shared/utils/resume";
import type { Browser } from "puppeteer";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (
    query.locale !== undefined &&
    query.locale !== "en" &&
    query.locale !== "fa"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsupported resume locale",
    });
  }
  const locale = query.locale === "fa" ? "fa" : "en";
  let browser: Browser | null = null;

  try {
    const requestUrl = getRequestURL(event);
    const baseUrl = requestUrl.origin;
    const resumeUrl = `${baseUrl}${locale === "fa" ? "/fa" : ""}/resume?print=true`;

    console.log("[PDF API] Generating from:", resumeUrl);

    // Serverless Chromium is Linux-only; local Windows/macOS previews use Puppeteer.
    const useLocalBrowser =
      process.platform !== "linux" || process.env.NODE_ENV === "development";

    if (useLocalBrowser) {
      const executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath();
      browser = await puppeteer.launch({
        headless: true,
        ...(existsSync(executablePath)
          ? { executablePath }
          : { channel: "chrome" as const }),
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } else {
      const chromium = await import("@sparticuz/chromium");
      const puppeteerCore = await import("puppeteer-core");
      browser = await puppeteerCore.default.launch({
        args: chromium.default.args,
        executablePath: await chromium.default.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();

    // Set viewport to A4 dimensions (210mm x 297mm at 96 DPI)
    await page.setViewport({
      width: 794, // 210mm
      height: 1123, // 297mm
    });

    // Enable print media type BEFORE loading page
    await page.emulateMediaType("print");

    const response = await page.goto(resumeUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    if (!response || !response.ok()) {
      throw new Error(`Failed to load: ${response?.status()}`);
    }

    await page.waitForSelector("[data-resume-ready]");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
    });

    // Inject critical CSS fixes for PDF generation - balanced spacing like web version
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 1cm;
        }
        
        * { 
          box-shadow: none !important;
          word-break: normal !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -ms-hyphens: none !important;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        
        html, body { 
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          min-height: auto !important;
        }
        
        .resume-wrapper {
          background: white !important;
          padding: 0 !important;
          display: block !important;
          margin: 0 !important;
        }
        
        .resume-container {
          box-shadow: none !important;
          max-width: none !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .resume-content {
          padding: 1.2rem !important;
        }
        
        /* Balanced spacing for sections - fits exactly 2 pages with better readability */
        section {
          margin-bottom: 1.85rem !important;
          page-break-inside: auto !important;
          break-inside: auto !important;
        }
        
        section:last-child {
          margin-bottom: 0 !important;
        }
        
        /* Section titles */
        section h2 {
          margin-bottom: 0.85rem !important;
          padding-bottom: 0.38rem !important;
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Work experience job blocks */
        section > div {
          margin-bottom: 1.15rem !important;
        }
        
        section > div:last-child {
          margin-bottom: 0 !important;
        }
        
        /* Bullet lists - balanced breathing room */
        ul {
          margin-top: 0.58rem !important;
        }
        
        ul li {
          margin-bottom: 0.38rem !important;
          line-height: 1.52 !important;
        }
        
        strong {
          font-weight: 700 !important;
        }
        
        /* Summary paragraph - good line height for readability */
        section > p {
          line-height: 1.82 !important;
        }
      `,
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });

    // Only safe ASCII filenames enter the HTTP header; locale remains explicit.
    const filename =
      typeof query.filename === "string" &&
      /^[\w.-]{1,150}\.pdf$/.test(query.filename)
        ? query.filename
        : resumeFilename(locale);
    const download = query.download === "true";

    setResponseHeaders(event, {
      "Content-Type": "application/pdf",
      "Content-Language": locale,
      "Cache-Control": "no-store",
      // inline = show in browser, attachment = force download
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
    });

    return pdf;
  } catch (error) {
    console.error("PDF generation failed:", error);
    setResponseStatus(event, 500);
    return {
      error: "PDF generation failed",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
