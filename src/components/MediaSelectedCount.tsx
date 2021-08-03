import React, { FunctionComponent } from "react";
import { Box, Text } from "rebass";

interface MediaSelectedCountProps {
  count: number;
}

export const MediaSelectedCount: FunctionComponent<MediaSelectedCountProps> = ({ count }) => {
  return (
    <Box>
      <Text fontWeight="bold">{count}</Text>
    </Box>
  );
};
