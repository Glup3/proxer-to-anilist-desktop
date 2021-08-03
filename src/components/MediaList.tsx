import React, { FunctionComponent } from "react";
import { Box } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties } from "styled-components";

import { SelectableProxerMedia } from "../types/proxer";

interface MediaListEntryProps {
  index: number;
  style: CSSProperties;
  data: {
    medias: SelectableProxerMedia[];
    onCheck: (index: number) => void;
  };
}

const MediaListEntry: FunctionComponent<MediaListEntryProps> = ({ index, style, data }) => {
  const id = `media-entry-${index}`;
  const media = data.medias[index];

  return (
    <Box style={style}>
      <Label>
        <Checkbox id={id} name={id} checked={media.isSelected} onChange={(_) => data.onCheck(index)} />
        {media.title}
      </Label>
    </Box>
  );
};

interface MediaListProps {
  medias: SelectableProxerMedia[];
  onCheck: (index: number) => void;
}

export const MediaList: FunctionComponent<MediaListProps> = ({ medias, onCheck }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List itemCount={medias.length} height={height} width={width} itemSize={24} itemData={{ medias, onCheck }}>
          {MediaListEntry}
        </List>
      )}
    </AutoSizer>
  );
};
