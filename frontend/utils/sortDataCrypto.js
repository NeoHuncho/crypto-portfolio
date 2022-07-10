const sortDataDesc = (a, b) => {
  if (a[1].value > b[1].value) {
    return -1;
  }
  if (a[1].value < b[1].value) {
    return 1;
  }
  return 0;
};
export { sortDataDesc };
