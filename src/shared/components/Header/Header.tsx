import { Link } from "@tanstack/react-router";
import { Switch, Button } from "..";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur flex justify-between  items-center h-16 px-4 ">
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Products
        </Link>
        <Link
          to="/posts/"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Posts
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Switch />
        <Button variant={"default"}>Sign In</Button>
      </div>
    </header>
  );
};
