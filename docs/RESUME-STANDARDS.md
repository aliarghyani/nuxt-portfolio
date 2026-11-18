# Resume Content Standards & Guidelines

> **Purpose:** This document is the **single source of truth** for ALL resume content updates.  
> Whether you're using Kiro, Claude, ChatGPT, Cursor, or editing manually, follow these standards to ensure consistency, ATS optimization, and professional quality.

**Last Updated:** November 18, 2026

**Version:** 1.1

**Evidence rule for both languages.** Use a number only when its source, scope and period are known. Otherwise describe the deliverable, the contributor’s role and an observable result. This rule supersedes all numerical templates and older metric checklists in this guide and `resume-content-guide.md`. Examples are illustrative and cannot be copied as career facts.

---

## 🎯 Core Principles (NEVER Violate)

These principles are **non-negotiable** and must be followed in every resume update:

1. **ATS-First Optimization** - Use searchable text, conventional headings and readable ordering
2. **Quantified Achievements** - Use measurements when supported and concrete deliverables otherwise
3. **AI Skills Prominence** - Describe the actual tool, task and human review
4. **2-Page Maximum** - For professionals with 5+ years experience
5. **No Clichés** - Terms like "results-driven", "team player" cause instant rejection
6. **Achievement-First** - Lead with impact, not responsibilities
7. **Skills-Centric** - Capabilities matter more than job titles

---

## 📋 Mandatory Structure

### Section Order (5+ Years Experience)

1. **Contact Information** - Name, email, phone, location, LinkedIn, GitHub, portfolio
2. **Professional Summary** - 2-3 sentences highlighting expertise and achievements
3. **Core Competencies/Skills** - Grouped by category (Frontend, AI Tools, Architecture, etc.)
4. **Work Experience** - Reverse chronological, achievement-focused bullets
5. **Education** - Degree, institution, graduation date
6. **Optional Sections** - Certificates, Projects, Languages (if space permits)

### File Location

- **Resume Data:** `app/data/resume.en.ts`
- **Portfolio Data:** `app/data/portfolio.en.ts`

---

## ✍️ Content Writing Rules

### Professional Summary Formula

**Structure (3 lines):**
```
Line 1: Title + Years of Experience + Specialization
Line 2: A specific deliverable and its observed result
Line 3: Key skills/tools + relevant certifications
```

**Example:**
```
Frontend Developer with 3+ years building high-performance Vue.js/Nuxt applications 
for international clients. AI-first engineer leveraging Cursor, GitHub Copilot, and 
AI-powered tools to accelerate development by 50% while maintaining code quality. 
Specialized in performance optimization, scalable architecture (SSR, PWA, RBAC), 
and accessibility.
```

**Rules:**
- ✅ 50-80 words maximum
- ✅ Lead with strongest differentiator
- ✅ Use a metric when its source and scope are known
- ✅ Mention AI tools if used regularly
- ❌ No clichés ("passionate", "results-driven", "team player")
- ❌ No generic statements without proof

---

### Work Experience Guidelines

**Format:**
```typescript
{
  company: 'Company Name',
  position: 'Job Title',
  location: 'City, Country',
  startDate: 'YYYY-MM',
  endDate: 'YYYY-MM', // or undefined for current
  highlights: [
    // 4-6 achievement-focused bullets
  ]
}
```

**Bullet Point Formula:**

```
[Action Verb] + [What You Did] + [Observed result]
```

**Examples:**

✅ **Good:**
```
"Accelerated feature development by 50% using Cursor and GitHub Copilot for 
component generation and real-time debugging, while maintaining zero critical 
bugs through AI-assisted code review"
```

❌ **Bad:**
```
"Responsible for developing features using AI tools"
```

**Quantification Templates:**

| Category | Template | Example |
|----------|----------|---------|
| **Performance** | "Improved X by Y%" | "Reduced bundle size by 35%" |
| **Time Savings** | "Reduced X from Y to Z" | "Cut build time from 5min to 90sec" |
| **Scale** | "Serving X users/requests" | "Platform serving 10K+ users across 10 languages" |
| **Team Impact** | "Led team of X" | "Mentored 3 junior developers" |
| **Business Impact** | "Generated $X revenue" | "Delivered project worth $500K" |

**Action Verbs (Use These):**

| Instead of... | Use These |
|---------------|-----------|
| "worked on" | Architected, Engineered, Developed, Built, Implemented |
| "helped" | Accelerated, Enabled, Facilitated, Drove |
| "made" | Designed, Created, Established, Launched |
| "managed" | Led, Directed, Coordinated, Orchestrated |
| "improved" | Optimized, Enhanced, Streamlined, Transformed |

---

### AI Skills Strategy

Describe AI skills through a specific example of their use.

**Where to Mention AI:**

1. **Professional Summary** - Mention AI-first approach
2. **Skills Section** - Dedicated "AI-Assisted Development" category
3. **Work Experience** - Show AI tools in context with results

**AI Tools to Highlight:**

| Tool | Priority | Context |
|------|----------|---------|
| **Cursor AI** | High | "AI-powered IDE for 3-4x faster development" |
| **GitHub Copilot** | High | "Real-time code suggestions and pair programming" |
| **Claude/ChatGPT** | Medium | "Advanced code analysis and architecture planning" |
| **AI Code Review** | Medium | "Automated quality assurance" |

**How to Write AI Achievements:**

✅ **Good:**
```
"Leveraged Cursor AI to reduce development time by 40% across 6 projects, 
enabling 100% on-time delivery while maintaining code quality standards"
```

❌ **Bad:**
```
"Used AI tools for coding"
```

**Rules:**
- ✅ Include an observable outcome
- ✅ Mention specific tools by name
- ✅ Show how AI enhanced productivity/quality
- ❌ Never say "AI wrote my code" (implies lack of skill)
- ❌ Don't list AI tools without context

---

### Skills Section Structure

**Format:**
```typescript
skills: [
  {
    name: 'Category Name',
    keywords: ['Skill 1', 'Skill 2', 'Skill 3']
  }
]
```

**Recommended Categories:**

1. **Frontend Core** - Vue.js, Nuxt.js, TypeScript, JavaScript, HTML5, CSS3
2. **AI-Assisted Development** - Cursor AI, GitHub Copilot, Prompt Engineering
3. **Architecture & Performance** - SSR, SSG, PWA, RBAC, Code Splitting
4. **Development Tools** - Git, CI/CD, ESLint, Vite, REST APIs
5. **Quality & Accessibility** - WCAG 2.1, Lighthouse, Code Review, i18n

**Rules:**
- ✅ Group by logical categories
- ✅ List 15-20 total skills (not more)
- ✅ Order by relevance to target role
- ✅ Include both technical and soft skills
- ❌ No generic skills ("Microsoft Office", "Communication")
- ❌ Don't list skills you can't demonstrate

---

## 🔄 Portfolio → Resume Sync Rules

### Decision Matrix: When to Include in Resume

| Portfolio Item | Include in Resume? | Where? | How? |
|----------------|-------------------|--------|------|
| **New Project** | If client-facing & production | Projects section OR Work highlights | Concise highlights with evidence |
| **New Skill** | If used in 2+ projects | Skills section | Group by category |
| **New Job** | Always | Work section | 4-6 achievement bullets |
| **Certification** | If relevant to target role | Certificates section | Standard format |
| **Side Project** | Only if impressive/relevant | Projects (optional) | Brief, 2-3 bullets |
| **Tool/Framework** | If used professionally | Skills section | Add to appropriate category |

### Content Transformation Rules

**Portfolio → Resume Translation:**

| Portfolio (Casual) | Resume (Professional) |
|--------------------|----------------------|
| "Built a cool medical tourism app" | "Architected medical tourism platform serving international patients across 10+ languages with real-time scheduling and PWA capabilities" |
| "Used AI tools to code faster" | "Accelerated development by 50% using Cursor AI for component generation while maintaining zero critical bugs" |
| "Made the site faster" | "Optimized application performance through code splitting and lazy loading, reducing bundle size by 35%" |

**Evidence questions:**

For each portfolio item, consider the following where evidence exists:
- ✅ **Scale:** How many users/requests/transactions?
- ✅ **Impact:** What improved? By how much?
- ✅ **Technology:** What tools/frameworks were used?
- ✅ **Result:** What was the business/user outcome?

---

## ✅ Pre-Commit Checklist

Before ANY change to `app/data/resume.en.ts`, verify:

### Content Quality
- [ ] All work experience bullets start with strong action verbs
- [ ] Every claim is supported and each number has a source
- [ ] AI tools mentioned with specific context and results
- [ ] No clichés used ("results-driven", "team player", "passionate")
- [ ] Professional summary follows 3-line formula
- [ ] Skills grouped into 4-6 logical categories

### ATS Compliance
- [ ] Keywords from target job descriptions included
- [ ] Standard section headings used
- [ ] Date format consistent (YYYY-MM)
- [ ] No special characters in content
- [ ] Skills include both full terms and acronyms where applicable

### Structure & Length
- [ ] Total content fits within 2-page limit (estimate ~1000 words)
- [ ] Section order follows standard structure
- [ ] Contact information complete and professional
- [ ] LinkedIn/GitHub URLs are current and active

### Accuracy
- [ ] All dates are correct
- [ ] Company names spelled correctly
- [ ] No typos or grammatical errors
- [ ] All claims can be backed up with evidence

---

## 🚫 Common Mistakes (Auto-Reject)

### Clichés That Kill Resumes

**NEVER use these phrases:**
- ❌ "Results-driven professional"
- ❌ "Team player with strong communication skills"
- ❌ "Think outside the box"
- ❌ "Hard-working and dedicated"
- ❌ "Detail-oriented"
- ❌ "Self-starter"
- ❌ "Passionate about technology"
- ❌ "Go-getter"

### Content Mistakes

| ❌ Don't | ✅ Do Instead |
|----------|---------------|
| "Responsible for managing projects" | "Led 9 concurrent projects totaling $10M budget, achieving 94% on-time delivery" |
| "Worked with Vue.js" | "Architected Vue.js applications serving 10K+ users with 99.5% uptime" |
| "Helped improve performance" | "Optimized load time by 40% through code splitting and lazy loading" |
| "Used AI tools" | "Leveraged Cursor AI to accelerate development by 50% across 6 production projects" |
| "Good communication skills" | "Collaborated with CEO on product strategy, translating requirements into technical specs" |

### Formatting Mistakes

- ❌ Using multiple fonts or colors
- ❌ Including photos or graphics
- ❌ Using tables or columns
- ❌ Exceeding 2 pages
- ❌ Inconsistent date formats
- ❌ Generic email addresses (partyguy@email.com)

---

## 🔗 Reference Documents

### Full Research & Analysis
- **Comprehensive Research:** [docs/research/resume-research-2025.md](./research/resume-research-2025.md) - 100+ sources, full analysis
- **AI Skills Report:** [docs/research/mension-ai-skills-in-resume-report.md](./research/mension-ai-skills-in-resume-report.md) - Deep dive on AI skills importance

### Quick References
- **Content Guide:** [docs/resume-content-guide.md](./resume-content-guide.md) - Quick lookup for writing tips
- **Current Resume:** [app/data/resume.en.ts](../app/data/resume.en.ts) - Live resume data
- **Portfolio Data:** [app/data/portfolio.en.ts](../app/data/portfolio.en.ts) - Portfolio source

---

## 🤖 For AI Agents

If you're an AI agent (Kiro, Claude, ChatGPT, Cursor, etc.) helping with resume updates:

### Your Responsibilities

1. **Read this document FIRST** before making any resume suggestions
2. **Apply all rules** from Core Principles and Content Writing Rules
3. **Use the Decision Matrix** to determine if portfolio items belong in resume
4. **Transform content** using the Portfolio → Resume translation guidelines
5. **Validate** against the Pre-Commit Checklist before presenting changes
6. **Never violate** the Common Mistakes section

### Workflow for Resume Updates

```
1. User requests resume update
   ↓
2. Read current resume.en.ts and portfolio.en.ts
   ↓
3. Identify what changed or what needs to be added
   ↓
4. Apply Decision Matrix: Should this be in resume?
   ↓
5. If YES: Transform content using standards
   ↓
6. Draft highlights using verified achievements
   ↓
7. Validate against Pre-Commit Checklist
   ↓
8. Present to user for approval
```

### Example Prompt for Agents

```
"I need to update my resume with a new project. Please:
1. Read docs/RESUME-STANDARDS.md
2. Compare app/data/portfolio.en.ts with app/data/resume.en.ts
3. Identify the new project
4. Determine if it should be in resume (use Decision Matrix)
5. If yes, write achievement-focused bullets following the standards
6. Validate against Pre-Commit Checklist
7. Show me the suggested changes"
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-04 | Initial creation with core principles, content rules, and sync guidelines |

---

**Remember:** This document is living. Update it as you learn new best practices or when resume standards evolve.
