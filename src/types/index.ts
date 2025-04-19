
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  createdAt: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genres: string[];
  publishedDate: string;
  avgRating: number;
  pageCount: number;
};

export type ShelfType = 'read' | 'reading' | 'want-to-read';

export type Shelf = {
  id: string;
  userId: string;
  books: Book[];
  type: ShelfType;
};

export type Review = {
  id: string;
  bookId: string;
  userId: string;
  user: User;
  rating: number;
  content: string;
  createdAt: string;
};

export type BookClub = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  currentBook?: Book;
  createdAt: string;
};

export type Message = {
  id: string;
  clubId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
};
