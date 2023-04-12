const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const initDB = require('./config/db');
const router = require('./routes/routes');
const { URL, PORT } = require('./config/config');
const {
  initLogging,
  requestLogger,
  logErrors,
  writeRequestLog,
} = require('./middleware/logging');

const app = express();

initDB();
initLogging();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  writeRequestLog(req);
  next();
});

app.use(router);

// Celebrate validation
app.use(errors());

app.use(logErrors);

app.listen(PORT, () => {
  console.log(`Server is running on\nport: ${PORT}\n url: ${URL}`);
});
