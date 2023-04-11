const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const initDB = require('./config/db');
const router = require('./routes/routes');
const { URL, PORT } = require('./config/config');

const app = express();

initDB();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on\nport: ${PORT}\n url: ${URL}`);
});
