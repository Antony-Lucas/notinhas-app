export default function useCurrencyFormatter() {
  const formatCurrency = (text: string): string => {
    const numericValue = text.replace(/\D/g, "");
    const formattedValue = numericValue
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");

    return formattedValue;
  };

  return {
    formatCurrency,
  };
}
