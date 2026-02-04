"use server";

import { apiClient } from "@/lib/api";
import { ProductsType } from "./types/products";
import { getCategories } from "../categories/actions/categories";
import ProductFormComponent from "./_components/ProductFormComponent/ProductFormComponent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import Image from "next/image";
import { Package } from "lucide-react";
import { Button } from "@/_components/ui/button";
import DeleteButton from "./_components/DeleteButtonComponent/DeleteButtonComponent";

const ProductPage = async () => {
  const categories = await getCategories();

  const products = await apiClient<ProductsType[]>("/product", {
    method: "GET",
  });

  const productsList = Array.isArray(products) ? products : [];

  return (
    <div className="space-y-5 xl:p-4">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <p className="text-xs font-normal text-muted-foreground">
            Gerencie seus produtos
          </p>
        </div>
        {/* PRODUCT FORM */}
        <ProductFormComponent categories={categories} />
      </div>

      {productsList.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsList.map((product) => (
            <Card
              key={product.id}
              className="bg-app-card border-app-border transition-shadow hover:shadow-md text-white overflow-hidden"
            >
              <div className="relative w-full h-48">
                {product.banner ? (
                  <Image
                    src={product.banner}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="w-10 h-10 opacity-20" />
                    <span className="text-xs">Sem imagem</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="gap-2 flex items-center justify-between text-base md:text-lg">
                  <div className="flex gap-2 items-center">
                    <Package className="w-5 h-5" />
                    <span>{product.name}</span>
                  </div>

                  <DeleteButton productId={product.id} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-300 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between border-t border-app-border">
                  <span className="text-brand-primary font-bold text-lg">
                    {product.price}
                  </span>
                  {product.category && (
                    <span className="text-xs bg-app-background px-2 py-1 rounded">
                      {product.category.name}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
