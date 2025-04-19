
import { Book } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <Card 
      className="book-card overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative pt-[150%] overflow-hidden">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="absolute inset-0 h-full w-full object-cover book-cover-shadow"
        />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
          <p className="text-muted-foreground text-sm">{book.author}</p>
        </div>
        <div className="flex items-center mt-2">
          <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-sm">{book.avgRating.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
