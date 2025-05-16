export interface ComponentAPIProps {
  slug: string;
  data: {
    images: { value: { image: string }[] };
    title: { value: string };
    subtitle: { value: string };
    description: { value: string };
  };
}

export interface ImageAPIProps {
  image: string;
}

export interface SearchParams {
  [key: string]: string;
}
