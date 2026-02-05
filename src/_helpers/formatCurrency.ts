export const formatToBrl = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) {
    return "";
  }

  const amount = parseInt(numbers) / 100;
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  const normalized = value.replace(/[^\d,]/g, "").replace(",", ".");

  return parseFloat(normalized) || 0;
};
