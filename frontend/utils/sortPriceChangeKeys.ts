const sortPriceChangeKeys = (keys: any) => {
  const sortedKeys = keys.sort((a: any, b: any) => {
    const aKey = a.label;
    const bKey = b.label;
    if (aKey === "1h") return -1;
    if (bKey === "1h") return 1;
    if (aKey === "24h") return -1;
    if (bKey === "24h") return 1;
    if (aKey === "7d") return -1;
    if (bKey === "7d") return 1;
    if (aKey === "30d") return -1;
    if (bKey === "30d") return 1;
    if (aKey === "60d") return -1;
    if (bKey === "60d") return 1;
    if (aKey === "200d") return -1;
    if (bKey === "200d") return 1;
    if (aKey === "1y") return -1;
    if (bKey === "1y") return 1;
    if (aKey === "ath") return -1;
    if (bKey === "ath") return 1;
    if (aKey === "atl") return -1;
    if (bKey === "atl") return 1;
  });
  return sortedKeys;
};
export default sortPriceChangeKeys;
