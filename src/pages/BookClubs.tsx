
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

const BookClubs = () => {
  const {
    data: clubs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookClubs"],
    queryFn: api.getBookClubs,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Book Clubs</h1>
        <p className="text-muted-foreground mb-8">
          Join a community of readers and discuss your favorite books together.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Error Loading Book Clubs</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't load the book clubs. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs?.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                <div className="h-48 relative">
                  <img
                    src={club.coverImage}
                    alt={`${club.name} cover`}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-xl mb-2">{club.name}</h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {club.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{club.memberCount} members</span>
                    </div>
                    {club.currentBook && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="mr-1 h-4 w-4" />
                        <span>Reading now</span>
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full">
                    <Link to={`/clubs/${club.id}`}>View Club</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookClubs;
