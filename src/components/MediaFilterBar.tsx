import React, { FunctionComponent, useState } from "react";
import { Label, Checkbox } from "@rebass/forms";
import { Box } from "rebass";

interface MediaFilterBarProps {
  onSelectAll: (state: boolean) => void;
}

export const MediaFilterBar: FunctionComponent<MediaFilterBarProps> = ({ onSelectAll }) => {
  const [isSelectAll, setIsSelectAll] = useState(true);

  return (
    <Box>
      <Label>
        <Checkbox
          id="selectAll"
          name="selectAll"
          checked={isSelectAll}
          onChange={(e) => {
            const newIsSelectAll = !isSelectAll;
            setIsSelectAll(newIsSelectAll);
            onSelectAll(newIsSelectAll);
          }}
        />
        Select All
      </Label>
    </Box>
  );
};
