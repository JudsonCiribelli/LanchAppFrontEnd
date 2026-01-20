import { Button } from "../ui/button";
import Link from "next/link";
import SheetComponent from "../SheetComponent/SheetComponent";

const HeaderComponent = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-app-background">
      <Button asChild>
        <Link href="/">
          <h1>LanchApp</h1>
        </Link>
      </Button>
      <div>
        <SheetComponent />
      </div>
    </header>
  );
};
export default HeaderComponent;
