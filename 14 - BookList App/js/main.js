const list = document.querySelector('#book-list');
const form = document.querySelector('#book-form');
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

//Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: Handle UI tasks
class UI {
    static dispalayBooks() {
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#"
        name="delete-btn"
        class="btn btn-danger btn-sm 
        delete">X</a></td>
        `;
        list.appendChild(row)
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container')
        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1500)
    }

    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}

//Store Class
class Store {
    static getBooks() {
        let books;
        if (!localStorage.getItem('books')) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))

    }
}

//Event: Dispalay Books
document.addEventListener('DOMContentLoaded', UI.dispalayBooks)

//Event: Add a Book
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if (!title || !author || !isbn) {
        return UI.showAlert('Please fill in all filds', 'danger')
    }

    const book = new Book(title, author, isbn);

    UI.addBookToList(book);

    Store.addBook(book)

    UI.showAlert('Book Added', 'success')

    UI.clearFields()
})

//Event: Remove a Book
list.addEventListener('click', (e) => {
    if (e.target.name === 'delete-btn') {
        UI.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
        UI.showAlert('Book Removed', 'info')
    }
})