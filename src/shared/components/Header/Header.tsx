import { Link } from "@tanstack/react-router";
import { Switch, Button } from "..";
import { useAuth } from "@/shared/api/context/auth-context";
import { useNavigate } from "@tanstack/react-router";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 w-full border-b bg-background/70 backdrop-blur  z-50">
      <div className="container flex justify-between  items-center align-center mx-auto px-4 py-8 h-16 ">
        <nav className="flex items-center gap-6">
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
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
