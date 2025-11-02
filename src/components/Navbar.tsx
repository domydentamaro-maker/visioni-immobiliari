import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/proprieta", label: "Immobili" },
    { path: "/servizi", label: "Servizi" },
    { path: "/contatti", label: "Contatti" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="2D Sviluppo Immobiliare" 
              className="h-24 md:h-28 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent relative ${
                  isActive(link.path) ? "text-accent" : "text-white"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            ))}
            {user && isAdmin && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-accent relative ${
                  isActive("/dashboard") ? "text-accent" : "text-white"
                }`}
              >
                Dashboard
                {isActive("/dashboard") && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            )}
            {user ? (
              <Button variant="outline" size="sm" onClick={signOut} className="border-white/30 text-white hover:bg-white/10">
                <LogOut className="mr-2 h-4 w-4" />
                Esci
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                <Link to="/login">Accedi</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-accent transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-accent px-4 py-2 rounded-lg ${
                    isActive(link.path) ? "text-accent bg-accent/10" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-accent px-4 py-2 rounded-lg ${
                    isActive("/dashboard") ? "text-accent bg-accent/10" : "text-foreground"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="text-base font-medium text-foreground hover:text-accent px-4 py-2 rounded-lg text-left"
                >
                  Esci
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="mx-4 w-auto">Accedi</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
