# Epic Technical Specification: PDF Export

Date: 2025-12-01  
Author: ali  
Epic ID: 3  
Status: Draft

---

## Overview

Epic 3 delivers the PDF Export functionality for the Resume Export feature. This epic implements server-side PDF generation using Puppeteer, enabling users to download their resume as a high-quality, ATS-compatible PDF that matches the web preview exactly (WYSIWYG approach).

The implementation leverages the existing `/resume` page (completed in Epic 2) as the source for PDF generation. Puppeteer navigates to `/resume?print=true`, captures the page, and returns a PDF buffer. A client-side composable handles the download flow with proper loading states and error handling.

**Key Value:** One-click PDF download that produces pixel-perfect, ATS-friendly resumes in under 3 seconds.

## Objectives and Scope

**In Scope:**
- Server-side PDF generation API route (`/api/resume/pdf`)
- Puppeteer integration for headless Chrome rendering
- Client-side composable for download logic (`useResumePdf`)
- Download button integration with loading states
- Error handling with toast notifications
- Vercel serverless deployment configuration

**Out of Scope:**
- Multiple export formats (DOCX, plain text) - future
- Custom filename input - uses fixed format
- Resume customization UI - future
- Persian language PDF - future epic
- Multiple templates - future

## System Architecture Alignment

**Architecture Decisions Referenced:**
- ADR-001: Server-side PDF Generation (Puppeteer chosen over client-side libraries)
- Novel Pattern: WYSIWYG PDF Export (same component for web and PDF)
- API Pattern: Nuxt Server Route

**Components Created:**
- `server/api/resume/pdf.get.ts` - API endpoint
- `app/composables/useResumePdf.ts` - Download logic

**Components Modified:**
- `app/components/resume/ResumeDownloadButton.vue` - Connect to composable

**Dependencies on Epic 2:**
- `/resume` page must exist and render correctly
- `?print=true` query parameter must hide download button
- Print styles must be properly configured

## Detailed Design

### Services and Modules

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|---------------|--------|---------|-------|
| `server/api/resume/pdf.get.ts` | Generate PDF from resume page | GET request | PDF binary buffer | Story 3.1 |
| `app/composables/useResumePdf.ts` | Handle download flow | User click | File download | Story 3.2 |
| `ResumeDownloadButton.vue` | Trigger download, show loading | isPrintMode prop | Click event | Story 3.3 |

### Data Models and Contracts

**No new data models required.** Epic 3 uses existing:
- `Resume` interface from `app/types/resume.ts`
- `resumeData` from `app/data/resume.en.ts`
- `useResumeData()` composable for `getPdfFilename()`

**PDF Output Contract:**
- Format: A4 (210mm × 297mm)
- Content-Type: `application/pdf`
- Filename: `Ali_Arghyani_Resume.pdf` (from `getPdfFilename()`)
- File size: < 500KB target

### APIs and Interfaces

**GET /api/resume/pdf**

```typescript
// Request
GET /api/resume/pdf

// Response (Success - 200)
Headers:
  Content-Type: application/pdf
  Content-Disposition: attachment; filename="Ali_Arghyani_Resume.pdf"
Body: <PDF binary buffer>

// Response (Error - 500)
Headers:
  Content-Type: application/json
Body: {
  "error": "PDF generation failed",
  "message": "<error details>"
}
```

**useResumePdf Composable Interface:**

```typescript
interface UseResumePdf {
  isGenerating: Ref<boolean>
  downloadPdf: () => Promise<void>
}

function useResumePdf(): UseResumePdf
```

### Workflows and Sequencing

**PDF Download Flow:**

```
User clicks "Download PDF" button
         │
         ▼
┌─────────────────────────────────┐
│ ResumeDownloadButton.vue        │
│ - Calls downloadPdf()           │
│ - Shows loading spinner         │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ useResumePdf.ts                 │
│ 1. Set isGenerating = true      │
│ 2. Fetch /api/resume/pdf (blob) │
│ 3. Create object URL            │
│ 4. Create <a> element           │
│ 5. Set download filename        │
│ 6. Trigger click                │
│ 7. Revoke object URL            │
│ 8. Set isGenerating = false     │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ server/api/resume/pdf.get.ts    │
│ 1. Get base URL from request    │
│ 2. Launch Puppeteer browser     │
│ 3. Navigate to /resume?print=true│
│ 4. Wait for networkidle0        │
│ 5. Generate PDF (A4, background)│
│ 6. Close browser                │
│ 7. Return PDF with headers      │
└─────────────────────────────────┘
         │
         ▼
Browser downloads PDF file
```

**Error Flow:**

```
API returns error (500)
         │
         ▼
┌─────────────────────────────────┐
│ useResumePdf.ts                 │
│ 1. Catch error                  │
│ 2. Show toast notification      │
│ 3. Log error to console         │
│ 4. Set isGenerating = false     │
└─────────────────────────────────┘
```

## Non-Functional Requirements

### Performance

| Metric | Target | Strategy |
|--------|--------|----------|
| PDF generation time | < 3 seconds | Puppeteer with networkidle0 |
| PDF file size | < 500KB | Text-only, no images, optimized fonts |
| Memory usage | < 512MB | Single browser instance, close after use |
| API timeout | 10 seconds max | Vercel function config |

**Optimization Strategies:**
- Use `networkidle0` to ensure fonts are loaded
- Close browser immediately after PDF generation
- No external resource loading in PDF
- Minimal page content (print mode hides extras)

### Security

- **Sandboxed execution:** Puppeteer runs in sandboxed mode
- **No user input:** PDF generation uses server-controlled data only
- **Timeout protection:** 10 second max duration prevents resource exhaustion
- **No external resources:** PDF doesn't load external URLs
- **HTTPS required:** Production deployment uses HTTPS only

### Reliability/Availability

- **Graceful degradation:** If PDF fails, user sees error toast and can retry
- **Timeout handling:** Long-running requests are terminated at 10 seconds
- **Browser cleanup:** Browser instance always closed in finally block
- **Retry capability:** User can click download again after error

### Observability

- **Console logging:** Errors logged to console for debugging
- **Toast notifications:** User-facing error messages
- **Loading state:** Visual feedback during generation
- **Error details:** API returns error message for debugging

## Dependencies and Integrations

**New Dependencies:**

| Package | Version | Purpose | Environment |
|---------|---------|---------|-------------|
| puppeteer | ^23.x | Local PDF generation | Development |
| puppeteer-core | ^23.x | Serverless PDF generation | Production |
| @sparticuz/chromium | ^131.x | Chromium for Vercel | Production |

**Installation:**

```bash
# Development (full Puppeteer with bundled Chromium)
pnpm add puppeteer

# Production (Vercel serverless)
pnpm add puppeteer-core @sparticuz/chromium
```

**Internal Dependencies:**
- `app/pages/resume.vue` - Source page for PDF
- `app/composables/useResumeData.ts` - `getPdfFilename()` helper
- `@nuxt/ui` - `useToast()` for notifications, `UButton` for loading state

**Configuration:**

```json
// vercel.json
{
  "functions": {
    "server/api/resume/pdf.get.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

## Acceptance Criteria (Authoritative)

### AC1: PDF Generation API
**Given** a GET request to `/api/resume/pdf`  
**When** the server processes the request  
**Then** it returns a PDF binary with correct headers  
**And** Content-Type is `application/pdf`  
**And** Content-Disposition includes filename `Ali_Arghyani_Resume.pdf`

### AC2: PDF Content Quality
**Given** the PDF is generated  
**When** I open the PDF  
**Then** it matches the web preview exactly (WYSIWYG)  
**And** text is selectable and copy-able (ATS-compatible)  
**And** fonts are embedded correctly (Inter)  
**And** colors are preserved (blue headers, white background)

### AC3: PDF Dimensions
**Given** the PDF is generated  
**When** I check the page size  
**Then** it is A4 format (210mm × 297mm)  
**And** margins are consistent with web preview

### AC4: Generation Performance
**Given** I request PDF generation  
**When** the process completes  
**Then** it takes less than 3 seconds  
**And** PDF file size is less than 500KB

### AC5: Download Composable
**Given** I call `downloadPdf()` from the composable  
**When** the function executes  
**Then** it fetches the PDF as blob  
**And** triggers browser download  
**And** uses correct filename from `getPdfFilename()`

### AC6: Loading State
**Given** I click the download button  
**When** PDF generation is in progress  
**Then** the button shows loading spinner  
**And** the button is disabled  
**And** loading clears when complete

### AC7: Error Handling
**Given** PDF generation fails  
**When** the error is caught  
**Then** a toast notification appears with error message  
**And** the button returns to normal state  
**And** error is logged to console

### AC8: Button Integration
**Given** the download button is connected to the composable  
**When** I click it  
**Then** `downloadPdf()` is called  
**And** loading state is bound to button  
**And** button works correctly after error

### AC9: Print Mode Compatibility
**Given** Puppeteer navigates to `/resume?print=true`  
**When** the page renders  
**Then** download button is hidden  
**And** all content renders correctly  
**And** print styles are applied

### AC10: Vercel Deployment
**Given** the API is deployed to Vercel  
**When** I request PDF generation  
**Then** it works with serverless Chromium  
**And** respects memory and timeout limits

## Traceability Mapping

| AC | Spec Section | Components | FR | Test Idea |
|----|--------------|------------|-----|-----------|
| AC1 | APIs and Interfaces | `pdf.get.ts` | FR10, FR12 | Request API, verify headers |
| AC2 | Data Models | `pdf.get.ts` | FR11, FR12 | Open PDF, check text selection |
| AC3 | Data Models | `pdf.get.ts` | FR11 | Check PDF page dimensions |
| AC4 | Performance | `pdf.get.ts` | FR14 | Measure generation time |
| AC5 | Workflows | `useResumePdf.ts` | FR10 | Call composable, verify download |
| AC6 | Workflows | `ResumeDownloadButton.vue` | FR10 | Click button, check spinner |
| AC7 | Workflows | `useResumePdf.ts` | FR10 | Simulate error, check toast |
| AC8 | Services | `ResumeDownloadButton.vue` | FR10 | Click button, verify flow |
| AC9 | Workflows | `pdf.get.ts` | FR11 | Check print mode rendering |
| AC10 | Dependencies | `pdf.get.ts` | FR14 | Deploy and test on Vercel |

## Risks, Assumptions, Open Questions

**Risks:**

| Risk | Severity | Mitigation |
|------|----------|------------|
| Puppeteer timeout on Vercel | Medium | Set 10s timeout, optimize page load |
| Font loading issues in headless | Medium | Use `networkidle0`, test thoroughly |
| Memory limits on serverless | Low | Use 1024MB, single browser instance |
| Chromium binary size | Low | Use `@sparticuz/chromium` (optimized) |

**Assumptions:**

- Vercel supports Puppeteer with `@sparticuz/chromium`
- Inter font loads correctly in headless Chrome
- 10 second timeout is sufficient for PDF generation
- Single PDF generation at a time (no concurrency needed)

**Open Questions:**

- **Q:** Should we cache generated PDFs?  
  **A:** No for MVP - data is static, regeneration is fast enough

- **Q:** Should we support custom filenames?  
  **A:** No for MVP - use fixed format from `getPdfFilename()`

## Test Strategy Summary

**Unit Tests:**
- `useResumePdf` composable: mock fetch, verify state changes
- `getPdfFilename()` returns correct format

**Integration Tests:**
- API route returns PDF with correct headers
- Full download flow works end-to-end

**Manual Tests:**
- Click download button, verify PDF downloads
- Open PDF, verify content matches preview
- Test on Vercel deployment
- Test error handling (disconnect network)
- Verify ATS compatibility (copy text from PDF)

**Performance Tests:**
- Measure generation time (< 3s target)
- Check PDF file size (< 500KB target)
- Test under load (optional)

**Acceptance Tests:**
- Run through all 10 ACs
- Verify on multiple browsers
- Test on mobile (download should work)

---

_Generated from epic technical context notes_  
_Date: 2025-12-01_  
_For: ali_
