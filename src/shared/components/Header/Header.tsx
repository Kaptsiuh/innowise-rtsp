import { Link, useLocation } from "@tanstack/react-router";
import { Switch, Button } from "..";
import { useAuth } from "@/shared/api/context/auth-context";
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from "@/shared/hooks/useTheme";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 w-full border-b bg-background/70 backdrop-blur  z-50">
      <div className="container flex justify-between  items-center align-center mx-auto px-4 py-8 h-16 ">
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Products
          </Link>
          <Link to="/posts/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Posts
          </Link>
          <Link to="/chat/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Chat
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">
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
