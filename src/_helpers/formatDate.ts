const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

export { formatDate };
