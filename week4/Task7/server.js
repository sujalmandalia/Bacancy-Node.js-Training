import express, { urlencoded } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, 'files.json');

const app = express();
app.use(express.json());

const PORT = 8000;

// const upload = multer({ dest: 'uploads/' }); // this will encrypt the file and we won't be able to preview the file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// get File
app.get('/file/:id', (req, res) => {
  const fileId = req.params.id;
  fs.readFile(path, (err, data) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    data = JSON.parse(data)
    const fileData = data.filter((f) => {
      return f.id === fileId
    })
    if (fileData.length === 0 || fileData === undefined || !fileData) {
      res.status(404).json({ msg: 'File not Found' })
    }

    const filePath = join(__dirname, 'uploads', fileData[0].fileName)
    fs.exists(filePath, (exists) => {
      if (!exists) {
        return res.status(404).json({ error: 'File not found on server' });
      }
      res.sendFile(filePath);
    });
  })
});

// Single File Upload
app.post('/uploadFile', upload.single('file'), (req, res) => {
  const fileObj = {
    id: uuidv4(),
    fileName: req.file.filename,
  };
  fs.readFile(path, (err, files) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    files = JSON.parse(files);
    files.push(fileObj)
    fs.writeFile(path, JSON.stringify(files), (err) => {
      if (err) {
        res.status(500).json({ error: err })
      }
      res.status(200).json({ msg: 'File Uploaded' })
    })
  })
});

// Multiple File Uplaod
app.post('/uploadMultiple', upload.array('file', 3), (req, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    data = JSON.parse(data)
    req.files.map((file) => {
      const fileObj = {
        id: uuidv4(),
        fileName: file.filename
      }
      data.push(fileObj)
      console.log(`id : ${fileObj.id} , filename : ${fileObj.fileName}`);
    })
    console.log(data);
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        res.status(500).json({ error: err })
      }
      res.json({ message: 'Multiple files Uploaded' })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
