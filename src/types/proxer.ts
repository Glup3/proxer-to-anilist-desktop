export const proxerAnimeStati = ["COMPLETED", "WATCHING", "PLANNED", "DROPPED"] as const;
export type ProxerAnimeStatus = typeof proxerAnimeStati[number];

export const proxerAnimeTypes = ["AnimeserieTV", "SpecialOVA", "Movie"] as const;
export type ProxerAnimeType = typeof proxerAnimeTypes[number];

export interface ProxerAnime {
  title: string;
  episodesWatched: number;
  episodesCount: number;
  status: ProxerAnimeStatus;
  type: ProxerAnimeType | string;
}
