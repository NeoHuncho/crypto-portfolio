import { defaultMarginPosition } from "../../../data/default/defaultValues";
import type { IMarginPositions } from "../../../interfaces";
import { calculatePriceChange } from "../../../utils/margin/calculatePriceChange";

interface IProps {
  prices: { [key: string]: number };
  marginPositions: IMarginPositions;
}
const processMarginData = ({ prices, marginPositions }: IProps) => {
  const margins = { ...marginPositions };
  for (const coin in prices) {
    const price = prices[coin];
    if (!price) continue;
    const marginPosition = margins[coin];
    //create margin position if it doesn't exist
    if (!marginPosition) {
      margins[coin] = defaultMarginPosition;
      margins[coin].prices.push(price);
      continue;
    }
    const lastPrice = marginPosition.prices[marginPosition.prices.length - 1];
    if (
      marginPosition.investmentStart === 0 &&
      lastPrice !== 0 &&
      calculatePriceChange(price, lastPrice) < -0.79
    ) {
      marginPosition.toBeBought = true;
      continue;
    }
    marginPosition.change = 0;
    marginPosition.prices.push(price);
    marginPosition.prices.map((price, index, array) => {
      if (index === 0) return;
      const previousPrice = array[index - 1];
      if (!previousPrice) return;
      const change = calculatePriceChange(price, previousPrice);
      marginPosition.change += change;
    });
    if (marginPosition.investmentStart !== 0) {
      if (marginPosition.change < marginPosition.maxGain) {
        marginPosition.maxGain = marginPosition.change;
        continue;
      }
      if (1 - marginPosition.change / marginPosition.maxGain > 0.2)
        marginPosition.toBeSold = true;
      continue;
    }
    if (marginPosition.change > 0) {
      marginPosition.prices = [];
      marginPosition.change = 0;
    }
    if (marginPosition.change < -0.79 && marginPosition.prices.length === 2)
      marginPosition.toBeBought = true;
    if (marginPosition.change < -0.85 && marginPosition.prices.length === 3)
      marginPosition.toBeBought = true;
    if (marginPosition.change < -0.95) marginPosition.toBeBought = true;
  }
  return margins;
};
export default processMarginData;
