
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  max?: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

const StarRating = ({
  rating = 0,
  max = 5,
  onChange,
  size = "md",
  readOnly = false,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };
  
  const handleClick = (newRating: number) => {
    if (!readOnly && onChange) {
      onChange(newRating);
    }
  };
  
  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverRating(rating);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => {
        const starRating = i + 1;
        const isFilled = hoverRating ? starRating <= hoverRating : starRating <= rating;
        
        return (
          <button
            key={i}
            type="button"
            className={cn(
              "text-yellow-400 mr-1 focus:outline-none transition-transform",
              !readOnly && "hover:scale-110 cursor-pointer",
              readOnly && "cursor-default"
            )}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
          >
            <StarIcon 
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-yellow-400" : "fill-gray-200"
              )} 
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
