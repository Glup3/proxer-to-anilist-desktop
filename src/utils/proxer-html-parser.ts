import cheerio from "cheerio";
import { MediaType, ProxerContentType, ProxerMedia, proxerMediaStati } from "../types/proxer";

export const getMediasFromProxerHTML = (html: string): ProxerMedia[] => {
  const medias: ProxerMedia[] = [];

  const $ = cheerio.load(html);
  const mediaTables = $("#box-table-a");
  const mediaType = $("li.active").first().text();

  mediaTables.each((tableIndex, table) => {
    $(table)
      .find("tr[class^=entry]")
      .each((_, tableEntry) => {
        const data = $(tableEntry).find("td[valign=top]");

        const mediaName = $(data.get(0)).text().trim();
        const episodes = $(data.get(3)).text().split(" / ");
        const contentType = $(data.get(1)).text();
        const mediaStatus = proxerMediaStati[tableIndex];

        medias.push({
          title: mediaName,
          amountConsumed: parseInt(episodes[0], 10),
          totalCount: parseInt(episodes[1], 10),
          contentType: contentType as ProxerContentType,
          status: mediaStatus,
          mediaType: mediaType as MediaType,
        });
      });
  });

  return medias;
};
