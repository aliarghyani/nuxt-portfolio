// AI Stack dataset: categories, item schema, and curated initial items
// This file is self-contained to avoid modifying global types.

export type AiCategory =
  | 'method'
  | 'ide'
  | 'assistant'
  | 'rule'
  | 'mcp'
  | 'extension'
  | 'infra'
  | 'evaluation'

export type AiGroup =
  | 'ide_dev'
  | 'protocols'
  | 'concepts'
  | 'approaches'

export const AI_GROUPS: readonly AiGroup[] = [
  'ide_dev',
  'protocols',
  'concepts',
  'approaches'
] as const

export type AiItemLinkset = {
  setup?: string
  rules?: string
  example?: string
}

export type AiItem = {
  id: string
  name: string
  category: AiCategory
  group: AiGroup
  icon?: string
  shortWhy?: string
  links?: AiItemLinkset
  tags?: string[]
  featured?: boolean
  heat?: number
}

export const AI_CATEGORIES: readonly AiCategory[] = [
  'method',
  'ide',
  'assistant',
  'rule',
  'mcp',
  'extension',
  'infra',
  'evaluation'
] as const

export const aiStackItems: AiItem[] = [
  // Concepts and methodologies
  {
    id: 'method-bmad',
    name: 'BMAD Method',
    category: 'method',
    group: 'concepts',
    icon: 'i-twemoji-jigsaw',
    shortWhy: 'Outcome-driven orchestration with one-tool-per-step discipline',
    tags: ['bmad', 'workflow', 'governance']
  },
  {
    id: 'method-openspec',
    name: 'Spec-Driven Development',
    category: 'method',
    group: 'concepts',
    icon: 'i-twemoji-open-book',
    shortWhy: 'Develop AI systems guided by specification before execution',
    tags: ['spec', 'planning']
  },
  {
    id: 'concepts-hitl',
    name: 'Human-In-The-Loop',
    category: 'method',
    group: 'concepts',
    icon: 'i-twemoji-handshake',
    shortWhy: 'Integrate human oversight to improve outputs and control model decisions',
    tags: ['concept', 'quality']
  },
  {
    id: 'concepts-agent-coordination',
    name: 'Agent-Based Coordination',
    category: 'method',
    group: 'concepts',
    icon: 'i-twemoji-people-holding-hands',
    shortWhy: 'Coordinate multiple agents to accomplish complex goals',
    tags: ['agents', 'coordination']
  },
  {
    id: 'concepts-token-budget',
    name: 'Token Budget Management',
    category: 'method',
    group: 'concepts',
    icon: 'i-twemoji-abacus',
    shortWhy: 'Strategically manage context and token usage for LLMs',
    tags: ['tokens', 'context']
  },

  // IDE / Development Environments
  {
    id: 'ide-vscode',
    name: 'VSCode',
    category: 'ide',
    group: 'ide_dev',
    icon: 'i-logos-visual-studio-code',
    shortWhy: 'Popular, professional IDE for coding and AI projects',
    tags: ['ide', 'vscode']
  },
  {
    id: 'ide-kiro',
    name: 'Kiro',
    category: 'ide',
    group: 'ide_dev',
    icon: 'i-twemoji-brain',
    shortWhy: 'Intelligent editor and environment for AI software development',
    tags: ['ide', 'kiro']
  },
  {
    id: 'ide-cursor',
    name: 'Cursor',
    category: 'ide',
    group: 'ide_dev',
    icon: 'i-twemoji-sparkles',
    shortWhy: 'AI-native IDE with rules and repo-aware edits',
    tags: ['ide', 'cursor']
  },
  {
    id: 'ide-roocode',
    name: 'RooCode',
    category: 'ide',
    group: 'ide_dev',
    icon: 'i-twemoji-robot',
    shortWhy: 'Auto-planning agents for repo-wide diffs',
    tags: ['ide', 'agents']
  },
  {
    id: 'ide-qoder',
    name: 'Qoder',
    category: 'ide',
    group: 'ide_dev',
    icon: 'i-twemoji-rocket',
    shortWhy: 'Team collaboration and fast AI-powered coding environment',
    tags: ['ide', 'qoder']
  },

  // Protocols & Standards (MCP)
  {
    id: 'protocols-mcp',
    name: 'MCP (Machine Collaboration Protocol)',
    category: 'mcp',
    group: 'protocols',
    icon: 'i-twemoji-globe-with-meridians',
    shortWhy: 'Collaboration and coordination protocol for multi-agent AI projects',
    tags: ['mcp', 'protocol']
  },
  {
    id: 'mcp-context7',
    name: 'Context7 MCP',
    category: 'mcp',
    group: 'protocols',
    icon: 'i-twemoji-open-book',
    shortWhy: 'Retrieve up-to-date docs and examples for libraries',
    tags: ['mcp', 'context7']
  },
  {
    id: 'mcp-playwright',
    name: 'Playwright MCP',
    category: 'mcp',
    group: 'protocols',
    icon: 'i-logos-playwright',
    shortWhy: 'Browser automation and testing via MCP-compatible server',
    tags: ['mcp', 'playwright']
  },
  {
    id: 'mcp-chrome-devtools',
    name: 'Chrome DevTools MCP',
    category: 'mcp',
    group: 'protocols',
    icon: 'i-logos-chrome',
    shortWhy: 'Control Chrome DevTools for inspection and performance via MCP',
    tags: ['mcp', 'chrome']
  },
  {
    id: 'mcp-browsertools',
    name: 'BrowserTools MCP',
    category: 'mcp',
    group: 'protocols',
    icon: 'i-twemoji-globe-with-meridians',
    shortWhy: 'General browser tools MCP for automation and scraping',
    tags: ['mcp', 'browser']
  },

  // Emerging approaches
  {
    id: 'approaches-context-management',
    name: 'Context Management',
    category: 'method',
    group: 'approaches',
    icon: 'i-twemoji-card-index-dividers',
    shortWhy: 'Control and retain context and memory for long-running agent interactions',
    tags: ['context', 'memory']
  },
  {
    id: 'approaches-agent-orchestration',
    name: 'Agent Orchestration',
    category: 'method',
    group: 'approaches',
    icon: 'i-twemoji-ringed-planet',
    shortWhy: 'Coordinate groups of agents to solve multi-step or complex tasks',
    tags: ['agents', 'orchestration']
  },
  {
    id: 'approaches-cot',
    name: 'Chain-of-Thought Reasoning',
    category: 'method',
    group: 'approaches',
    icon: 'i-twemoji-thought-balloon',
    shortWhy: 'Step-by-step reasoning and analysis with language models',
    tags: ['reasoning']
  },
  {
    id: 'approaches-prompt-engineering',
    name: 'Prompt Engineering Tools/Techniques',
    category: 'method',
    group: 'approaches',
    icon: 'i-twemoji-hammer-and-wrench',
    shortWhy: 'Craft and evaluate prompts to achieve precise, targeted model outputs',
    tags: ['prompting']
  }
]
