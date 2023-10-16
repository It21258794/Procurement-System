import { Box } from "native-base";
import React from "react";

const CustomHeader = (title: any) => {
  return (
    <Box
      paddingTop="10%"
      height="10%"
      width="100%"
      bg="primary.500"
      p="4"
      shadow={2}
      _text={{
        fontSize: "md",
        fontWeight: "bold",
        color: "white",
      }}
    >
      Build Master
    </Box>
  );
};

export default CustomHeader;
