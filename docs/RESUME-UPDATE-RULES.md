# Resume Update Rules

> **Give this file to any AI agent to update resume**  
> Short, simple workflow with file references.

---

## 🎯 For AI Agents

When user asks to update resume, follow this workflow:

### **Step 1: Load Required Files**

Read these files in order:
1. `docs/RESUME-STANDARDS.md` - All standards, rules, and Decision Matrix
2. `app/data/portfolio.ts` - Source data (what user has done)
3. `app/data/resume.en.ts` - Target data (what needs updating)

### **Step 2: Compare & Analyze**

Find differences:
- New projects in portfolio not in resume?
- New skills in portfolio not in resume?
- New work experience or changes?

### **Step 3: Apply Decision Matrix**

Use Decision Matrix from `RESUME-STANDARDS.md`:
- Should this be in resume? (Yes/No)
- Where? (Summary, Work, Skills, Projects)
- How? (Apply content transformation rules)

### **Step 4: Generate Suggestions**

Follow rules from `RESUME-STANDARDS.md`:
- Use action verbs (Architected, Optimized, Led)
- Use metrics only with a credible source and a clear scope. Otherwise name the deliverable and observed result.
- Mention AI tools with context
- Avoid clichés ("results-driven", "team player")
- Follow 3-line formula for summaries
- Achievement-first for work experience

### **Step 5: Validate**

Run Pre-Commit Checklist from `RESUME-STANDARDS.md`:
- [ ] Action verbs used
- [ ] All numerical claims can be traced to evidence
- [ ] AI tools mentioned with context
- [ ] No clichés
- [ ] 2-page limit (~1000 words)
- [ ] ATS-compliant

### **Step 6: Present**

Show user:
1. What changed in portfolio
2. What to add/update in resume
3. Formatted suggestions
4. Validation results

---

## 📋 For Humans

### **Quick Command:**

**With any AI (Kiro, Claude, ChatGPT, Cursor, Gemini):**
```
"Read docs/RESUME-UPDATE-RULES.md and update my resume"
```

### **Workflow:**

1. Update `app/data/portfolio.ts` (add project/skill/job)
2. Give this file to AI
3. AI loads required files and compares
4. AI suggests updates following standards
5. Review and approve
6. Done!

---

## 📚 File References

**Standards & Rules:**
- `docs/RESUME-STANDARDS.md` - Complete standards (AI reads this)
- `docs/resume-content-guide.md` - Quick reference

**Data Files:**
- `app/data/portfolio.ts` - Source (update this first)
- `app/data/resume.en.ts` - Target (AI updates this)

**Research (optional):**
- `docs/research/resume-research-2025.md` - Full research
- `docs/research/mension-ai-skills-in-resume-report.md` - AI skills

**Steering (for Kiro):**
- `.kiro/steering/resume-sync.md` - Kiro-specific guidance

---

## 🔄 Workflow Summary

```
1. Update portfolio.ts
   ↓
2. Tell AI: "Read docs/RESUME-UPDATE-RULES.md and update my resume"
   ↓
3. AI loads files → compares → applies rules → validates
   ↓
4. Review suggestions
   ↓
5. Approve
   ↓
6. Done! ✅
```

---

## 💡 Key Points

- **Always update portfolio first** before resume
- **AI reads RESUME-STANDARDS.md** for all rules
- **Decision Matrix** determines what goes in resume
- **Validation** ensures quality before presenting
- **Simple command** works with any AI agent

---

**Questions?** → AI will read `RESUME-STANDARDS.md` for details

**Last Updated:** December 2025
