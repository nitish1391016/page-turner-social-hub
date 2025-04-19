
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";

const Shelves = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("reading");

  const {
    data: shelves,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shelves", user?.id],
    queryFn: () => (user ? api.getUserShelves(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">My Bookshelves</h1>
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              Please sign in to view your bookshelves
            </p>
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigateToBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };
  
  // Helper function to get books from a specific shelf
  const getShelfBooks = (shelfType: string) => {
    if (!shelves) return [];
    const shelf = shelves.find((shelf) => shelf.type === shelfType);
    return shelf?.books || [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Bookshelves</h1>
        <p className="text-muted-foreground mb-8">
          Organize and track your reading journey
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="reading">Currently Reading</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="want-to-read">Want to Read</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="relative pt-[150%]">
                    <div className="absolute inset-0 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-5 bg-gray-200 w-3/4 mt-2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mt-1 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Error loading your bookshelves. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </div>
          ) : (
            <>
              <TabsContent value="reading" className="mt-8">
                {getShelfBooks("reading").length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {getShelfBooks("reading").map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onClick={() => navigateToBook(book.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center">
                    <CardContent className="p-12">
                      <h3 className="text-xl font-semibold mb-2">
                        No books in this shelf
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You don't have any books marked as currently reading
                      </p>
                      <Button asChild>
                        <a href="/">Browse Books</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="read" className="mt-8">
                {getShelfBooks("read").length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {getShelfBooks("read").map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onClick={() => navigateToBook(book.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center">
                    <CardContent className="p-12">
                      <h3 className="text-xl font-semibold mb-2">
                        No books in this shelf
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You don't have any books marked as read
                      </p>
                      <Button asChild>
                        <a href="/">Browse Books</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="want-to-read" className="mt-8">
                {getShelfBooks("want-to-read").length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {getShelfBooks("want-to-read").map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onClick={() => navigateToBook(book.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center">
                    <CardContent className="p-12">
                      <h3 className="text-xl font-semibold mb-2">
                        No books in this shelf
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You don't have any books marked as want to read
                      </p>
                      <Button asChild>
                        <a href="/">Browse Books</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Shelves;
