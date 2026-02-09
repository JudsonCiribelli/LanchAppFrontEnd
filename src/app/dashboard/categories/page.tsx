import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/authToken";
import { CategoryTypes } from "@/types/category";
import { Tags } from "lucide-react";
import CategoryFormComponent from "./_components/CategoryFormComponent/CategoryFormComponent";
import { Badge } from "@/_components/ui/badge";

const CategoriesPage = async () => {
  const token = await getToken();

  const categories = await apiClient<CategoryTypes[]>("/category", {
    method: "GET",
    token: token!,
  });

  return (
    <div className="space-y-5 xl:p-4">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Categorias</h1>
          <p className="text-xs font-normal text-muted-foreground">
            Organize os produtos em categorias
          </p>
        </div>
        <CategoryFormComponent />
      </div>

      {categories.length !== 0 && (
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="bg-app-card border-app-border transition-shadow text-white hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-base xl:text-lg">
                  <Tags size={22} />
                  <span>{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {category.products?.map((product) => (
                  <div key={product.id}>
                    <Badge variant="secondary">
                      {product.name} -{" "}
                      <span className="text-brand-primary font-bold">
                        {product.price}
                      </span>
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Badge className="text-xs text-white xl:text-sm">
                  ID: {category.id}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
