export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  href: string;
}

export interface BlogListItem {
  id: string;
  handle: string;
  main_image: string;
  subtitle: string;
  title: string;
}
export interface BlogList {
  blogs: BlogListItem[];
  count: number;
  limit: number;
  offset: number;
}

export interface Blog {
  author: string | null;
  meta_title: string;
  meta_description: string;
  handle: string;
  title: string;
  content: Record<string, unknown>;
  main_image: string;
}

export interface BlogResponse {
  data: Blog | null;
  ok: boolean;
}
