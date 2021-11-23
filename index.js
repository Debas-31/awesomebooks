let tempBooks = [];
  class Book {
    constructor(title, author, id){
      this.title = title;
      this.author = author;
      this.id = id;
    }
     addBook() {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const book = { id: new Date().getTime(), title, author };
      if (localStorage.getItem('booksData') !== null) {
        tempBooks = JSON.parse(localStorage.getItem('booksData'));
        tempBooks.push(book);
        const convertedBooks = JSON.stringify(tempBooks);
        localStorage.setItem('booksData', convertedBooks);
        window.location.reload();
      } else {
        tempBooks.push(book);
        const convertedBooks = JSON.stringify(tempBooks);
        localStorage.setItem('booksData', convertedBooks);
        window.location.reload();
      }
    };

    removeBook(id) {
      const booksData = localStorage.getItem('booksData');
      const convertedBooks = JSON.parse(booksData);
      const remainingBooks = convertedBooks.filter((book) => book.id !== id);
      const removedBooks = JSON.stringify(remainingBooks);
      localStorage.setItem('booksData', removedBooks);
      window.location.reload();
    }

    displayBooks() {
      const booksData = localStorage.getItem('booksData');
      const convertedBooks = JSON.parse(booksData);
      document.getElementById('bookstatus').innerHTML = 'No books added';
      if (convertedBooks && convertedBooks.length === 0) {
        document.getElementById('bookstatus').innerHTML = 'No books added';
      } else {
        document.getElementById('bookstatus').innerHTML = '';
        let html = '';
        convertedBooks.forEach((book) => {
          html += `<article>
         <h4>${book.title}</h4>
         <h4>${book.author}</h4>
         <button data-book-id = "${book.id}" id = "remove-button" onclick="removeBook(${book.id})">Remove</button>
       </article></br><hr>`;
        });
        document.getElementById('bookslist').innerHTML = html;
      }
    };
    
    window.addEventListener('DOMContentLoaded', displayBooks);
    
    document.getElementById('addbook').addEventListener('click', addBook);
  }




