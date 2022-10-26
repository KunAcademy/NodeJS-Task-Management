const connetDB = require('./db/connect');
const express = require('express');
const { route } = require('./routes/task');
require('dotenv').config();
const app = express();
const tasks = require('./routes/task');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connetDB(process.env.MONGOOSE_URL);
    app.listen(port, console.log(`server is listening on port ${3000}`))
  } catch (error) {
    console.log(error)
  }
}

start();