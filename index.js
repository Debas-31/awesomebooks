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
      if (convertedBooks && convertedBooks.length === 0) {
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
/* global luxon */
/* eslint no-undef: "error" */
window.addEventListener('DOMContentLoaded', () => {
  const book = new Book();
  book.displayBooks();
  const { DateTime } = luxon;
  const today = DateTime.local();
  const dateOutput = document.getElementById('date');
  dateOutput.innerHTML = JSON.stringify(today.setLocale('en-US').toLocaleString(DateTime.DATETIME_MED));
});

const booksContainer = document.querySelector('.books-container');
const booksForm = document.querySelector('.book-form-container');
const contact = document.querySelector('.contact-section');
const idList = document.querySelector('#id-list');
const idAdd = document.querySelector('#id-add');
const idContact = document.querySelector('#id-contact');

// For book container
function openBooksContainer() {
  booksContainer.style.display = 'flex';
  booksForm.style.display = 'none';
  contact.style.display = 'none';
}

idList.addEventListener('click', openBooksContainer);

// For add book

function addBookFor() {
  booksContainer.style = 'none';
  booksForm.style.display = 'block';
  contact.style.display = 'none';
}

idAdd.addEventListener('click', addBookFor);

// For contact section

function openContact() {
  booksContainer.style.display = 'none';
  booksForm.style.display = 'none';
  contact.style.display = 'block';
}
idContact.addEventListener('click', openContact);
