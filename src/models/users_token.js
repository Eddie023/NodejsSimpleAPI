import bookshelf from '../db';
// import Todo from './todo.js';

const TABLE_NAME = 'users_token';

/**
 * User model.
 */
class UserToken extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default UserToken;
