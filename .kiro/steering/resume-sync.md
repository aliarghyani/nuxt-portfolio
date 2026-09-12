# Resume Sync Steering Rules

This steering file guides Kiro (and other AI agents) on how to handle resume updates and portfolio-resume synchronization.

## Core Reference

**Primary Documentation:** `docs/RESUME-STANDARDS.md`

All resume updates MUST follow the standards documented there. This includes:
- Content writing rules
- ATS optimization requirements
- Portfolio → Resume sync decision matrix
- Pre-commit checklist

## When User Requests Resume Updates

### Automatic Actions

1. **Read Standards First**
   - Load `docs/RESUME-STANDARDS.md` into context
   - Review Core Principles and Content Writing Rules
   - Check Portfolio → Resume Sync Rules

2. **Analyze Current State**
   - Read `app/data/resume.en.ts` (current resume)
   - Read `app/data/portfolio.en.ts` (portfolio data)
   - Identify differences

3. **Apply Decision Matrix**
   - For each portfolio item not in resume, determine:
     - Should it be included? (Use Decision Matrix from RESUME-STANDARDS.md)
     - Where should it go? (Summary, Work, Skills, Projects)
     - How should it be phrased? (Apply content transformation rules)

4. **Generate Suggestions**
   - Write achievement-focused bullets with quantifiable metrics
   - Ensure AI tools are mentioned with context
   - Follow action verb guidelines
   - Avoid all clichés

5. **Validate Before Presenting**
   - Run through Pre-Commit Checklist
   - Verify no common mistakes
   - Ensure 2-page limit maintained

### User Commands

When user says any of these, trigger resume sync workflow:

- "Update my resume"
- "Sync portfolio to resume"
- "Add [project/skill/job] to resume"
- "Review my resume"
- "Check if resume is up to date"

### Workflow Steps

```
1. User requests resume update
   ↓
2. Load docs/RESUME-STANDARDS.md
   ↓
3. Read app/data/resume.en.ts and app/data/portfolio.en.ts
   ↓
4. Run scripts/sync-portfolio-to-resume.ts (or manual analysis)
   ↓
5. Apply Decision Matrix for each difference
   ↓
6. Generate suggestions following Content Writing Rules
   ↓
7. Validate against Pre-Commit Checklist
   ↓
8. Present suggestions to user
   ↓
9. Apply approved changes
   ↓
10. Confirm completion
```

## Key Rules for AI Agents

### Always Do

✅ Read `RESUME-STANDARDS.md` before making suggestions
✅ Quantify every achievement with metrics
✅ Mention AI tools with specific context and results
✅ Use strong action verbs (not "responsible for" or "worked on")
✅ Follow the 3-line Professional Summary formula
✅ Group skills into logical categories
✅ Validate against Pre-Commit Checklist

### Never Do

❌ Use clichés ("results-driven", "team player", "passionate")
❌ Write generic bullets without metrics
❌ Add content that exceeds 2-page limit
❌ Suggest changes without reading standards first
❌ Include portfolio items that don't meet Decision Matrix criteria
❌ Use weak action verbs or passive voice

## Sync Script Usage

The project includes `scripts/sync-portfolio-to-resume.ts` for automated analysis.

**To run manually:**
```bash
npm run sync-resume
# or
node scripts/sync-portfolio-to-resume.ts
```

**What it does:**
- Compares portfolio.en.ts with resume.en.ts
- Identifies new projects, skills, or changes
- Applies RESUME-STANDARDS.md decision matrix
- Generates suggestions for updates
- Provides actionable next steps

**When to suggest running it:**
- User mentions adding new project to portfolio
- User asks to update resume
- User wants to check if resume is current

## Example Interactions

### Example 1: User adds new project to portfolio

**User:** "I just added a new project to my portfolio. Should I add it to my resume?"

**Kiro Response:**
```
Let me analyze this for you.

[Reads portfolio.en.ts and resume.en.ts]
[Applies Decision Matrix from RESUME-STANDARDS.md]

I found a new project: "[Project Name]"

Based on the Decision Matrix:
✅ This is a client-facing, production project
✅ It demonstrates relevant skills
✅ It has measurable impact

Recommendation: YES, add to resume.

Suggested entry for Projects section:

**[Project Name]**
• [Achievement 1 with metric]
• [Achievement 2 with metric]
• [Achievement 3 with technology/impact]

Keywords: [Relevant technologies]

Would you like me to add this to your resume?
```

### Example 2: User wants to update resume

**User:** "Update my resume with latest portfolio changes"

**Kiro Response:**
```
Running portfolio-resume sync analysis...

[Executes sync-portfolio-to-resume.ts logic]

Found 2 items to add:

1. [PROJECT] New Medical Tourism Platform
   - Suggestion: Add to Work Experience highlights
   - Reason: Major production project with international impact

2. [SKILL] Cursor AI
   - Suggestion: Add to "AI-Assisted Development" skills
   - Reason: Used across multiple projects

Would you like me to:
a) Add both items
b) Review each individually
c) Show me the formatted suggestions first
```

## Integration with AI Workflows

Any AI-assisted resume update should use this steering file together with `RESUME-STANDARDS.md`, verify changes against the live portfolio data, and keep final edits reviewable by a human.

## File References

- **Standards:** `docs/RESUME-STANDARDS.md` (primary reference)
- **Research:** `docs/research/resume-research-2025.md` (full analysis)
- **AI Skills:** `docs/research/mension-ai-skills-in-resume-report.md` (AI importance)
- **Quick Guide:** `docs/resume-content-guide.md` (quick lookup)
- **Resume Data:** `app/data/resume.en.ts` (live data)
- **Portfolio Data:** `app/data/portfolio.en.ts` (source data)
- **Sync Script:** `scripts/sync-portfolio-to-resume.ts` (automation)

---

**Remember:** The goal is to make resume updates effortless, consistent, and standards-compliant, regardless of which AI agent or tool is being used.
