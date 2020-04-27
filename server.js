const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  cookieSession({
    // Cookie Options
    name: 'session',
    // move to config file
    keys: ['secret key'],
    httpOnly: true,
    // cookie lifespan
    maxAge: 3600000, // 24 hours
  })
);

app.use('/api', routes);

app.listen(PORT, () => console.log(`running on port ${PORT}`));
