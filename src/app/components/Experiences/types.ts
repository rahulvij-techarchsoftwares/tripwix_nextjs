export interface ExperiencesProps {}

export interface ExperiencesActivityProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface ExperiencesAPIResultProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  activities: ExperiencesActivityProps[];
  destination: string;
  inclusions: [];
}

export interface ExperiencesAPIProps {
  total: number;
  results: ExperiencesAPIResultProps[];
}
