const getCurrencySymbol = (currency:string) => {
    if (currency === "EUR") return "€";
    else return "$";
  };

export default getCurrencySymbol;