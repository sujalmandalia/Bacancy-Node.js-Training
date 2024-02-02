/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const url = require('url');
const controller = require('./Controllers/controller');

const createApplication = (req, res) => {
  if (req.url === '/favicon.ico') {
    return res.end();
  }
  const parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === '/books') {
    if (req.method === 'GET') {
      controller.getBooks(req, res);
    } if (req.method === 'POST') {
      controller.createBook(req, res);
    } if (req.method === 'DELETE') {
      controller.deleteBook(req, res);
    } if (req.method === 'PUT') {
      controller.updateBook(req, res);
    }
  }
};

module.exports = createApplication;
