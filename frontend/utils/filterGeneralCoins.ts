const filterGeneralCoins = (data: any, coinKeys: string[]) => {
  const filteredKeys = Object.entries(data).filter(([key, value]) =>
    coinKeys.includes(key)
  );

  const filteredData: any = Object.fromEntries(filteredKeys);
  return filteredData;
};

export default filterGeneralCoins;
