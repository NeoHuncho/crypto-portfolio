const calculatePriceChange = (currentPrice: number, previousPrice: number) => {
  return ((currentPrice - previousPrice) / previousPrice) * 100;
};

export { calculatePriceChange };
