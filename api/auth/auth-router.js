const express = require('express');
const router = express.Router();
const {checkUsernameFree, checkUsernameExists, checkPasswordLength} = require('./auth-middleware');
const users = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post('/register', checkUsernameFree, checkPasswordLength, (req,res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  users.add(credentials)
  .then(users => res.status(201).json(users))
 .catch( err => res.status(500).json(err))
})

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
  router.post('/login', checkUsernameExists, (req, res) => {
    let {username, password} = req.body;
    console.log(username, password)
    users.findBy({username})
    .then(user => {
      console.log(user[0]);
      if (user && bcrypt.compareSync(password, user[0].password)) {
      res.status(200).send(`Welcome ${user[0].username}`)
      } else {
        res.status(401).send("Invalid credentials")
      }
    })  
    .catch( err => res.status(500).json(err))
   })

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;