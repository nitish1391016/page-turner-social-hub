
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users, BookOpen, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookClubDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = useState("");

  // Fetch book club details
  const {
    data: club,
    isLoading: isLoadingClub,
    error: clubError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: () => api.getBookClubById(id!),
    enabled: !!id,
  });

  // Fetch club messages
  const {
    data: messages,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => api.getClubMessages(id!),
    enabled: !!id,
  });

  // Join club mutation
  const joinClubMutation = useMutation({
    mutationFn: () => api.joinBookClub(id!, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["club", id] });
      toast({
        title: "Joined club",
        description: "You are now a member of this book club",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      api.sendMessage({
        clubId: id!,
        userId: user!.id,
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      setMessageContent("");
    },
  });

  const handleJoinClub = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join book clubs",
        variant: "destructive",
      });
      return;
    }

    joinClubMutation.mutate();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to send messages",
        variant: "destructive",
      });
      return;
    }

    if (!messageContent.trim()) {
      return;
    }

    sendMessageMutation.mutate(messageContent);
  };

  if (isLoadingClub) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl animate-pulse">
            <div className="bg-gray-200 h-8 w-1/2 mb-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-3/4 mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="bg-gray-200 h-96 w-full rounded mb-6"></div>
              </div>
              <div>
                <div className="bg-gray-200 h-64 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Book Club</h2>
        <p className="text-muted-foreground mb-4">
          We couldn't find the book club you're looking for.
        </p>
        <Button asChild>
          <Link to="/clubs">Return to Book Clubs</Link>
        </Button>
      </div>
    );
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
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
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
              <p className="text-muted-foreground mb-4">{club.description}</p>

              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <div className="flex items-center mr-4">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{club.memberCount} members</span>
                </div>
                <div>
                  <span>Founded {formatDate(club.createdAt)}</span>
                </div>
              </div>

              <Button
                onClick={handleJoinClub}
                disabled={joinClubMutation.isPending}
              >
                {joinClubMutation.isPending ? "Joining..." : "Join Club"}
              </Button>
            </div>

            {/* Current Book */}
            {club.currentBook && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    We're currently reading
                  </h2>
                  <div className="flex items-start space-x-4">
                    <Link
                      to={`/books/${club.currentBook.id}`}
                      className="shrink-0"
                    >
                      <div className="w-24 h-36 relative rounded overflow-hidden">
                        <img
                          src={club.currentBook.coverImage}
                          alt={`${club.currentBook.title} cover`}
                          className="absolute h-full w-full object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <h3 className="font-semibold text-lg">
                        <Link to={`/books/${club.currentBook.id}`}>
                          {club.currentBook.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {club.currentBook.author}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {club.currentBook.description}
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/books/${club.currentBook.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Book
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussion */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Club Discussion</h2>
              <Card>
                <CardContent className="p-6">
                  {isLoadingMessages ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-200 w-32 mb-1 rounded"></div>
                              <div className="h-3 bg-gray-200 w-24 mb-2 rounded"></div>
                              <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : messagesError ? (
                    <p className="text-muted-foreground">
                      Error loading messages. Please try again.
                    </p>
                  ) : messages && messages.length > 0 ? (
                    <div className="space-y-6 mb-6">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={message.user.avatar} />
                            <AvatarFallback>
                              {message.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-baseline">
                              <h4 className="font-semibold mr-2">
                                {message.user.name}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.createdAt)}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-6">
                      No messages yet. Start the conversation!
                    </p>
                  )}

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="relative">
                    <Input
                      placeholder="Type your message..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="pr-12"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-0 top-0 bottom-0"
                      disabled={!messageContent.trim() || sendMessageMutation.isPending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About this Club</h2>
                <img
                  src={club.coverImage}
                  alt={`${club.name} cover`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p className="text-muted-foreground mb-4">
                  {club.description}
                </p>
                <Separator className="my-4" />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Members</h3>
                  <span className="text-muted-foreground text-sm">
                    {club.memberCount} members
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join our community of book lovers to discuss our monthly reads,
                  share your thoughts, and connect with like-minded readers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookClubDetails;
