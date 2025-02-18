const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: false,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Destructuring
const book = getBook(3);
// const title = book.title;
// const author = book.author;
// title;
// author;
// console.log(title);

// book;

/* const {
  title: BookName,
  author: authorName,
  pages,
  publicationDate,
  genres,
  hasMovieAdaptation,
} = book;

console.log(authorName, BookName, genres);

// const primary = genres[0];
// const secondary = genres[1];

const [primary, secondary] = genres;

console.log(primary, secondary);

//REST/SPREAD

//rest
const [first, second, ...theRest] = genres;

console.log(first, second, theRest);

//spread
const newGenres = [...genres, "epic"];
console.log(newGenres);

const updatedBook = {
  ...book,
  //adding a new property
  moviePublicationDate: "2001-12-31",
  // this is to update the pages property in the book object just spreaded
  pages: 1210,
};
updatedBook;

//Template literals
const summary = `${BookName}, is a ${pages}-page long book, was written by ${authorName} and published in ${
  publicationDate.split("-")[0]
}. The book ${hasMovieAdaptation ? "has" : "has not"} been adapted to a movie.`;
summary;

//Ternaries operators
const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
pagesRange;

const pagesRange2 = ["less than 1000", "over a thousand"][+(pages > 1000)];
pagesRange2;

/////////////////////////////////////////////////
//ARROW FUNCTIONS
function getYear(str) {
  return str.split("-")[0];
}

const getYear2 = (str) => str.split("-")[0];
console.log(getYear2(publicationDate));

/////////////////////////////////////////////////
//Short circutting
//falsy: 0, '', null, undefined

//&&: if the first is true it automatically returns the second
//if the first is false then it SHORTCIRCUITS and returns false
//can be handy in updading values if they exist
console.log(true && "&&:true-string");
console.log(false && "&&:false-string");
console.log(hasMovieAdaptation && "this book has a movie");
console.log("Jonas" && "someString");
console.log(0 && "some string");

// ||: or shortcircuits if the first one is true and return it
//if the first one is false it automatically returns the second one
// can be very handy in setting default values
console.log(true || "some string");
console.log(false || "some string");
console.log(book.translations.spanish);
const spanishTranslaed = book.translations.spanish || "NOT TRANSLATED";
spanishTranslaed;

// console.log(book.reviews.librarything.reviewsCount);
// const countWrong = book.reviews.librarything.reviewsCount || "NO DATA";

// countWrong;

//' ??: nullish coolesence operator
// just like the || except it will only shortcircuit if the first value is null or undefined, not 0 or ''

// const count = book.reviews.librarything.reviewsCount ?? "NO DATA";
// count;

/////////////////////////////////////////////////

//optional chaining

function getTotalReviewCount(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount || 0;
  librarything;
  return goodreads + librarything;
}

console.log(getTotalReviewCount(book));

 */
///////////////////////
/* 
//Array
//map: returns a new array

const books = getBooks();

const titles = books.map((book) => book.title);
console.log(titles);

function getTotalReviewCount(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount || 0;
  librarything;
  return goodreads + librarything;
}

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));

essentialData;
//filter

const longBooksWithMovie = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
longBooksWithMovie;

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);

adventureBooks;

//reduce: array.reduce((acc, cur), inital value )
const totalPages = books.reduce((acc, cur) => acc + book.pages, 0);
totalPages;

//sort if return -ve then asc : +ve then desc
const x = [3, 7, 1, 9, 6];
const sortedX = x.slice().sort((a, b) => a - b); //.slice() to return a new array
sortedX;
x;

const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
sortedByPages;

//add a book object to array
const newBook = {
  id: 6,
  title: "Show me the $",
  author: "Hustler Baby",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

//Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
booksAfterDelete;

//Update book object from array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1111 } : book
);
booksAfterUpdate;
 */
// fetch("https://jsonplaceholder.typicode.com/todos/")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await res.json();
  console.log(data);
}
