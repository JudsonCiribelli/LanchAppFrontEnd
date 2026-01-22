import { Button } from "../ui/button";
import Link from "next/link";
import SheetComponent from "../SheetComponent/SheetComponent";
import { getUser } from "@/lib/authToken";

const HeaderComponent = async () => {
  const user = await getUser();

  if (!user) return null;
  return (
    <header className="flex items-center justify-between p-4 bg-app-background">
      <Button asChild variant="secondary">
        <Link href="/">
          <h1 className="font-bold">
            Lanch<span className="text-brand-primary">App</span>
          </h1>
        </Link>
      </Button>
      <div>
        <SheetComponent user={user} />
      </div>
    </header>
  );
};
export default HeaderComponent;
