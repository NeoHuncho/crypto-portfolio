import { Coin } from "../../common/types/interfaces";

const sortDataDesc = (a: any, b: any) => {
  const aData: Coin = a[1];
  const bData: Coin = b[1];
  if (aData.amountValue.value > bData.amountValue.value) {
    return -1;
  }
  if (aData.amountValue.value < bData.amountValue.value) {
    return 1;
  }
  return 0;
};
export { sortDataDesc };
