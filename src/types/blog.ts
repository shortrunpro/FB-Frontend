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
