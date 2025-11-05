export type SocialLinks = Partial<{
  website: string
  github: string
  linkedin: string
  twitter: string
  x: string
  email: string
  telegram: string
  instagram: string
  whatsapp: string
  spotify: string
  bento: string
}>

export type Profile = {
  name: string
  title: string
  location?: string
  summary: string
  avatar?: string
  socials?: SocialLinks
}

export type SkillType =
  | 'Language'
  | 'Framework'
  | 'Library'
  | 'Tool'
  | 'Service'
  | 'DevOps'
  | 'Testing'
  | 'Data'

export const SKILL_TYPES: readonly SkillType[] = [
  'Language',
  'Framework',
  'Library',
  'Tool',
  'Service',
  'DevOps',
  'Testing',
  'Data'
] as const

export type Tag = {
  label: string
  icon?: string
  description?: string
  to?: string
  type?: SkillType
}

export type TagGroup = {
  title: string
  items: Tag[]
}

// Backward-compatible single-position experience
export type Experience = {
  company: string
  role: string
  start: string
  end?: string
  ongoing?: boolean
  description: string[]
  icons?: string[]
  location?: string
  type?: string // e.g., Full-time, Self-employed
  link?: string
  linkLabel?: string
  logo?: string
}

// Position inside a company timeline (LinkedIn-style)
export type Position = {
  title: string
  start: string
  end?: string
  ongoing?: boolean
  description: string[]
  icons?: string[]
  location?: string
  type?: string
  link?: string
  linkLabel?: string
  logo?: string
}

// Company grouping multiple positions
export type CompanyExperience = {
  company: string
  link?: string
  logo?: string
  location?: string
  type?: string
  positions: Position[]
}

export type Education = {
  school: string
  degree: string
  start: string
  end: string
  icons?: string[]
  logo?: string
}

export type Project = {
  name: string
  description: string
  status?: string
  links?: { label: string; to: string; icon?: string }[]
  icons?: string[]
  thumbnail?: string
  opensource?: boolean
  category?: 'current' | 'freelance' | 'public'
}

export type PortfolioData = {
  profile: Profile
  mainTools: TagGroup
  roles: TagGroup
  values: TagGroup
  // Supports both single experiences and grouped company timelines
  experiences: Array<Experience | CompanyExperience>
  education: Education[]
  projects: Project[]
}
