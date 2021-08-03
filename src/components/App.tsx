import React, { Fragment, FunctionComponent, useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@rebass/preset";
import { MediaType, SelectableProxerMedia } from "../types/proxer";
import { getMediasFromProxerHTML } from "../utils/proxer-html-parser";
import { ProxerListUpload } from "./ProxerListUpload";
import { MediaList } from "./MediaList";
import { MediaSelectedCount } from "./MediaSelectedCount";
import { MediaFilterBar } from "./MediaFilterBar";

export const App: FunctionComponent<{}> = () => {
  const [proxerMedias, setProxerMedias] = useState<SelectableProxerMedia[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) {
      return;
    }

    const proxerHTML = await acceptedFiles[0].text();
    const medias = getMediasFromProxerHTML(proxerHTML);

    setProxerMedias(
      medias.map<SelectableProxerMedia>((media) => {
        return {
          isSelected: true,
          ...media,
        };
      })
    );
    setMediaType(medias[0]?.mediaType);
  }, []);

  const onCheck = (index: number) => {
    const updatedMedias = proxerMedias.map((item, idx) => {
      if (idx !== index) {
        return item;
      }

      return { ...item, isSelected: !item.isSelected };
    });

    setProxerMedias(updatedMedias);
  };

  const countSelectedMedias = useMemo<number>(
    () => proxerMedias.reduce((total, curr) => (curr.isSelected ? total + 1 : total), 0),
    [proxerMedias]
  );

  return (
    <ThemeProvider theme={theme}>
      <main>
        <ProxerListUpload onDrop={onDrop} />
        <h2>Length: {proxerMedias.length}</h2>
        {proxerMedias.length === 0 ? (
          <h2>No {mediaType ?? "Media"} found!</h2>
        ) : (
          <Fragment>
            <h2>{mediaType}</h2>
            <MediaFilterBar
              onSelectAll={(state) => {
                setProxerMedias(proxerMedias.map((media) => ({ ...media, isSelected: state })));
              }}
            />
            <MediaSelectedCount count={countSelectedMedias} />
            <MediaList medias={proxerMedias} onCheck={onCheck} />
          </Fragment>
        )}
      </main>
    </ThemeProvider>
  );
};
