export const proxerMediaStati = ["COMPLETED", "CONSUMING", "PLANNED", "DROPPED"] as const;
export type ProxerMediaStatus = typeof proxerMediaStati[number];

export const proxerAnimeTypes = ["AnimeserieTV", "SpecialOVA", "Movie"] as const;
export type ProxerAnimeType = typeof proxerAnimeTypes[number];

export const proxerMangaTypes = [
  "Mangaserie",
  "One-Shot",
  "H-Manga",
  "MangaserieWebtoon",
  "One-ShotManhua",
  "MangaserieManhwa",
  "Doujinshi",
] as const;
export type ProxerMangaType = typeof proxerMangaTypes[number];

export type MediaType = "ANIME" | "MANGA";
export type ProxerContentType = ProxerAnimeType | ProxerMangaType;

export interface ProxerMedia {
  title: string;
  amountConsumed: number;
  totalCount: number;
  status: ProxerMediaStatus;
  contentType: ProxerContentType;
  mediaType: MediaType;
}

export interface SelectableProxerMedia extends ProxerMedia {
  isSelected: boolean;
}
