/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type CategoryId = 'finance' | 'development' | 'media' | 'vault' | 'code' | 'all-projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'finance' | 'development' | 'media';
  imageUrl: string;
  tags: string[];
  link?: string;
  mediaType?: 'image' | 'video' | 'audio';
  videoUrl?: string; // URL to hosted video file
  audioUrl?: string; // URL to hosted audio file
  duration?: string;
  author?: string;
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
  | { type: 'code' };

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