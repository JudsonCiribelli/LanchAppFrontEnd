"use client";
import { Button } from "@/_components/ui/button";
import { DeleteProductAction } from "../../actions/products";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  productId: string;
}

const DeleteButton = ({ productId }: DeleteButtonProps) => {
  const [isDeleting, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteProduct = (id: string) => {
    startTransition(async () => {
      await DeleteProductAction(id);

      router.refresh();
    });
  };
  return (
    <Button
      variant="destructive"
      className="cursor-pointer"
      onClick={() => handleDeleteProduct(productId)}
    >
      Deletar
    </Button>
  );
};

export default DeleteButton;
