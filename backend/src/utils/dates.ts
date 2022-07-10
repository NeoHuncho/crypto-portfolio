const numDaysBetween = function (d1: number, d2: Date) {
  return Math.ceil(Math.abs(d1 - d2.getTime() / 1000) / (60 * 60 * 24));
};

export { numDaysBetween };
