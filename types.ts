/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type CategoryId = 'finance' | 'development' | 'media' | 'vault' | 'library' | 'all-projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'finance' | 'development' | 'media';
  imageUrl: string;
  tags: string[];
  link?: string;
  mediaType?: 'image' | 'video' | 'audio';
  videoUrl?: string; 
  audioUrl?: string;
  duration?: string;
  author?: string;
  hasDetailView?: boolean;
  // Music specific
  bpm?: number;
  key?: string;
  aiPlatform?: 'Suno' | 'Producer.ai' | 'MusicLM';
  isGated?: boolean;
  promptData?: string;
  styleData?: string;
}

export interface LibraryItem {
    id: string;
    slug: string; 
    type: 'tool' | 'resource' | 'instruction';
    title: string;
    description: string;
    content?: string; 
    component?: string; 
    tags: string[];
    date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'section', categoryId: CategoryId }
  | { type: 'all-projects' }
  | { type: 'vault' }
  | { type: 'library' } 
  | { type: 'lab-tool', itemId: string } 
  | { type: 'lab-resource', itemId: string } 
  | { type: 'manifesto' };

export interface CategoryDef {
    id: CategoryId;
    label: string;
    description: string;
    color: string;
    number: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description: string;
    longDescription?: string;
    features: string[];
}

export interface JournalArticle {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    content: string;
}