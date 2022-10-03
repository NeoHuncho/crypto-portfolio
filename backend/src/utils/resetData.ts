import type { General } from "../../../common/types/interfaces";

const resetData = (general: General) => {
    if (general.coinsData.value) {
      general.coinsData.value = 0;
      general.coinsData.spotValue = 0;
      general.coinsData.spotValue = 0;
      general.coinsData.interestHistoryValue = 0;
    }
    return general;
  };
  export default resetData;