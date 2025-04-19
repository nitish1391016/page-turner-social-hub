
import { BookOpen, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-book-purple" />
              <span className="font-bold text-xl">Page Turner</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A social platform for book lovers to discover new books, 
              share their thoughts, and connect with fellow readers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/shelves" className="text-sm text-muted-foreground hover:text-foreground">My Shelves</Link></li>
                <li><Link to="/clubs" className="text-sm text-muted-foreground hover:text-foreground">Book Clubs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Guidelines</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Page Turner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
