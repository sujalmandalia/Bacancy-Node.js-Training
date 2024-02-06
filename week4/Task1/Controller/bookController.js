/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, '../../../week3/Task3/books.json');

export const getAllBooks = (req, res) => {
  fs.readFile(path, (err, books) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    books = JSON.parse(books)
    return res.status(200).send(books)
  });
};

export const getBookById = (req, res) => {
  const bookId = req.params.id;
  fs.readFile(path, (err, books) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    books = JSON.parse(books)
    const requiredBook = books.filter((book) => {
      return book.id === Number(bookId)
    })
    return res.status(200).send(requiredBook[0])
  })
}

export const createBook = (req, res) => {
  const newBook = req.body;
  fs.readFile(path, (err, books) => {
    if (err) {
      res.status(500).send({ error: err })
    }
    books = JSON.parse(books);
    books.push(newBook)
    fs.writeFile(path, JSON.stringify(books), (err) => {
      if (err) {
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ msg: 'New Book Created' })
    })
  })
}

export const deleteBook = (req, res) => {
  const bookId = req.params.id;
  fs.readFile(path, (err, books) => {
    if (err) {
      return res.status(500).send({error : err})
    }
    books = JSON.parse(books);
    books = books.filter((book) => {
      return book.id !== Number(bookId)
    })
    fs.writeFile(path, JSON.stringify(books), (err) => {
      if (err) {
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ msg: "book deleted" })
    })
  })
}

export const updateBook = (req, res) => {
  const bookId = req.params.id;
  const data = req.body
  fs.readFile(path, (err, books) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    books = JSON.parse(books)
    books = books.map((book) => {
      if (book.id === Number(bookId)) {
        book = data
      }
      return book;
    })
    fs.writeFile(path, JSON.stringify(books), (err) => {
      if (err) {
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ msg: "Book Updated" })
    })
  })
}
