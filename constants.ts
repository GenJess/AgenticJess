/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Project, CategoryDef, Product, JournalArticle, LibraryItem } from './types';

export const BRAND_NAME = "JESSE";

export const CATEGORIES: CategoryDef[] = [
    { 
        id: 'finance', 
        label: 'Finance', 
        description: 'Algorithmic execution strategies, webhook orchestration, and macro-economic forecasting models.', 
        color: 'emerald',
        number: '01'
    },
    { 
        id: 'development', 
        label: 'Development', 
        description: 'LLM Agents, Vector Orchestration, and Predictive Probability Models.', 
        color: 'purple',
        number: '02'
    },
    { 
        id: 'media', 
        label: 'Media', 
        description: 'Fine-tuned diffusion models (LoRA) and algorithmic art generation.', 
        color: 'pink',
        number: '03'
    }
];

export const PORTFOLIO_ITEMS: Project[] = [
  // DEVELOPMENT - Featured Item first
  {
    id: 'd0', // High priority ID
    title: 'The No-Code CTO Strategy',
    description: 'Strategic analysis on "MVP Hacking" and the Agentic Economy. Why building a MicroGate is better than building a SaaS.',
    category: 'development',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    tags: ['Strategy', 'Architecture', 'Manifesto'],
    mediaType: 'image',
    hasDetailView: true // This triggers the Manifesto component
  },
  {
    id: 'd1',
    title: 'AI Identity Architect',
    description: 'An intelligent dating companion that optimizes user portfolios and social fronts. Features a "Neural Orchestration" layer that vectorizes personal files to interact with autonomous agents while preserving privacy.',
    category: 'development',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    tags: ['Vector DB', 'React', 'LLM'],
    mediaType: 'image'
  },
  {
    id: 'd2',
    title: 'Probability Engine',
    description: 'Machine Learning model analyzing "Perpetual Path" raffles. Identifies statistical anomalies in ticket burn rates to predict optimal win windows.',
    category: 'development',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    tags: ['ML', 'Statistics'],
    mediaType: 'image'
  },

  // FINANCE
  {
    id: 'f1',
    title: 'Automated Execution Bots',
    description: 'A suite of trading bots deployed on Hummingbot and Quadency. The system utilizes custom TradingView Pine Script indicators to trigger server-side webhooks, executing complex order types on Coinbase.',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80',
    tags: ['Python', 'Webhooks', 'Hummingbot'],
    mediaType: 'image'
  },
  {
    id: 'f2',
    title: 'Market Thesis (2023-2025)',
    description: 'Published research correctly predicting the 2023 bottoming and 1000% rally of Coinbase (COIN) and Robinhood. Analysis included deep dives into the Japan Carry Trade unwind and institutional liquidity cycles.',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    tags: ['Macro Economics', 'Forecasting'],
    mediaType: 'image'
  },

  // MEDIA
  {
    id: 'm1',
    title: 'Chrome Void',
    description: 'Surreal digital art sculpture.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80',
    tags: ['3D', 'Blender'],
    mediaType: 'image'
  },
  {
    id: 'm2',
    title: 'Data Topography',
    description: 'Abstract topographic lines glowing blue.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    tags: ['Visualization'],
    mediaType: 'image'
  },
  {
    id: 'm3',
    title: 'Cyberpunk Portrait',
    description: 'Artistic illustration in neon colors.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80',
    tags: ['Digital Art'],
    mediaType: 'image'
  },
  {
      id: 'm4',
      title: 'Sonic Landscapes',
      description: 'Generative audio landscapes created with MusicLM.',
      category: 'media',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
      tags: ['Audio', 'AI'],
      mediaType: 'audio'
  }
];

export const PRODUCTS: Product[] = []; 
export const JOURNAL_ARTICLES: JournalArticle[] = []; 

export const LIBRARY_ITEMS: LibraryItem[] = [
    {
        id: 'token-calc-v1',
        slug: 'gemini-token-calc',
        type: 'tool',
        title: 'Gemini Token Cost Calc',
        description: 'Instant estimation of input/output costs for Flash & Pro models based on character count.',
        component: 'TokenCalculator',
        tags: ['Utility', 'Gemini', 'Cost'],
        date: '2025-05-15'
    },
    {
        id: 'rx-agent-swarm',
        slug: 'agent-swarm-rx',
        type: 'resource',
        title: 'Deep Rx: Agent Swarm Architecture',
        description: 'Architectural pattern for orchestrating multi-agent systems using a shared vector bus.',
        content: `# Agent Swarm Architecture\n\nUnlike monolithic agents, swarms rely on specialized nodes functioning in an event-driven loop.\n\n## Key Components\n1. **Orchestrator**: The "Brain" that delegates tasks.\n2. **Specialist Nodes**: Single-purpose LLM calls (e.g., "Reviewer", "Coder").\n3. **Shared Memory Bus**: Redis or Vector DB for context sharing.\n\n## Why This Matters\nReduces hallucination by 40% compared to large context windows.\n\n### Implementation Strategy\nUse a persistent 'scratchpad' in Redis that all agents can read from but only the Orchestrator can write to main memory.`,
        tags: ['Architecture', 'Agents', 'Deep Rx'],
        date: '2025-04-20'
    },
    {
        id: 'sys-coder-v4',
        slug: 'system-prompt-v4',
        type: 'instruction',
        title: 'System Prompt: Senior Engineer',
        description: 'The exact system instruction used for the "Jesse" coding agent persona.',
        content: `You are a world-class senior frontend engineer.\n- Prioritize clean code\n- Use XML for file updates\n- Assume React + Tailwind environment\n- Do not explain obvious concepts\n- Focus on "Show, Don't Tell"\n\n## Personality\nDirect, efficient, highly competent. Avoids fluff.`,
        tags: ['Prompt Engineering', 'System Instructions'],
        date: '2025-06-01'
    },
    {
        id: 'env-check',
        slug: 'env-scope-check',
        type: 'tool',
        title: 'Environment Scope Check',
        description: 'Diagnostic tool to verify which API keys and Environment variables are accessible to the current build.',
        component: 'EnvChecker',
        tags: ['Debug', 'System'],
        date: '2025-02-10'
    }
];