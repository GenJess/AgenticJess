
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type CategoryId = 'dev' | 'ai' | 'finance' | 'blockchain' | 'media' | 'resources';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  imageUrl: string;
  tags: string[];
  link?: string;
  mediaType?: 'image' | 'video' | 'audio';
  duration?: string; // For audio/video
  author?: string;   // For audio
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'about' }
  | { type: 'section', categoryId: CategoryId };

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
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
