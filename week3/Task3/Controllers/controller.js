/* eslint-disable no-console */
const fs = require('fs');
const url = require('url');

// GET
const getBooks = (req, res) => {
  fs.readFile(`${__dirname}/../books.json`, (err, books) => {
    if (err) {
      res.writHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(books);
  });
};

// POST
const createBook = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    data = JSON.parse(data);
    fs.readFile(`${__dirname}/../books.json`, 'utf-8', (err, books) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
      books = JSON.parse(books);
      books.push(data);
      console.log(books);
      fs.writeFile(`${__dirname}/../books.json`, JSON.stringify(books), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: err.message }));
        }
        return res.end('done');
      });
    });
  });
};

// Delete
const deleteBook = (req, res) => {
  const requestedUrl = url.parse(req.url);
  const queryParams = requestedUrl.query;
  const id = queryParams.split('=')[1];

  fs.readFile(`${__dirname}/../books.json`, 'utf-8', (err, books) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
    books = JSON.parse(books);
    books = books.filter((book) => book.id !== Number(id));
    fs.writeFile(`${__dirname}/../books.json`, JSON.stringify(books), (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
    });
    res.end('deleted');
  });
};

const updateBook = (req, res) => {
  const requestedUrl = url.parse(req.url);
  const queryParams = requestedUrl.query;
  const id = queryParams.split('=')[1];

  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    data = JSON.parse(data);
    fs.readFile(`${__dirname}/../books.json`, 'utf-8', (err, books) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
      books = JSON.parse(books);
      books = books.map((book) => {
        if (book.id == id) {
          book = data;
        }
        return book;
      });
      fs.writeFile(`${__dirname}/../books.json`, JSON.stringify(books), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: err.message }));
        }
      });
      res.end('Updated');
    });
  });
};

module.exports = {
  getBooks,
  deleteBook,
  createBook,
  updateBook,
};
