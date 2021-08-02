import React, { Fragment, FunctionComponent, useCallback, useState } from "react";
import { MediaType, ProxerMedia } from "../types/proxer";
import { getMediasFromProxerHTML } from "../utils/proxer-html-parser";
import { ProxerListUpload } from "./ProxerListUpload";

export const App: FunctionComponent<{}> = () => {
  const [proxerAnimes, setProxerAnimes] = useState<ProxerMedia[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) {
      return;
    }

    const proxerHTML = await acceptedFiles[0].text();
    const medias = getMediasFromProxerHTML(proxerHTML);

    setProxerAnimes(medias);
    setMediaType(medias[0]?.mediaType);
  }, []);

  return (
    <main>
      <ProxerListUpload onDrop={onDrop} />
      <h2>Length: {proxerAnimes.length}</h2>
      {proxerAnimes.length === 0 ? (
        <h2>No {mediaType ?? "Media"} found!</h2>
      ) : (
        <Fragment>
          <h2>{mediaType}</h2>
          <ul>
            {proxerAnimes.map((anime, index) => (
              <li key={index}>
                {anime.title} - {anime.mediaType} - {anime.contentType}
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </main>
  );
};
