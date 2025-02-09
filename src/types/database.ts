export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  client_name: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author: string;
  company: string;
  content: string;
  rating: number;
  image_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface InternalProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  github_url?: string;
  tags: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
  created_at: string;
}
