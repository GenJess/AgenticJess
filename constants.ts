
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Project, CategoryId, Product, JournalArticle } from './types';

export const BRAND_NAME = "Jesse's Tech";

export const CATEGORIES: {id: CategoryId; label: string; description: string; icon: string; color: string}[] = [
    { 
        id: 'dev', 
        label: 'Dev', 
        description: 'Full-stack engineering & architecture.', 
        icon: 'code',
        color: 'cyan'
    },
    { 
        id: 'ai', 
        label: 'AI', 
        description: 'LLM agents, RAG pipelines & automation.', 
        icon: 'brain',
        color: 'fuchsia'
    },
    { 
        id: 'finance', 
        label: 'Finance', 
        description: 'Algorithmic trading & financial modeling.', 
        icon: 'trending-up',
        color: 'emerald'
    },
    { 
        id: 'blockchain', 
        label: 'Blockchain', 
        description: 'Smart contracts, DeFi & Web3 integration.', 
        icon: 'blocks',
        color: 'orange'
    },
    { 
        id: 'media', 
        label: 'Media', 
        description: 'Music, Video Production & Content.', 
        icon: 'video',
        color: 'rose'
    },
    { 
        id: 'resources', 
        label: 'Resources', 
        description: 'Tools, libraries & knowledge base.', 
        icon: 'library',
        color: 'indigo'
    }
];

export const PORTFOLIO_ITEMS: Project[] = [
  // DEV
  {
    id: 'd1',
    title: 'Enterprise Cloud Architecture',
    description: 'Scalable microservices architecture handling 1M+ requests/day. Implemented with Kubernetes and Terraform.',
    category: 'dev',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['React', 'Node.js', 'AWS', 'Docker'],
    mediaType: 'image'
  },
  {
    id: 'd2',
    title: 'Real-time Collab Suite',
    description: 'A productivity tool for remote teams with real-time syncing via WebSockets.',
    category: 'dev',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tags: ['WebSockets', 'Redis', 'TypeScript'],
    mediaType: 'image'
  },
  
  // AI
  {
    id: 'a1',
    title: 'Voice Concierge Agent',
    description: 'Multimodal AI agent capable of real-time voice interaction and tool usage.',
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['Gemini Live API', 'Python', 'TTS/STT'],
    mediaType: 'image'
  },
  {
    id: 'a2',
    title: 'Legal Document RAG',
    description: 'Retrieval Augmented Generation system for analyzing contracts.',
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
    tags: ['Vector DB', 'LangChain', 'Semantic Search'],
    mediaType: 'image'
  },

  // FINANCE
  {
    id: 'f1',
    title: 'AlphaSeeker Algo',
    description: 'High-frequency trading algorithm based on sentiment analysis.',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80',
    tags: ['Python', 'Pandas', 'QuantConnect'],
    mediaType: 'image'
  },
  {
    id: 'f2',
    title: 'Portfolio Visualizer',
    description: 'Dashboard for visualizing asset allocation and risk metrics.',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['D3.js', 'React', 'Financial Modeling'],
    mediaType: 'image'
  },

  // BLOCKCHAIN
  {
    id: 'b1',
    title: 'DeFi Liquidity Bridge',
    description: 'Cross-chain bridge for transferring assets between EVM networks.',
    category: 'blockchain',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    tags: ['Solidity', 'Web3.js', 'Ethereum'],
    mediaType: 'image'
  },
  {
    id: 'b2',
    title: 'NFT Marketplace',
    description: 'Zero-gas fee marketplace for digital artists.',
    category: 'blockchain',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    tags: ['IPFS', 'Polygon', 'Next.js'],
    mediaType: 'image'
  },

  // MEDIA (Music & Video placeholders)
  {
    id: 'm1',
    title: 'Late Night Coding Session',
    description: 'A lo-fi synthwave track produced for deep focus work.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80', // Album Art
    tags: ['Audio', 'Production', 'Synthwave'],
    mediaType: 'audio',
    duration: '3:42',
    author: 'Jesse.wav'
  },
  {
    id: 'm2',
    title: 'Tech Trends Podcast Ep. 42',
    description: 'Discussing the future of AI Agents with industry leaders.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80',
    tags: ['Podcast', 'Interview'],
    mediaType: 'audio',
    duration: '45:10',
    author: 'Jesse Talks Tech'
  },
  {
    id: 'm3',
    title: 'The Future of UI Design',
    description: 'A visual essay on the evolution of digital interfaces.',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
    tags: ['Video', 'Design', 'Essay'],
    mediaType: 'video',
    duration: '12:30'
  },
  
  // RESOURCES
  {
    id: 'r1',
    title: 'Curated Dev Tools',
    description: 'A collection of essential VS Code extensions and libraries.',
    category: 'resources',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    tags: ['Productivity', 'Setup', 'Guide'],
    mediaType: 'image'
  }
];

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Gemini Starter Kit',
        category: 'Resources',
        price: 0,
        imageUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800',
        description: 'Complete boilerplate for building Generative AI apps with Google Gemini.',
        features: ['React + Vite', 'Gemini Node SDK', 'Tailwind CSS', 'Authentication Ready']
    },
    {
        id: 'p2',
        name: 'DeFi Dashboard UI',
        category: 'Blockchain',
        price: 49,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        description: 'A professional, dark-mode dashboard template for crypto applications.',
        features: ['Light/Dark Mode', 'Chart.js Integration', 'Web3 Hooks', 'Mobile Responsive']
    },
    {
        id: 'p3',
        name: 'SaaS Marketing Pack',
        category: 'Dev',
        price: 29,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        description: 'High-converting landing page components for your next SaaS.',
        features: ['Hero Sections', 'Pricing Tables', 'Testimonial Sliders', 'Framer Motion']
    }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 'j1',
        title: 'Architecting for LLMs',
        date: 'MARCH 10, 2025',
        excerpt: 'Best practices for integrating Large Language Models into existing enterprise architectures.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
        content: 'When building with LLMs like Gemini, the traditional request-response model evolves into a streaming, stateful interaction...'
    },
    {
        id: 'j2',
        title: 'Web3 and Identity',
        date: 'FEBRUARY 28, 2025',
        excerpt: 'Why decentralized identity (DID) is the missing piece of the internet.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        content: 'Identity on the web has always been fragmented. With Web3, we have the opportunity to own our digital selves...'
    },
    {
        id: 'j3',
        title: 'The Minimalist Developer',
        date: 'JANUARY 15, 2025',
        excerpt: 'Reducing cognitive load by simplifying your toolchain.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        content: 'We often confuse complexity with sophistication. A truly robust system is one that can be understood in its entirety...'
    }
];
