import { defaultMarginPosition } from "../../../data/default/defaultValues";
import { borrowMargin, repayMargin } from "../../../foreign_api/dataBinance";
import type { IMarginPositions } from "../../../interfaces";

const buySellMargins = async (margins: IMarginPositions) => {
  for (const coin in margins) {
    const margin = margins[coin];
    if (!margin) continue;
    if (margin.toBeBought) await borrowMargin(coin, margin);
    else if (margin.toBeSold) {
      await repayMargin(coin, margin);
      margins[coin] = defaultMarginPosition;
    }
  }
  return margins;
};
export default buySellMargins;
