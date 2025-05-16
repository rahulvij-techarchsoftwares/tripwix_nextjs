export interface ArticlesSliderProps {}

interface Author {
  id: number;
  name: string;
  description: string;
  avatar: string;
}

interface Topic {
  id: number;
  title: string;
  content: string;
}

export interface ArticleResponseData {
  id: number;
  title: string;
  slug: string;
  tag: string;
  content: string;
  author: Author;
  related_destination: string;
  created_at: string;
  topics: Topic[];
  thumbnail: string;
  publication_date: string;
}

export interface ArticleCard {
  id: number;
  title: string;
  slug: string;
  tag: string;
  content: string;
  thumbnail: string;
}
