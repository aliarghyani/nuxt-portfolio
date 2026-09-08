import puppeteer from "puppeteer";
import type { Browser } from "puppeteer";

export default defineEventHandler(async (event) => {
  let browser: Browser | null = null;

  try {
    const requestUrl = getRequestURL(event);
    const baseUrl = requestUrl.origin;
    const resumeUrl = `${baseUrl}/resume?print=true`;

    console.log("[PDF API] Generating from:", resumeUrl);

    // Serverless Chromium is Linux-only; local Windows/macOS previews use Puppeteer.
    const useLocalBrowser =
      process.platform !== "linux" || process.env.NODE_ENV === "development";

    if (useLocalBrowser) {
      browser = await puppeteer.launch({
        headless: true,
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

    // Wait for Vue hydration and v-html rendering to complete
    await page.waitForSelector("strong", { timeout: 5000 }).catch(() => {
      console.log("[PDF API] No strong tags found, continuing anyway");
    });

    // Additional wait to ensure all dynamic content is rendered
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    const query = getQuery(event);
    const now = new Date();
    const year = now.getFullYear();
    const monthName = now.toLocaleString("en-US", { month: "long" });
    const filename =
      (query.filename as string) ||
      `Ali_Arghyani_Resume_${monthName.replace(/\s+/g, "")}_${year}.pdf`;
    const download = query.download === "true";

    setResponseHeaders(event, {
      "Content-Type": "application/pdf",
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
