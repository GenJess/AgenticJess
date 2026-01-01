/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type CategoryId = 'finance' | 'development' | 'media' | 'vault' | 'library' | 'all-projects';

export type NavigationTarget = 'home' | CategoryId | 'playbook';

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
  hasDetailView?: boolean; // If true, clicking opens a custom view instead of just expanding
}

export interface LibraryItem {
    id: string;
    slug: string; // URL friendly ID
    type: 'tool' | 'resource' | 'instruction';
    title: string;
    description: string;
    content?: string; // For text/markdown
    component?: string; // identifier for dynamic rendering
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
  | { type: 'library' } // The Launcher Grid
  | { type: 'lab-tool', itemId: string } // Standalone Tool View
  | { type: 'lab-resource', itemId: string } // Standalone Resource View
  | { type: 'playbook' }
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