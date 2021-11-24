let tempBooks = [];
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

    addBook = () => {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const book = { id: new Date().getTime(), title, author };
      if (localStorage.getItem('booksData') == null) {
        tempBooks.push(book);
        const convertedBooks = JSON.stringify(tempBooks);
        localStorage.setItem('booksData', convertedBooks);
        window.location.reload();
      } else {
        tempBooks = JSON.parse(localStorage.getItem('booksData'));
        tempBooks.push(book);
        const convertedBooks = JSON.stringify(tempBooks);
        localStorage.setItem('booksData', convertedBooks);
        window.location.reload();
      }
    };

    displayBooks = () => {
      const booksData = localStorage.getItem('booksData');
      const convertedBooks = JSON.parse(booksData);
      if (convertedBooks == null) {
        document.getElementById('bookstatus').innerHTML = 'No books added';
      } else {
        document.getElementById('bookstatus').innerHTML = '';
        let html = '';
        convertedBooks.forEach((book) => {
          html += `<article class = "article-container">
          <p class = "title">${book.title} by ${book.author}</p>
          <button class = "book-remove" data-book-id = "${book.id}" id = "remove-button" onclick="removeBook(${book.id})">Remove</button>
          </article></br><hr>`;
        });
        document.getElementById('bookslist').innerHTML = html;
      }
    };
}

// eslint-disable-next-line no-unused-vars
const removeBook = (id) => {
  const booksData = localStorage.getItem('booksData');
  const convertedBooks = JSON.parse(booksData);
  const remainingBooks = convertedBooks.filter((book) => book.id !== id);
  const removedBooks = JSON.stringify(remainingBooks);
  localStorage.setItem('booksData', removedBooks);
  window.location.reload();
};

document.getElementById('addbook').addEventListener('click', () => {
  const book = new Book();
  book.addBook();
});

window.addEventListener('DOMContentLoaded', () => {
  const book = new Book();
  book.displayBooks();
});
