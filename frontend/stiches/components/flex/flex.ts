import { styled } from "stiches/config/stitches.config.web";

const Flex = styled("div", {
  boxSizing: "border-box",
  display: "flex",
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    flex: {
      true: {
        flex: 1,
      },
    },
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
      "row-reverse": {
        flexDirection: "row-reverse",
      },
      "column-reverse": {
        flexDirection: "column-reverse",
      },
    },
    align: {
      "flex-start": {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      "flex-end": {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    justify: {
      "flex-start": {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      "flex-end": {
        justifyContent: "flex-end",
      },
      "space-between": {
        justifyContent: "space-between",
      },
      "space-around": {
        justifyContent: "space-around",
      },
    },
    wrap: {
      wrap: {
        flexWrap: "wrap",
      },
      nowrap: {
        flexWrap: "nowrap",
      },
      "wrap-reverse": {
        flexWrap: "wrap-reverse",
      },
    },
    gap: {
      0: { gap: 0 },
      1: { gap: "$1" },
      2: { gap: "$2" },
      3: { gap: "$3" },
      4: { gap: "$4" },
      5: { gap: "$5" },
      6: { gap: "$6" },
      7: { gap: "$7" },
      8: { gap: "$8" },
      9: { gap: "$9" },
    },
  },
});

export default Flex;
