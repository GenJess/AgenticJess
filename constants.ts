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
  // DEVELOPMENT
  {
    id: 'd0',
    title: 'The No-Code CTO Strategy',
    description: 'Strategic analysis on "MVP Hacking" and the Agentic Economy. Why building a MicroGate is better than building a SaaS.',
    category: 'development',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    tags: ['Strategy', 'Architecture', 'Manifesto'],
    mediaType: 'image',
    hasDetailView: true
  },
  
  // FINANCE
  {
    id: 'f1',
    title: 'Automated Execution Bots',
    description: 'A suite of trading bots deployed on Hummingbot and Quadency. Custom indicators triggering server-side webhooks.',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80',
    tags: ['Python', 'Webhooks', 'Hummingbot'],
    mediaType: 'image'
  },

  // MEDIA - MUSIC HUB
  {
    id: 'm-song-1',
    title: 'Cybernetic Dreams',
    description: 'A dark synthwave exploration of autonomous identity.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80',
    tags: ['Synthwave', 'Dark', 'AI'],
    mediaType: 'audio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '3:45',
    bpm: 124,
    key: 'Cm',
    aiPlatform: 'Suno',
    isGated: true,
    promptData: 'Cinematic synthwave, heavy analog bass, moog-style leads, 80s dystopian atmosphere, high fidelity, 124bpm.',
    styleData: 'Suno v3.5 // Prompt: "A lonely robot walking through a neon Tokyo rain"'
  },
  {
    id: 'm-song-2',
    title: 'Liquid Capital',
    description: 'Lo-fi beats for high-frequency trading sessions.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80',
    tags: ['Lo-Fi', 'Chill', 'HFT'],
    mediaType: 'audio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '2:15',
    bpm: 88,
    key: 'Am',
    aiPlatform: 'Producer.ai',
    isGated: true,
    promptData: 'Lo-fi hip hop, dusty drum breaks, Rhodes piano chords, vinyl crackle, 88bpm, relaxed but focused.',
    styleData: 'Producer.ai // Model: LiquidGold_v2'
  },
  {
    id: 'm-song-3',
    title: 'Neural Pulse',
    description: 'Techno artifact generated from latent space vectors.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80',
    tags: ['Techno', 'Generative'],
    mediaType: 'audio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:10',
    bpm: 132,
    key: 'F#m',
    aiPlatform: 'Suno',
    isGated: false
  },
  {
    id: 'm-art-1',
    title: 'Chrome Void',
    description: 'Surreal digital art sculpture.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80',
    tags: ['3D', 'Blender'],
    mediaType: 'image'
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
        description: 'Instant estimation of input/output costs for Flash & Pro models.',
        component: 'TokenCalculator',
        tags: ['Utility', 'Gemini', 'Cost'],
        date: '2025-05-15'
    }
];