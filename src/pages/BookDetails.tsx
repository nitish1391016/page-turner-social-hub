
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Book, Review, ShelfType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StarRating from "@/components/StarRating";
import { BookOpen, Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch book details
  const {
    data: book,
    isLoading: isLoadingBook,
    error: bookError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => api.getBookById(id!),
    enabled: !!id,
  });

  // Fetch book reviews
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => api.getReviewsByBookId(id!),
    enabled: !!id,
  });

  // Add book to shelf mutation
  const addToShelfMutation = useMutation({
    mutationFn: ({
      bookId,
      shelfType,
    }: {
      bookId: string;
      shelfType: ShelfType;
    }) => api.addBookToShelf(user!.id, bookId, shelfType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelves", user?.id] });
      toast({
        title: "Book added to shelf",
        description: "The book has been added to your shelf",
      });
    },
  });

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: (newReview: Omit<Review, "id" | "user" | "createdAt">) =>
      api.createReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setReviewContent("");
      setRating(0);
      toast({
        title: "Review submitted",
        description: "Your review has been published",
      });
    },
  });

  const handleAddToShelf = (shelfType: ShelfType) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add books to your shelves",
        variant: "destructive",
      });
      return;
    }

    addToShelfMutation.mutate({
      bookId: id!,
      shelfType,
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating for your review",
        variant: "destructive",
      });
      return;
    }

    if (!reviewContent.trim()) {
      toast({
        title: "Review content required",
        description: "Please write your review before submitting",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate({
      bookId: id!,
      userId: user.id,
      content: reviewContent,
      rating,
    });
  };

  if (isLoadingBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl animate-pulse">
            <div className="bg-gray-200 h-6 w-3/4 mb-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 mb-12 rounded"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-gray-200 h-96 w-64 rounded"></div>
              <div className="flex-1">
                <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                <div className="bg-gray-200 h-4 w-3/4 mb-4 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (bookError || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Book</h2>
        <p className="text-muted-foreground mb-4">
          We couldn't find the book you're looking for.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

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
        {/* Book Details */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Book Cover */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative w-64 h-96 book-cover-shadow rounded-lg overflow-hidden">
              <img
                src={book.coverImage}
                alt={`${book.title} book cover`}
                className="absolute h-full w-full object-cover"
              />
            </div>

            {/* Add to Shelf */}
            <div className="mt-6">
              <Select
                onValueChange={(value) => handleAddToShelf(value as ShelfType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add to shelf" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="want-to-read">Want to Read</SelectItem>
                  <SelectItem value="reading">Currently Reading</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

            <div className="flex items-center mb-6">
              <StarRating
                rating={book.avgRating}
                readOnly
                size="md"
              />
              <span className="ml-2 text-muted-foreground">
                {book.avgRating.toFixed(1)} ({reviews?.length || 0} reviews)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-book-purple" />
                <span className="text-sm">{book.pageCount} pages</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-book-purple" />
                <span className="text-sm">
                  {new Date(book.publishedDate).getFullYear()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-book-purple" />
                <span className="text-sm">
                  ~{Math.round(book.pageCount / 30)} hours
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{book.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-block bg-book-lavender bg-opacity-30 text-book-purple px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Reviews and Related */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related Books</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            {user && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Your Rating
                      </label>
                      <StarRating
                        rating={rating}
                        onChange={setRating}
                        size="lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="reviewContent"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Review
                      </label>
                      <Textarea
                        id="reviewContent"
                        placeholder="Share your thoughts about this book..."
                        rows={4}
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={createReviewMutation.isPending}
                    >
                      {createReviewMutation.isPending
                        ? "Submitting..."
                        : "Submit Review"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <h3 className="text-xl font-semibold mb-4">
              Reader Reviews ({reviews?.length || 0})
            </h3>

            {isLoadingReviews ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <div className="h-4 bg-gray-200 w-24 mb-1 rounded"></div>
                        <div className="h-3 bg-gray-200 w-16 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : reviewsError ? (
              <p className="text-muted-foreground">
                Error loading reviews. Please try again.
              </p>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>
                          {review.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.user.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <StarRating
                        rating={review.rating}
                        readOnly
                        size="sm"
                      />
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No reviews yet. Be the first to share your thoughts!
              </p>
            )}
          </TabsContent>

          {/* Related Books Tab */}
          <TabsContent value="related" className="mt-6">
            <p className="text-muted-foreground mb-4">
              Other books you might enjoy based on "{book.title}":
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Just show some random books for now */}
              {[...Array(3)].map((_, i) => {
                // Create a dummy related book based on current book
                const relatedBook = {
                  id: `related-${i}`,
                  title: `Similar to ${book.title} #${i+1}`,
                  author: book.author,
                  coverImage: book.coverImage,
                  avgRating: (book.avgRating * 0.8 + Math.random() * 0.4).toFixed(1),
                  description: book.description
                };
                
                return (
                  <Card key={relatedBook.id} className="overflow-hidden">
                    <div className="p-4 flex items-start space-x-4">
                      <Link
                        to={`/books/${relatedBook.id}`}
                        className="shrink-0"
                      >
                        <div className="w-20 h-28 relative rounded overflow-hidden">
                          <img
                            src={relatedBook.coverImage}
                            alt={`${relatedBook.title} cover`}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                      <div>
                        <h4 className="font-semibold line-clamp-1">
                          <Link to={`/books/${relatedBook.id}`}>
                            {relatedBook.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {relatedBook.author}
                        </p>
                        <div className="flex items-center">
                          <StarRating
                            rating={Number(relatedBook.avgRating)}
                            readOnly
                            size="sm"
                          />
                          <span className="ml-2 text-xs text-muted-foreground">
                            {relatedBook.avgRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookDetails;
