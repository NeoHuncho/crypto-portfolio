import { Loader } from "@mantine/core";
import React from "react";

const CenteredLoader: React.FC = ({}) => {
  return (
    <Loader
      style={{
        position: "absolute",
        right: "0",
        left: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
      }}
      variant="dots"
    />
  );
};
export default CenteredLoader;
