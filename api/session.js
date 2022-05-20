const session = require('express-session');

const sessionConfig = {
    name: 'chocolatechip',
    secret: process.env.SECRET || "This is the other secret",
    cookie: {
      maxAge: 30000,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false
  };

module.exports = session(sessionConfig);