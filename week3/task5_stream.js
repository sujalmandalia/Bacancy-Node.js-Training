// Streams are objects that let you read data from a source or write a data to a destination in a continuous fashion.

// 4 types of Strams
// 1. Readable : used for read operation
// 2. Writable : used for write operation
// 3. Duplex : used for both read and write operation
// 4. Transform : Type of duplex where output is computed based on the input.

// commonly used events in the streams are :
/*
1. data : fired when there is data available to read
2. end : fired when there is no more data to read
3. error : when there is any error receiving or writing the data
4. finish : fired when all the data has been flushed to the underlying system
*/

const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  // Creating Readable Stream
  // const rstream = fs.createReadStream('input.txt');
  // rstream.on('data', (chunk) => {
  //   res.write(chunk);
  // });

  // rstream.on('end', () => {
  //   res.end();
  // });

  // rstream.on('error', (err) => {
  //   console.log(err);
  //   res.end('File Not Found');
  // });

  // using pipe
  const readStream = fs.createReadStream('input.txt');
  // readStream.pipe(res);// The whole above method can be just done by this single line
  const writeStream = fs.createWriteStream('output.txt');
  readStream.pipe(writeStream);
  res.end();
});

server.listen(8000, () => {
  console.log('Server started at port 8000');
});

//
