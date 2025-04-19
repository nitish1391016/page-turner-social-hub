
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookCard from "@/components/BookCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const {
    data: shelves,
    isLoading: isLoadingShelves,
    error: shelvesError,
  } = useQuery({
    queryKey: ["shelves", user?.id],
    queryFn: () => (user ? api.getUserShelves(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const navigateToBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                
                {user.bio && (
                  <p className="text-muted-foreground mb-6">{user.bio}</p>
                )}
                
                <div className="text-sm text-muted-foreground mb-6">
                  <p>Member since {formatDate(user.createdAt)}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-2"
                  onClick={() => {
                    toast({
                      title: "Feature coming soon",
                      description: "Profile editing will be available in a future update.",
                    });
                  }}
                >
                  Edit Profile
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Bookshelves */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6">My Bookshelves</h2>
            
            <Tabs defaultValue="reading" className="w-full">
              <TabsList className="w-full max-w-md grid grid-cols-3">
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="want-to-read">Want to Read</TabsTrigger>
              </TabsList>

              {isLoadingShelves ? (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="relative pt-[150%]">
                        <div className="absolute inset-0 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-5 bg-gray-200 w-3/4 mt-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-1/2 mt-1 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : shelvesError ? (
                <div className="mt-6 p-4 text-center">
                  <p className="text-muted-foreground">
                    Error loading bookshelves. Please try again.
                  </p>
                </div>
              ) : (
                <>
                  <TabsContent value="reading" className="mt-6">
                    {shelves?.find((shelf) => shelf.type === "reading")?.books.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {shelves
                          .find((shelf) => shelf.type === "reading")
                          ?.books.map((book) => (
                            <BookCard
                              key={book.id}
                              book={book}
                              onClick={() => navigateToBook(book.id)}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">
                          You don't have any books marked as currently reading.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="read" className="mt-6">
                    {shelves?.find((shelf) => shelf.type === "read")?.books.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {shelves
                          .find((shelf) => shelf.type === "read")
                          ?.books.map((book) => (
                            <BookCard
                              key={book.id}
                              book={book}
                              onClick={() => navigateToBook(book.id)}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">
                          You don't have any books marked as read.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="want-to-read" className="mt-6">
                    {shelves?.find((shelf) => shelf.type === "want-to-read")?.books.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {shelves
                          .find((shelf) => shelf.type === "want-to-read")
                          ?.books.map((book) => (
                            <BookCard
                              key={book.id}
                              book={book}
                              onClick={() => navigateToBook(book.id)}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">
                          You don't have any books marked as want to read.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
