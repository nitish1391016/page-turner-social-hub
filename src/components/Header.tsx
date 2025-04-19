
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  User, 
  Search, 
  Menu, 
  X, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-book-purple" />
            <span className="font-bold text-xl hidden sm:inline">Page Turner</span>
          </Link>

          {/* Search on desktop */}
          <div className="hidden md:flex relative max-w-md w-full mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for books, authors, or genres..."
              className="pl-10 w-full"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/shelves" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                My Shelves
              </Link>
              <Link to="/clubs" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                Book Clubs
              </Link>
            </nav>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for books, authors, or genres..."
                className="pl-10 w-full"
              />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Home
              </Link>
              <Link 
                to="/shelves" 
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                My Shelves
              </Link>
              <Link 
                to="/clubs" 
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                <Users className="mr-2 h-5 w-5" />
                Book Clubs
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                    onClick={closeMenu}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Link>
                  <button 
                    onClick={() => { logout(); closeMenu(); }}
                    className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md w-full text-left"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className="flex justify-center"
                >
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
