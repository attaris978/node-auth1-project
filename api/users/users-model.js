const db = require('../dbconfig.js');
/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db('users');
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
 return db('users').where(filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return db('users').where({user_id}).first();
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  return db('users').insert(user)
  .then(user_id => db('users').where({user_id}).first());
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}