// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express  = require('express');
const router = express.Router();

const users = require('./users-model');

router.get('/', (req, res) => {
 users.find()
 .then(users => res.status(200).json(users))
 .catch( err => res.status(500).json(err))
})



// router.post('/users/testGet', (req, res) => {
//   users.findBy(req.body)
//   .then(user => res.status(200).json(user))
//   .catch( err => res.status(500).json(err))
//  })

 router.post('/auth/login', (req, res) => {
  users.findBy(req.body)
  .then(user => res.status(200).json(user))
  .catch( err => res.status(500).json(err))
 })


/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;