import cheerio from "cheerio";
import { ProxerAnime, proxerAnimeStati } from "../types/proxer";

export const getAnimesFromProxerHTML = (html: string): ProxerAnime[] => {
  const animes: ProxerAnime[] = [];

  const $ = cheerio.load(html);
  const animeTables = $("#box-table-a");

  animeTables.each((tableIndex, table) => {
    $(table)
      .find("tr[class^=entry]")
      .each((_, tableEntry) => {
        const data = $(tableEntry).find("td[valign=top]");

        const animeName = $(data.get(0)).text().trim();
        const episodes = $(data.get(3)).text().split(" / ");
        const animeType = $(data.get(1)).text();
        const animeStatus = proxerAnimeStati[tableIndex];

        animes.push({
          title: animeName,
          episodesWatched: parseInt(episodes[0], 10),
          episodesCount: parseInt(episodes[1], 10),
          type: animeType,
          status: animeStatus,
        });
      });
  });

  return animes;
};
