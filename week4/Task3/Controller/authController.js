import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, '../users.json');

export const registerUser = (req, res) => {
  const data = req.body;
  fs.readFile(path, (err, users) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    users = JSON.parse(users);
    users.push(data)
    fs.writeFile(path, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({ error: err })
      }
      res.json({
        msg: 'User added Successfully',
        email: data.email
      })
    })
  })
};

export const loginUser = (req, res) => {
  const data = req.body;
  fs.readFile(path, (err, users) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    users = JSON.parse(users)
    const requiredUser = users.filter((user) => {
      return user.email == data.email
    })
    if (requiredUser.length !== 0) {
      if (requiredUser[0].password == data.password) {
        const token = jwt.sign({ name: requiredUser[0].name }, 'jwtsecret')
        res.status(201).json({
          msg: 'User Login Successfully',
          token: token
        })
      }
      else {
        res.send("Enter Correct Password")
      }
    } else {
      res.send("Please register")
    }

  })
}

export const testController = (req, res) => {
  res.send(req.user.name);
}