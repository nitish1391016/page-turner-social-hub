import { Book, Review, BookClub, User, Shelf, Message, ShelfType } from "@/types";

// Mock Users
const users: User[] = [
  {
    id: "1",
    name: "Jane Austen",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
    bio: "Avid reader of classic literature and sci-fi novels.",
    createdAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "2",
    name: "Ernest Hemingway",
    email: "ernest@example.com",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&h=100&auto=format&fit=crop",
    bio: "Book collector and coffee enthusiast.",
    createdAt: "2023-02-10T09:30:00Z",
  },
  {
    id: "3",
    name: "Virginia Woolf",
    email: "virginia@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop",
    bio: "Fantasy and mystery lover. Always looking for new worlds to explore.",
    createdAt: "2023-03-05T14:45:00Z",
  },
];

// Mock Books
const books: Book[] = [
  {
    id: "1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop",
    description: "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
    genres: ["Classic", "Romance"],
    publishedDate: "1813-01-28",
    avgRating: 4.7,
    pageCount: 279,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300&auto=format&fit=crop",
    description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
    genres: ["Classic", "Historical Fiction"],
    publishedDate: "1960-07-11",
    avgRating: 4.8,
    pageCount: 324,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop",
    description: "1984 is a dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
    genres: ["Dystopian", "Political Fiction"],
    publishedDate: "1949-06-08",
    avgRating: 4.6,
    pageCount: 328,
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=300&auto=format&fit=crop",
    description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    genres: ["Classic", "Literary Fiction"],
    publishedDate: "1925-04-10",
    avgRating: 4.5,
    pageCount: 180,
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=300&auto=format&fit=crop",
    description: "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
    genres: ["Fantasy", "Adventure"],
    publishedDate: "1937-09-21",
    avgRating: 4.9,
    pageCount: 310,
  },
  {
    id: "6",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    coverImage: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=300&auto=format&fit=crop",
    description: "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.",
    genres: ["Fantasy", "Young Adult"],
    publishedDate: "1997-06-26",
    avgRating: 4.8,
    pageCount: 223,
  },
];

// Mock Shelves
const shelves: Shelf[] = [
  {
    id: "1",
    userId: "1",
    type: "read",
    books: [books[0], books[2]],
  },
  {
    id: "2",
    userId: "1",
    type: "reading",
    books: [books[4]],
  },
  {
    id: "3",
    userId: "1",
    type: "want-to-read",
    books: [books[3], books[5]],
  },
];

// Mock Reviews
const reviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    userId: "1",
    user: users[0],
    rating: 5,
    content: "A timeless classic that never gets old. The character development is superb!",
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    bookId: "1",
    userId: "2",
    user: users[1],
    rating: 4,
    content: "I enjoyed the subtle humor and social commentary throughout the book.",
    createdAt: "2023-04-18T14:20:00Z",
  },
  {
    id: "3",
    bookId: "2",
    userId: "3",
    user: users[2],
    rating: 5,
    content: "A powerful story that addresses important themes of racial injustice and moral growth.",
    createdAt: "2023-04-20T09:15:00Z",
  },
  {
    id: "4",
    bookId: "3",
    userId: "1",
    user: users[0],
    rating: 4,
    content: "A chilling portrayal of totalitarianism that remains relevant today.",
    createdAt: "2023-04-22T16:40:00Z",
  },
];

// Mock Book Clubs
const bookClubs: BookClub[] = [
  {
    id: "1",
    name: "Classic Literature Lovers",
    description: "A club dedicated to reading and discussing the greatest works of classic literature.",
    coverImage: "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=300&auto=format&fit=crop",
    memberCount: 156,
    currentBook: books[0],
    createdAt: "2023-01-10T08:00:00Z",
  },
  {
    id: "2",
    name: "Science Fiction Explorers",
    description: "Journey through space, time, and alternate realities with fellow sci-fi enthusiasts.",
    coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=300&auto=format&fit=crop",
    memberCount: 89,
    currentBook: books[5],
    createdAt: "2023-02-05T11:30:00Z",
  },
  {
    id: "3",
    name: "Mystery & Thriller Fanatics",
    description: "For those who enjoy solving puzzles and experiencing suspense in their reading.",
    coverImage: "https://images.unsplash.com/photo-1546395224-7db7ded27571?q=80&w=300&auto=format&fit=crop",
    memberCount: 112,
    createdAt: "2023-03-15T13:45:00Z",
  },
];

// Mock Messages
const messages: Message[] = [
  {
    id: "1",
    clubId: "1",
    userId: "1",
    user: users[0],
    content: "What did everyone think about Elizabeth's character development throughout the novel?",
    createdAt: "2023-05-10T09:00:00Z",
  },
  {
    id: "2",
    clubId: "1",
    userId: "2",
    user: users[1],
    content: "I was impressed by how she overcame her own prejudices by the end of the story.",
    createdAt: "2023-05-10T09:15:00Z",
  },
  {
    id: "3",
    clubId: "1",
    userId: "3",
    user: users[2],
    content: "The dialogue between Elizabeth and Mr. Darcy was my favorite part of the book!",
    createdAt: "2023-05-10T09:30:00Z",
  },
];

// Mock Club Members
const clubMembers = [
  { id: "1", clubId: "1", userId: "1" },
  { id: "2", clubId: "1", userId: "2" },
  { id: "3", clubId: "2", userId: "1" },
];

// Delay function to simulate network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API service
export const api = {
  // Books
  getBooks: async (): Promise<Book[]> => {
    await delay(800);
    return [...books];
  },
  
  getBookById: async (id: string): Promise<Book | undefined> => {
    await delay(600);
    return books.find((book) => book.id === id);
  },
  
  // Reviews
  getReviewsByBookId: async (bookId: string): Promise<Review[]> => {
    await delay(700);
    return reviews.filter((review) => review.bookId === bookId);
  },
  
  createReview: async (review: Omit<Review, 'id' | 'user' | 'createdAt'>): Promise<Review> => {
    await delay(900);
    const user = users.find(u => u.id === review.userId)!;
    const newReview: Review = {
      id: `${reviews.length + 1}`,
      ...review,
      user,
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    return newReview;
  },
  
  // Shelves
  getUserShelves: async (userId: string): Promise<Shelf[]> => {
    await delay(800);
    return shelves.filter((shelf) => shelf.userId === userId);
  },
  
  addBookToShelf: async (userId: string, bookId: string, shelfType: ShelfType): Promise<Shelf> => {
    await delay(1000);
    const shelf = shelves.find((s) => s.userId === userId && s.type === shelfType)!;
    const book = books.find((b) => b.id === bookId)!;
    
    if (!shelf.books.some(b => b.id === bookId)) {
      shelf.books.push(book);
    }
    
    return shelf;
  },
  
  // Book Clubs
  getBookClubs: async (): Promise<BookClub[]> => {
    await delay(800);
    return [...bookClubs];
  },
  
  getBookClubById: async (id: string): Promise<BookClub | undefined> => {
    await delay(600);
    return bookClubs.find((club) => club.id === id);
  },
  
  getClubMembers: async (clubId: string): Promise<{id: string, clubId: string, userId: string}[]> => {
    await delay(700);
    return clubMembers.filter((member) => member.clubId === clubId);
  },
  
  joinBookClub: async (clubId: string, userId: string): Promise<BookClub> => {
    await delay(900);
    const club = bookClubs.find((c) => c.id === clubId)!;
    
    // Check if user is already a member
    const isMember = clubMembers.some(m => m.clubId === clubId && m.userId === userId);
    
    if (!isMember) {
      // Add to members list
      clubMembers.push({
        id: `${clubMembers.length + 1}`,
        clubId,
        userId
      });
      
      // Increment member count
      club.memberCount++;
    }
    
    return club;
  },
  
  // Messages
  getClubMessages: async (clubId: string): Promise<Message[]> => {
    await delay(700);
    return messages.filter((message) => message.clubId === clubId);
  },
  
  sendMessage: async (message: Omit<Message, 'id' | 'user' | 'createdAt'>): Promise<Message> => {
    await delay(800);
    const user = users.find(u => u.id === message.userId)!;
    const newMessage: Message = {
      id: `${messages.length + 1}`,
      ...message,
      user,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    return newMessage;
  },
  
  // Authentication (mock)
  getCurrentUser: async (): Promise<User> => {
    await delay(500);
    return users[0]; // Mock the current user as the first user
  },
  
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1200);
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },
};
