const getInitials = (name: string) => {
  if (!name) return "";

  const suffixes = [
    "filho",
    "filha",
    "neto",
    "neta",
    "junior",
    "jr",
    "sobrinho",
    "sobrinha",
  ];
  const connectors = ["de", "do", "da", "dos", "das"];

  const nameParts = name
    .trim()
    .split(/\s+/)
    .filter((part) => {
      const lowerPart = part.toLowerCase();
      return !suffixes.includes(lowerPart) && !connectors.includes(lowerPart);
    });

  if (nameParts.length === 0) return "";

  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase();
};

export { getInitials };
