import { MantineNumberSize } from "@mantine/core";
import { Header } from "components/app_shell/header/Header";
import { ReactElement } from "react";

interface Props {
  styles: any;
}

export const defaultButtonProps: Props = {
  styles: {
    root: {
      backgroundColor: "#0f3e6b !important",
      ":hover": {
        backgroundColor: "#1864ab !important",
      },
    },
  },
};
