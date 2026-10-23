require('dotenv').config();

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

let books = [
    { id: 1, title: "The Great Gatsby" },
    { id: 2, title: "1984" }
];

// GET: fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET: render books as HTML page
app.get('/books/view', (req, res) => {
    res.render('books', { books: books });
});

// POST: add a new book
app.post('/books', (req, res) => {
    const { title } = req.body;
    const newBook = { id: books.length + 1, title: title };
    books.push(newBook);
    res.status(201).json(books);
});

// PATCH: update a book's title by id
app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    book.title = title;
    res.json(book);
});

// DELETE: remove a book by id
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== parseInt(id));
    res.json(books);
});

// GET: send back the secret key
app.get('/secrets', (req, res) => {
    res.send(process.env.SPOTIFY_KEY);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

