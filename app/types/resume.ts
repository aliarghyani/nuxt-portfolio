/**
 * Resume TypeScript Interfaces
 * Based on JSON Resume schema (modified)
 * @see https://jsonresume.org/schema/
 */

export interface ResumeBasics {
  name: string
  label: string // Job title
  email: string
  url?: string
  image?: string // Profile photo URL
  location: {
    city: string
    country: string
  }
  profiles: Array<{
    network: string // LinkedIn, GitHub, etc.
    url: string
    icon?: string // Iconify icon name
  }>
  summary: string
}

export interface WorkExperience {
  company: string
  position: string
  location?: string // City, Country or Remote
  startDate: string // YYYY-MM format
  endDate?: string // YYYY-MM or undefined for "Present"
  highlights: string[] // Bullet points
}

export interface Education {
  institution: string
  area: string // Field of study
  studyType: string // Degree type
  startDate: string // YYYY-MM format
  endDate?: string // YYYY-MM format
  courses?: string[] // Relevant coursework
}

export interface Skill {
  name: string // Category name
  keywords: string[] // Individual skills
}

export interface Language {
  language: string
  fluency: string // Native, Fluent, Intermediate, Basic, or custom (e.g., "Fluent (Duolingo 85/100)")
}

export interface Certification {
  name: string
  issuer: string
  date: string // YYYY or YYYY-MM format
  url?: string // Certificate URL
  summary?: string // Additional details (e.g., score)
}

export interface Project {
  name: string
  description: string
  highlights?: string[]
  keywords?: string[]
  startDate?: string
  endDate?: string
  url?: string
  roles?: string[]
  type?: string
}

export interface Resume {
  basics: ResumeBasics
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages?: Language[]
  certificates?: Certification[]
  projects?: Project[]
}
