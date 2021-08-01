import React, { FunctionComponent, useCallback, useState } from "react";
import { ProxerAnime } from "../types/proxer";
import { getAnimesFromProxerHTML } from "../utils/proxer-html-parser";
import { ProxerListUpload } from "./ProxerListUpload";

export const App: FunctionComponent<{}> = () => {
  const [proxerAnimes, setProxerAnimes] = useState<ProxerAnime[]>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) {
      return;
    }

    const proxerHTML = await acceptedFiles[0].text();
    setProxerAnimes(getAnimesFromProxerHTML(proxerHTML));
  }, []);

  return (
    <main>
      <ProxerListUpload onDrop={onDrop} />
      {proxerAnimes.length === 0 ? (
        <h2>No Animes found!</h2>
      ) : (
        <ul>
          {proxerAnimes.map((anime, index) => (
            <li key={index}>{anime.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
};
