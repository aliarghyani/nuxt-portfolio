# Resume Export Feature - Epic Breakdown

**Author:** ali
**Date:** 2025-11-30
**Project Type:** Brownfield Feature Addition
**Target:** nuxt-portfolio

---

## Overview

This document provides the complete epic and story breakdown for the Resume Export feature, decomposing the 25 functional requirements from the PRD into implementable stories.

**Context Documents:**
- ✅ PRD: `docs/prd.md`
- ✅ Architecture: `docs/architecture.md`

---

## Epic Summary

| Epic | Title | Stories | FRs Covered | User Value |
|------|-------|---------|-------------|------------|
| 1 | Resume Data & Types | 3 | FR1-4 | Data foundation ready |
| 2 | Resume Preview Page | 5 | FR5-9, FR15-25 | User can view resume |
| 3 | PDF Export | 3 | FR10-14 | User can download PDF |

**Total: 3 Epics, 11 Stories**

---

## Functional Requirements Inventory

| FR | Description | Epic | Story |
|----|-------------|------|-------|
| FR1 | System stores resume data in dedicated file | 1 | 1.1 |
| FR2 | Resume data structure supports all template sections | 1 | 1.2 |
| FR3 | Resume data is independent from portfolio data | 1 | 1.1 |
| FR4 | Data structure allows future extension for languages | 1 | 1.2 |
| FR5 | Users can view resume at `/resume` route | 2 | 2.1 |
| FR6 | Preview page renders resume exactly as PDF | 2 | 2.2-2.4 |
| FR7 | Preview page is standalone (no nav) | 2 | 2.1 |
| FR8 | Preview page is responsive, optimized for A4 | 2 | 2.2 |
| FR9 | Users can see two-column layout | 2 | 2.2 |
| FR10 | Users can download resume as PDF | 3 | 3.2 |
| FR11 | PDF output matches web preview exactly | 3 | 3.1-3.2 |
| FR12 | PDF is ATS-compatible | 2 | 2.2-2.4 |
| FR13 | PDF filename follows format | 3 | 3.2 |
| FR14 | Download completes in < 3 seconds | 3 | 3.1 |
| FR15 | Header displays name and job title | 2 | 2.3 |
| FR16 | Contact section shows info with icons | 2 | 2.3 |
| FR17 | Skills section displays technical skills | 2 | 2.4 |
| FR18 | Education section shows details | 2 | 2.4 |
| FR19 | Languages section shows proficiencies | 2 | 2.4 |
| FR20 | Profile section displays summary | 2 | 2.3 |
| FR21 | Experience section shows jobs | 2 | 2.3 |
| FR22 | Resume uses blue/white color scheme | 2 | 2.2 |
| FR23 | Typography is professional and ATS-readable | 2 | 2.2 |
| FR24 | Layout maintains proper spacing | 2 | 2.2 |
| FR25 | Design adapts to content length | 2 | 2.2 |

---

## Epic 1: Resume Data & Types

**Goal:** Establish the data foundation for the resume feature with proper TypeScript types and sample data.

**User Value:** Resume data is structured, type-safe, and ready for rendering.

**FRs Covered:** FR1, FR2, FR3, FR4

---

### Story 1.1: Create Resume TypeScript Interfaces

**As a** developer,
**I want** well-defined TypeScript interfaces for resume data,
**So that** I have type safety and autocomplete when working with resume content.

**Acceptance Criteria:**

**Given** the project needs resume data types
**When** I create the types file
**Then** it includes interfaces for:
- `ResumeBasics` (name, label, email, phone, url, location, profiles, summary)
- `WorkExperience` (company, position, startDate, endDate, highlights)
- `Education` (institution, area, studyType, startDate, endDate)
- `Skill` (name, keywords)
- `Language` (language, fluency)
- `Certification` (name, issuer, date)
- `Resume` (combining all above)

**And** all date fields use `YYYY-MM` string format
**And** optional fields are properly marked with `?`
**And** the file is located at `app/types/resume.ts`

**Prerequisites:** None

**Technical Notes:**
- Based on JSON Resume schema (modified)
- See Architecture doc "Data Architecture" section
- Export all interfaces for use in components

---

### Story 1.2: Create Sample Resume Data File

**As a** developer,
**I want** a sample resume data file with real content,
**So that** I can test the preview and PDF generation.

**Acceptance Criteria:**

**Given** the TypeScript interfaces exist
**When** I create the resume data file
**Then** it exports a `resumeData` object of type `Resume`

**And** it includes realistic sample data:
- Full name and job title
- Contact info (email, phone, location)
- At least 2 social profiles (LinkedIn, GitHub)
- Professional summary (2-3 sentences)
- At least 2 work experiences with 3+ highlights each
- At least 1 education entry
- At least 2 skill categories with 4+ keywords each
- At least 2 languages

**And** the file is located at `app/data/resume.en.ts`
**And** data is independent from existing portfolio data

**Prerequisites:** Story 1.1

**Technical Notes:**
- Use Ali Arghyani as sample name
- Include Iconify icon names for social profiles (i-mdi-linkedin, i-mdi-github)
- Dates in YYYY-MM format

---

### Story 1.3: Create Resume Data Composable

**As a** developer,
**I want** a composable to access resume data,
**So that** components can easily consume the data reactively.

**Acceptance Criteria:**

**Given** the resume data file exists
**When** I create the composable
**Then** it exports a `useResumeData()` function

**And** the function returns:
- `resume`: Reactive reference to resume data
- `formatDate(date: string, locale?: string)`: Helper to format YYYY-MM dates
- `getFullName()`: Returns formatted full name
- `getPdfFilename()`: Returns filename like "Ali_Arghyani_Resume.pdf"

**And** the file is located at `app/composables/useResumeData.ts`

**Prerequisites:** Story 1.2

**Technical Notes:**
- Use `computed` for derived values
- Date formatting: "Jan 2023" for English
- Filename: Replace spaces with underscores

---

## Epic 2: Resume Preview Page

**Goal:** Create a pixel-perfect resume preview page that matches the PDF output exactly.

**User Value:** User can view their resume in the browser before downloading.

**FRs Covered:** FR5-9, FR15-25

---

### Story 2.1: Create Resume Page Route

**As a** user,
**I want** to access my resume at `/resume`,
**So that** I can view it before downloading.

**Acceptance Criteria:**

**Given** I navigate to `/resume`
**When** the page loads
**Then** I see the resume preview

**And** the page is standalone (no site header/footer)
**And** the page has a white background
**And** the page title is "Resume - Ali Arghyani"
**And** meta tags are set for SEO (noindex for privacy)

**Given** I add `?print=true` query parameter
**When** the page loads
**Then** the download button is hidden (for PDF generation)

**Prerequisites:** None (can use placeholder content initially)

**Technical Notes:**
- File: `app/pages/resume.vue`
- Use `definePageMeta({ layout: false })` for standalone
- Check `useRoute().query.print` for print mode

---

### Story 2.2: Create Resume Preview Container Component

**As a** developer,
**I want** a container component that renders the full resume,
**So that** I have a single source of truth for web and PDF.

**Acceptance Criteria:**

**Given** the ResumePreview component is rendered
**When** it displays
**Then** it shows a two-column layout:
- Left sidebar (35% width): Contact, Skills, Education, Languages
- Right main content (65% width): Header, Summary, Experience

**And** the container has A4 aspect ratio (210mm × 297mm)
**And** page margins are 24px (1.5rem)
**And** background is white
**And** color scheme is blue (#2563eb) and white

**And** typography uses:
- Inter font for English text
- Proper heading hierarchy (h1 for name, h2 for sections)
- Body text: 14px (0.875rem)
- ATS-readable font sizes

**And** the layout is responsive:
- Desktop: Two-column side by side
- Mobile: Single column (sidebar on top)

**And** print styles are included:
- `.no-print` class hides elements in print
- Page breaks are controlled
- Colors print correctly (`printBackground: true`)

**Prerequisites:** Story 1.3

**Technical Notes:**
- File: `app/components/resume/ResumePreview.vue`
- Use CSS Grid for two-column layout
- Tailwind classes for styling
- Import and use child components

---

### Story 2.3: Create Resume Header & Main Content Components

**As a** user,
**I want** to see my name, title, summary, and work experience prominently,
**So that** recruiters see the most important information first.

**Acceptance Criteria:**

**ResumeHeader.vue:**
**Given** the header component renders
**When** it displays
**Then** it shows:
- Full name in large bold text (2rem, font-bold)
- Job title below name (1.25rem, text-gray-600)
- Blue accent line or background element

**ResumeSummary.vue:**
**Given** the summary component renders
**When** it displays
**Then** it shows:
- "Profile" or "Summary" section header
- Professional summary paragraph
- Proper line height for readability (1.6)

**ResumeExperience.vue:**
**Given** the experience component renders
**When** it displays
**Then** it shows for each job:
- Position title (bold)
- Company name
- Date range (formatted: "Jan 2022 - Present")
- Bullet points for highlights (• character)

**And** jobs are sorted by date (most recent first)
**And** "Present" is shown for current jobs (no endDate)

**Prerequisites:** Story 2.2

**Technical Notes:**
- Files in `app/components/resume/`
- Use `v-for` for work entries
- Format dates using composable helper

---

### Story 2.4: Create Resume Sidebar Components

**As a** user,
**I want** to see my contact info, skills, education, and languages in the sidebar,
**So that** this supporting information is easily scannable.

**Acceptance Criteria:**

**ResumeContact.vue:**
**Given** the contact component renders
**When** it displays
**Then** it shows:
- Email with icon (i-mdi-email)
- Phone with icon (i-mdi-phone)
- Location with icon (i-mdi-map-marker)
- Social profiles with icons (LinkedIn, GitHub, etc.)

**And** each item is on its own line
**And** links are clickable (mailto:, tel:, https://)

**ResumeSkills.vue:**
**Given** the skills component renders
**When** it displays
**Then** it shows:
- "Skills" section header
- Skill categories as subheaders
- Keywords as tags or comma-separated list

**ResumeEducation.vue:**
**Given** the education component renders
**When** it displays
**Then** it shows for each entry:
- Degree type and field (e.g., "B.Sc. Computer Science")
- Institution name
- Date range

**ResumeLanguages.vue:**
**Given** the languages component renders
**When** it displays
**Then** it shows:
- "Languages" section header
- Each language with fluency level

**Prerequisites:** Story 2.2

**Technical Notes:**
- Files in `app/components/resume/`
- Use Nuxt UI Icon component for icons
- Consistent section header styling

---

### Story 2.5: Create Download Button Component

**As a** user,
**I want** a prominent download button,
**So that** I can easily download my resume as PDF.

**Acceptance Criteria:**

**Given** I'm on the resume page
**When** I see the download button
**Then** it's a floating action button (FAB) in bottom-right corner

**And** it has:
- Download icon (i-heroicons-arrow-down-tray)
- "Download PDF" text (or just icon on mobile)
- Blue background color
- Fixed position (doesn't scroll)
- Shadow for elevation

**And** it has the `.no-print` class (hidden in PDF)

**Given** I'm on the page with `?print=true`
**When** the page renders
**Then** the button is not visible

**Prerequisites:** Story 2.1

**Technical Notes:**
- File: `app/components/resume/ResumeDownloadButton.vue`
- Use Nuxt UI `UButton` component
- Click handler will be connected in Epic 3

---

## Epic 3: PDF Export

**Goal:** Enable high-quality PDF generation that matches the web preview exactly.

**User Value:** User can download a professional, ATS-compatible PDF resume.

**FRs Covered:** FR10-14

---

### Story 3.1: Create PDF Generation API Route

**As a** system,
**I want** a server endpoint that generates PDF from the resume page,
**So that** users get consistent, high-quality PDF output.

**Acceptance Criteria:**

**Given** a GET request to `/api/resume/pdf`
**When** the server processes the request
**Then** it:
1. Launches Puppeteer in headless mode
2. Navigates to `/resume?print=true`
3. Waits for network idle (fonts loaded)
4. Generates PDF with options:
   - Format: A4
   - Print background: true
   - Margins: default
5. Returns PDF buffer

**And** response headers include:
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="Ali_Arghyani_Resume.pdf"`

**And** generation completes in < 3 seconds
**And** timeout is set to 10 seconds max

**Given** an error occurs during generation
**When** the error is caught
**Then** it returns:
- Status: 500
- JSON: `{ "error": "PDF generation failed", "message": "..." }`

**Prerequisites:** Story 2.2 (preview page must exist)

**Technical Notes:**
- File: `server/api/resume/pdf.get.ts`
- Use `puppeteer` package for local dev
- Use `puppeteer-core` + `@sparticuz/chromium` for Vercel
- See Architecture doc "Deployment Architecture" section

---

### Story 3.2: Create PDF Download Composable

**As a** developer,
**I want** a composable that handles PDF download logic,
**So that** the download button can trigger downloads easily.

**Acceptance Criteria:**

**Given** I call `downloadPdf()` from the composable
**When** the function executes
**Then** it:
1. Sets `isGenerating` to true
2. Fetches `/api/resume/pdf` as blob
3. Creates object URL from blob
4. Creates temporary `<a>` element
5. Sets download filename from composable
6. Triggers click to download
7. Revokes object URL
8. Sets `isGenerating` to false

**And** the composable returns:
- `isGenerating`: Ref<boolean>
- `downloadPdf`: () => Promise<void>

**Given** an error occurs during download
**When** the error is caught
**Then** it:
- Shows toast notification: "Error generating PDF"
- Sets `isGenerating` to false
- Logs error to console

**Prerequisites:** Story 3.1

**Technical Notes:**
- File: `app/composables/useResumePdf.ts`
- Use `$fetch` with `responseType: 'blob'`
- Use Nuxt UI `useToast()` for notifications
- Get filename from `useResumeData().getPdfFilename()`

---

### Story 3.3: Connect Download Button to PDF Generation

**As a** user,
**I want** to click the download button and get my PDF,
**So that** I can use my resume for job applications.

**Acceptance Criteria:**

**Given** I click the download button
**When** PDF generation starts
**Then** the button shows loading state (spinner)
**And** the button is disabled

**Given** PDF generation succeeds
**When** the PDF is ready
**Then** the browser downloads the file
**And** filename is "Ali_Arghyani_Resume.pdf"
**And** button returns to normal state

**Given** PDF generation fails
**When** the error occurs
**Then** a toast notification appears with error message
**And** button returns to normal state

**Prerequisites:** Story 2.5, Story 3.2

**Technical Notes:**
- Update `ResumeDownloadButton.vue`
- Use `useResumePdf()` composable
- Bind `:loading="isGenerating"` to button
- Bind `@click="downloadPdf"` to button

---

## FR Coverage Matrix

| FR | Description | Epic | Story | Status |
|----|-------------|------|-------|--------|
| FR1 | Resume data in dedicated file | 1 | 1.1, 1.2 | ✅ Covered |
| FR2 | Data structure supports all sections | 1 | 1.2 | ✅ Covered |
| FR3 | Data independent from portfolio | 1 | 1.1, 1.2 | ✅ Covered |
| FR4 | Future language extension | 1 | 1.2 | ✅ Covered |
| FR5 | View at `/resume` route | 2 | 2.1 | ✅ Covered |
| FR6 | Preview matches PDF exactly | 2 | 2.2 | ✅ Covered |
| FR7 | Standalone page (no nav) | 2 | 2.1 | ✅ Covered |
| FR8 | Responsive, A4 optimized | 2 | 2.2 | ✅ Covered |
| FR9 | Two-column layout | 2 | 2.2 | ✅ Covered |
| FR10 | Download as PDF | 3 | 3.2, 3.3 | ✅ Covered |
| FR11 | PDF matches preview | 3 | 3.1 | ✅ Covered |
| FR12 | ATS-compatible | 2 | 2.2-2.4 | ✅ Covered |
| FR13 | Filename format | 3 | 3.2 | ✅ Covered |
| FR14 | Download < 3 seconds | 3 | 3.1 | ✅ Covered |
| FR15 | Header with name/title | 2 | 2.3 | ✅ Covered |
| FR16 | Contact with icons | 2 | 2.4 | ✅ Covered |
| FR17 | Skills section | 2 | 2.4 | ✅ Covered |
| FR18 | Education section | 2 | 2.4 | ✅ Covered |
| FR19 | Languages section | 2 | 2.4 | ✅ Covered |
| FR20 | Profile/summary section | 2 | 2.3 | ✅ Covered |
| FR21 | Experience section | 2 | 2.3 | ✅ Covered |
| FR22 | Blue/white color scheme | 2 | 2.2 | ✅ Covered |
| FR23 | Professional typography | 2 | 2.2 | ✅ Covered |
| FR24 | Proper spacing | 2 | 2.2 | ✅ Covered |
| FR25 | Adapts to content length | 2 | 2.2 | ✅ Covered |

**Coverage: 25/25 FRs (100%)**

---

## Summary

**3 Epics** with **11 Stories** covering all **25 Functional Requirements**.

**Implementation Order:**
1. Epic 1: Data foundation (Stories 1.1 → 1.2 → 1.3)
2. Epic 2: Preview page (Stories 2.1 → 2.2 → 2.3 → 2.4 → 2.5)
3. Epic 3: PDF export (Stories 3.1 → 3.2 → 3.3)

**Dependencies:**
- Epic 2 depends on Epic 1 (needs data)
- Epic 3 depends on Epic 2 (needs preview page)

**Ready for:** Sprint Planning → Implementation

---

_Generated from project planning notes_
_Date: 2025-11-30_
_For: ali_
