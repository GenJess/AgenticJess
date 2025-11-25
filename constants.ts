/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Project, CategoryId, CategoryDef, Product, JournalArticle } from './types';

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

  // DEVELOPMENT
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

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Aura One',
        price: 299,
        category: 'Audio',
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80',
        description: 'Noise-cancelling headphones made from recycled aluminum and organic cotton.',
        longDescription: 'The Aura One reimagines the relationship between sound and silence. Crafted from recycled aluminum and breathable organic cotton, it delivers industry-leading noise cancellation without the pressure.',
        features: ['Active Noise Cancellation', '30h Battery Life', 'Organic Cotton Earcups']
    },
    {
        id: 'p2',
        name: 'Aura Home',
        price: 150,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80',
        description: 'Smart speaker with a natural stone finish.',
        longDescription: 'Brings music to life in any room with its 360-degree sound. The natural stone casing makes every unit unique.',
        features: ['360 Sound', 'Voice Control', 'Natural Sandstone']
    },
    {
        id: 'p3',
        name: 'Aura Watch',
        price: 399,
        category: 'Wearable',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
        description: 'Minimalist activity tracker with E-ink display.',
        longDescription: 'Stay connected to yourself with the Aura Watch. Its always-on E-ink display respects your attention while tracking what matters.',
        features: ['E-ink Display', 'Heart Rate Monitor', 'Sleep Tracking']
    },
    {
        id: 'p4',
        name: 'Aura Mini',
        price: 89,
        category: 'Mobile',
        imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80',
        description: 'Pocket-sized companion for quick notes and ideas.',
        longDescription: 'The perfect digital notebook. No distractions, just your thoughts and the cloud.',
        features: ['E-ink Screen', 'Stylus Support', 'Cloud Sync']
    }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 'j1',
        title: 'The Art of Silence',
        date: 'Oct 12, 2023',
        excerpt: 'Exploring why quiet is the new luxury in a noisy world.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
        content: 'In a world that constantly demands our attention, silence has become a rare commodity. At Aura, we believe that technology should not add to the noise, but help reduce it.'
    },
    {
        id: 'j2',
        title: 'Sustainable by Design',
        date: 'Sep 28, 2023',
        excerpt: 'How we source materials that age with grace.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
        content: 'We reject the disposable culture of modern electronics. By using materials like unpolished aluminum and natural sandstone, our products are designed to develop a unique patina over time.'
    },
    {
        id: 'j3',
        title: 'Disconnected',
        date: 'Sep 15, 2023',
        excerpt: 'Why we need time away from screens.',
        image: 'https://images.unsplash.com/photo-1526725702345-bdda2b97ef73?auto=format&fit=crop&q=80',
        content: 'True creativity often happens when we are bored. When we step away from the glowing rectangles, we allow our minds to wander and find new connections.'
    }
];