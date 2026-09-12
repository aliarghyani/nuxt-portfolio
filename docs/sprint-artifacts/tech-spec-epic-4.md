# Epic Technical Specification: Resume Content Guidelines

Date: 2025-12-01  
Author: ali  
Epic ID: 4  
Status: Draft

---

## Overview

Epic 4 delivers a concise Markdown reference guide for resume content writing based on the comprehensive research in `docs/research/resume-research-2025.md`. This creates a quick-reference document for use while writing resume content.

**Key Value:** Quick reference while writing resume content, ensuring alignment with 2025 best practices without re-reading the full research document.

## Objectives and Scope

**In Scope:**
- Markdown reference guide with extracted best practices
- Section-specific tips and formulas
- Action verbs categorized by use case
- ATS checklist items
- Outdated practices to avoid
- Quantification templates

**Out of Scope:**
- TypeScript data structures (not needed for reference use)
- UI components (future)
- Interactive checklist (future)

## Source Tree Changes

| File | Action | Description |
|------|--------|-------------|
| `docs/resume-content-guide.md` | CREATE | Quick reference guide extracted from research |

## Content Structure

The guide will include:

1. **Key Statistics** - Numbers that drive resume strategy
2. **Section Order** - Recommended order by career stage
3. **Professional Summary Formula** - 3-line formula with examples
4. **Action Verbs** - Strong verbs categorized by use case
5. **Quantification Templates** - Templates for metrics by category
6. **ATS Checklist** - 20-item optimization checklist
7. **What to Avoid** - Clichés and outdated practices

## Acceptance Criteria

### AC1: Guide Created
**Given** the guide file exists at `docs/resume-content-guide.md`  
**When** I open it  
**Then** it contains all key extracted content from research

### AC2: Actionable Content
**Given** I'm writing resume content  
**When** I reference the guide  
**Then** I can quickly find relevant tips, verbs, and templates

### AC3: Complete Coverage
**Given** the guide  
**When** I review it  
**Then** it covers: statistics, section order, summary formula, action verbs, quantification templates, ATS checklist, and things to avoid

## Story Breakdown

### Story 4.1: Create Resume Content Guide

**Description:** Create Markdown reference guide with extracted best practices from resume research.

**Acceptance Criteria:**
- [ ] `docs/resume-content-guide.md` created
- [ ] All key content from research is captured
- [ ] Easy to scan and reference

**File to Create:**
- `docs/resume-content-guide.md`

---

_Generated from technical specification notes_  
_Date: 2025-12-01_  
_For: ali_
