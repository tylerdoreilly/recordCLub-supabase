export interface Club {
    id?: string;
    name?: string;
    description?: string;
    createdAt?: any;
    modifiedAt?: any;
    link?: string;
    imageUrl?: string;
    genres?: Genres;
    members?:Members[];
  }

export interface Genres {
    genreName?: string;
    description?: string;
}

export interface Members {
  displayName?: string;
  avatar?: string;
  userId?: string;
}