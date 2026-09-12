# Resume Export Feature - Architecture Document

## Executive Summary

This architecture defines the Resume Export feature for nuxt-portfolio - a server-side PDF generation system using Puppeteer that produces ATS-compatible, pixel-perfect PDF resumes from Vue components. The WYSIWYG approach ensures web preview matches PDF output exactly.

---

## Decision Summary

| Category | Decision | Version | Affects FRs | Rationale |
|----------|----------|---------|-------------|-----------|
| PDF Engine | Puppeteer (server-side) | ^23.x | FR8-14 | Best quality, font embedding, full control |
| Data Schema | JSON Resume (customized) | - | FR1-4 | Industry standard, extensible |
| Font (EN) | Inter | via @nuxt/fonts | FR22-23 | Modern, ATS-safe, excellent readability |
| Font (FA) | Vazirmatn | via @nuxt/fonts | FR22-23 | Best Persian web font, RTL support |
| Template System | Vue Components | - | FR15-21 | Full control, reusable, type-safe |
| API Pattern | Nuxt Server Route | - | FR10-14 | Native Nuxt, no extra server |
| Layout | Two-column (sidebar + main) | - | FR6, FR9 | Matches design template |
| Storage | File-based (TypeScript) | - | FR1, FR3 | Simple, version controlled |

---

## Project Structure

```
app/
├── components/
│   └── resume/
│       ├── ResumePreview.vue        # Main container (A4 layout)
│       ├── ResumeHeader.vue         # Name, job title
│       ├── ResumeContact.vue        # Phone, email, location, links
│       ├── ResumeSidebar.vue        # Skills, education, languages
│       ├── ResumeExperience.vue     # Work history with highlights
│       ├── ResumeSummary.vue        # Professional summary
│       └── ResumeDownloadButton.vue # Floating action button
├── data/
│   └── resume.en.ts                 # English resume data
├── pages/
│   └── resume.vue                   # /resume route (standalone page)
├── types/
│   └── resume.ts                    # TypeScript interfaces
└── composables/
    └── useResumePdf.ts              # PDF download logic

server/
└── api/
    └── resume/
        └── pdf.get.ts               # GET /api/resume/pdf → PDF buffer
```

---

## FR Category to Architecture Mapping

| FR Category | FRs | Components/Files | Notes |
|-------------|-----|------------------|-------|
| Resume Data Management | FR1-4 | `data/resume.en.ts`, `types/resume.ts` | TypeScript for type safety |
| Resume Preview Page | FR5-9 | `pages/resume.vue`, `components/resume/*` | Standalone, no nav |
| PDF Export | FR10-14 | `server/api/resume/pdf.get.ts`, `useResumePdf.ts` | Puppeteer server-side |
| Template Sections | FR15-21 | Individual resume components | Modular design |
| Styling & Theming | FR22-25 | Tailwind classes, CSS variables | Blue/white theme |

---

## Technology Stack Details

### Core Stack (Existing)

- **Framework:** Nuxt 4.1.3
- **Language:** TypeScript 5.9.x
- **Styling:** Tailwind CSS 4.1.x
- **UI Components:** Nuxt UI 4.0.x
- **Fonts:** @nuxt/fonts 0.11.x

### New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| puppeteer | ^23.x | Server-side PDF generation |

### Installation

```bash
pnpm add puppeteer
```

---

## Data Architecture

### Resume Interface

```typescript
// app/types/resume.ts

export interface ResumeBasics {
  name: string
  label: string                    // Job title
  email: string
  phone: string
  url?: string
  location: {
    city: string
    country: string
  }
  profiles: Array<{
    network: string               // LinkedIn, GitHub, etc.
    url: string
    icon?: string                 // Iconify icon name
  }>
  summary: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string               // YYYY-MM format
  endDate?: string                // YYYY-MM or undefined for "Present"
  highlights: string[]            // Bullet points
}

export interface Education {
  institution: string
  area: string                    // Field of study
  studyType: string               // Degree type
  startDate: string
  endDate?: string
}

export interface Skill {
  name: string                    // Category name
  keywords: string[]              // Individual skills
}

export interface Language {
  language: string
  fluency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic'
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Resume {
  basics: ResumeBasics
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages?: Language[]
  certifications?: Certification[]
}
```

### Sample Data Structure

```typescript
// app/data/resume.en.ts
import type { Resume } from '~/types/resume'

export const resumeData: Resume = {
  basics: {
    name: 'Ali Arghyani',
    label: 'Senior Frontend Developer',
    email: 'ali@example.com',
    phone: '+98 912 345 6789',
    location: { city: 'Tehran', country: 'Iran' },
    profiles: [
      { network: 'LinkedIn', url: 'https://linkedin.com/in/ali', icon: 'i-mdi-linkedin' },
      { network: 'GitHub', url: 'https://github.com/ali', icon: 'i-mdi-github' }
    ],
    summary: 'Experienced frontend developer with 5+ years...'
  },
  work: [
    {
      company: 'Tech Company',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      highlights: [
        'Led development of customer-facing dashboard',
        'Improved performance by 40%'
      ]
    }
  ],
  education: [...],
  skills: [
    { name: 'Frontend', keywords: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind'] },
    { name: 'Tools', keywords: ['Git', 'Docker', 'CI/CD'] }
  ],
  languages: [
    { language: 'Persian', fluency: 'Native' },
    { language: 'English', fluency: 'Fluent' }
  ]
}
```

---

## API Contracts

### GET /api/resume/pdf

**Request:**
```
GET /api/resume/pdf
```

**Response (Success):**
```
Status: 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="Ali_Arghyani_Resume.pdf"
Body: <PDF binary>
```

**Response (Error):**
```
Status: 500 Internal Server Error
Content-Type: application/json
Body: { "error": "PDF generation failed", "message": "..." }
```

---

## Novel Pattern: WYSIWYG PDF Export

### Problem
Web preview must match PDF output exactly (pixel-perfect).

### Solution
Single component renders both web preview and PDF source.

### Flow

```
┌─────────────────────────────────────────────────────┐
│  User visits /resume                                 │
│  ┌───────────────────────────────────────────────┐  │
│  │  ResumePreview.vue (A4 aspect ratio)          │  │
│  │  - Same component for web AND PDF             │  │
│  │  - Tailwind + print styles                    │  │
│  └───────────────────────────────────────────────┘  │
│  [Download Button - FAB bottom-right]               │
└─────────────────────────────────────────────────────┘
                    │
                    │ User clicks download
                    ▼
┌─────────────────────────────────────────────────────┐
│  useResumePdf.ts                                     │
│  1. Set loading state                                │
│  2. Fetch /api/resume/pdf                            │
│  3. Create blob URL                                  │
│  4. Trigger download                                 │
│  5. Clear loading state                              │
└─────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│  server/api/resume/pdf.get.ts                        │
│  1. Launch Puppeteer (headless)                      │
│  2. Navigate to /resume?print=true                   │
│  3. Wait for networkidle0 (fonts loaded)             │
│  4. page.pdf({ format: 'A4', printBackground: true })│
│  5. Close browser                                    │
│  6. Return PDF buffer with headers                   │
└─────────────────────────────────────────────────────┘
```

### Key Implementation Details

**Query Parameter:** `?print=true`
- Hides download button in PDF
- Removes any interactive elements

**CSS Print Styles:**
```css
@media print {
  .no-print { display: none; }
  .resume-container { 
    width: 210mm; 
    min-height: 297mm; 
  }
}
```

---

## Implementation Patterns

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Vue Components | PascalCase | `ResumeHeader.vue` |
| Composables | camelCase + `use` prefix | `useResumePdf.ts` |
| Data files | kebab-case + locale suffix | `resume.en.ts` |
| API routes | kebab-case + method suffix | `pdf.get.ts` |
| TypeScript types | PascalCase | `WorkExperience` |
| CSS classes | Tailwind utilities | `text-blue-600` |

### Component Organization

```
components/resume/
├── ResumePreview.vue      # Container - imports all others
├── ResumeHeader.vue       # Standalone section
├── ResumeContact.vue      # Standalone section
├── ResumeSidebar.vue      # Standalone section
├── ResumeExperience.vue   # Standalone section
├── ResumeSummary.vue      # Standalone section
└── ResumeDownloadButton.vue # FAB - hidden in print
```

### Error Handling

```typescript
// Composable pattern
export function useResumePdf() {
  const isGenerating = ref(false)
  const toast = useToast()

  async function downloadPdf() {
    isGenerating.value = true
    try {
      const response = await $fetch('/api/resume/pdf', {
        responseType: 'blob'
      })
      // Create download link
      const url = URL.createObjectURL(response)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Ali_Arghyani_Resume.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.add({
        title: 'Error generating PDF',
        description: 'Please try again',
        color: 'error'
      })
    } finally {
      isGenerating.value = false
    }
  }

  return { isGenerating, downloadPdf }
}
```

### Loading State

```vue
<template>
  <UButton
    :loading="isGenerating"
    :disabled="isGenerating"
    icon="i-heroicons-arrow-down-tray"
    size="lg"
    class="fixed bottom-6 right-6 no-print"
    @click="downloadPdf"
  >
    Download PDF
  </UButton>
</template>
```

---

## Consistency Rules

### Color Scheme

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Primary (headers, icons) | Blue | `text-blue-600`, `bg-blue-600` |
| Background | White | `bg-white` |
| Text | Dark gray | `text-gray-800` |
| Secondary text | Medium gray | `text-gray-600` |
| Borders/dividers | Light gray | `border-gray-200` |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Name | Inter | 2rem | Bold |
| Job Title | Inter | 1.25rem | Medium |
| Section Headers | Inter | 1rem | Semibold |
| Body Text | Inter | 0.875rem | Normal |
| Persian Text | Vazirmatn | Same sizes | Same weights |

### Spacing

| Element | Spacing |
|---------|---------|
| Page margins | 1.5rem (24px) |
| Section gap | 1.5rem |
| Item gap | 0.75rem |
| Sidebar width | 35% |
| Main content width | 65% |

---

## Security Architecture

### PDF Generation Security

- Puppeteer runs in sandboxed mode
- No user input in PDF generation (data is server-controlled)
- Timeout limit: 10 seconds max
- No external resource loading in PDF

### Data Security

- Resume data stored in source code (no database)
- No PII exposed in API responses (only PDF binary)
- HTTPS required for production

---

## Performance Considerations

### PDF Generation

| Metric | Target | Strategy |
|--------|--------|----------|
| Generation time | < 3 seconds | Puppeteer reuse, minimal page |
| PDF file size | < 500KB | No images, optimized fonts |
| Memory usage | < 512MB | Single browser instance |

### Page Load

| Metric | Target | Strategy |
|--------|--------|----------|
| Preview load | < 1 second | Static data, no API calls |
| LCP | < 1.5s | Inline critical CSS |
| CLS | 0 | Fixed dimensions |

### Optimization Strategies

1. **Font subsetting:** Only include used characters
2. **No images in resume:** Text-only for ATS
3. **Lazy browser launch:** Only when PDF requested
4. **Browser instance reuse:** For multiple requests

---

## Deployment Architecture

### Vercel Deployment

```json
// vercel.json (existing)
{
  "functions": {
    "server/api/resume/pdf.get.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### Puppeteer on Vercel

Use `@sparticuz/chromium` for serverless:

```typescript
// server/api/resume/pdf.get.ts
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless
  })
  // ... generate PDF
})
```

---

## Development Environment

### Prerequisites

- Node.js >= 18.20.0
- pnpm 9.x
- Chrome/Chromium (for local Puppeteer)

### Setup Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Test PDF generation locally
# Visit http://localhost:3000/resume
# Click download button
```

### Environment Variables

```env
# .env (optional - for production Puppeteer)
PUPPETEER_EXECUTABLE_PATH=/path/to/chrome
```

---

## Architecture Decision Records (ADRs)

### ADR-001: Server-side PDF Generation

**Decision:** Use Puppeteer server-side instead of client-side libraries

**Context:** Need pixel-perfect PDF with proper font embedding

**Alternatives Considered:**
- html2pdf.js (client) - Poor quality, converts to image
- jsPDF (client) - Manual layout, no CSS support
- Print to PDF (browser) - Inconsistent across browsers

**Consequences:**
- (+) Perfect quality, font embedding works
- (+) Consistent output across all clients
- (-) Requires server resources
- (-) Slightly slower than client-side

---

### ADR-002: Vue Components as Templates

**Decision:** Each resume section is a Vue component

**Context:** Need maintainable, type-safe template system

**Alternatives Considered:**
- JSON config + dynamic renderer - Too complex for MVP
- HTML templates - No type safety

**Consequences:**
- (+) Full TypeScript support
- (+) Easy to modify individual sections
- (+) Reusable across web and PDF
- (-) Adding new templates requires code

---

### ADR-003: JSON Resume Schema (Modified)

**Decision:** Use JSON Resume standard with customizations

**Context:** Need structured, extensible data format

**Modifications from standard:**
- Simplified location (city + country only)
- Added icon field to profiles
- Persian language support

**Consequences:**
- (+) Industry standard, well-documented
- (+) Easy to export/import
- (+) Future-proof for integrations

---

_Generated from project architecture notes_
_Date: 2025-11-30_
_For: ali_
