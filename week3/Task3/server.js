const http = require('http');

const createApplication = require('./createApplication');

const PORT = 5000;

const server = http.createServer(createApplication);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
