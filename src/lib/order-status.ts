export const statusConfig: { [key: string]: { label: string; color: string } } =
  {
    PENDING: { label: "Pendente", color: "bg-yellow-500" },
    PAYMENT_CONFIRMED: { label: "Pagamento Confirmado", color: "bg-blue-500" },
    PAYMENT_FAILED: { label: "Falha no Pagamento", color: "bg-red-600" },
    IN_PREPARATION: { label: "Em Preparação", color: "bg-orange-500" },
    READY: { label: "Pronto para Retirada", color: "bg-green-500" },
    ON_THE_WAY: { label: "A caminho", color: "bg-purple-500" },
    DELIVERED: { label: "Entregue", color: "bg-green-700" },
    FINISHED: { label: "Finalizado", color: "bg-gray-500" },
    CANCELED: { label: "Cancelado", color: "bg-black" },
  };
