
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookCard from "@/components/BookCard";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Heart, Star, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("featured");

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: api.getBooks,
  });

  const {
    data: clubs,
    isLoading: isLoadingClubs,
  } = useQuery({
    queryKey: ["bookClubs"],
    queryFn: api.getBookClubs,
  });

  const navigateToBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const navigateToClub = (clubId: string) => {
    navigate(`/clubs/${clubId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-lavender/30 to-book-purple/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Next Great Read
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with fellow book lovers, discover new books, and share your thoughts on your favorite reads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/shelves")}>
                  My Bookshelves
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/clubs")}>
                  Join a Book Club
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Discover Books</h2>
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New Releases</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured">
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Error loading books. Please try again.
                    </p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Refresh
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books?.slice(0, 5).map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onClick={() => navigateToBook(book.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular">
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {/* Show books sorted by rating */}
                    {books
                      ?.slice()
                      .sort((a, b) => b.avgRating - a.avgRating)
                      .slice(0, 5)
                      .map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onClick={() => navigateToBook(book.id)}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="new">
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {/* Show latest books by published date */}
                    {books
                      ?.slice()
                      .sort(
                        (a, b) =>
                          new Date(b.publishedDate).getTime() -
                          new Date(a.publishedDate).getTime()
                      )
                      .slice(0, 5)
                      .map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onClick={() => navigateToBook(book.id)}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Reading Stats Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Page Turner?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-8 p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-book-lavender/30 text-book-purple mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Your Reading</h3>
                  <p className="text-muted-foreground">
                    Organize your books into customized shelves and keep track of what you're reading.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-8 p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-book-lavender/30 text-book-purple mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join Book Clubs</h3>
                  <p className="text-muted-foreground">
                    Connect with other readers who share your interests and discuss books together.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-8 p-6 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-book-lavender/30 text-book-purple mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Share Your Reviews</h3>
                  <p className="text-muted-foreground">
                    Rate books, write thoughtful reviews, and help others discover great reads.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Book Clubs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Book Clubs</h2>
              <Button variant="outline" onClick={() => navigate("/clubs")}>
                View All
              </Button>
            </div>

            {isLoadingClubs ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-full mb-4 rounded"></div>
                      <div className="h-4 bg-gray-200 w-1/2 mb-4 rounded"></div>
                      <div className="h-10 bg-gray-200 w-full rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clubs?.slice(0, 3).map((club) => (
                  <Card key={club.id} className="overflow-hidden">
                    <div className="h-48 relative">
                      <img
                        src={club.coverImage}
                        alt={`${club.name} cover`}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-2">{club.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {club.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{club.memberCount} members</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => navigateToClub(club.id)}
                      >
                        View Club
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
