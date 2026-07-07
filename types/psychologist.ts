export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  about: string;
  initial_consultation: string;
  reviews: Review[];
}
