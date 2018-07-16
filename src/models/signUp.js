import bookshelf from '../db';
// import Todo from './todo.js';

const TABLE_NAME = 'users_credentials';

/**
 * User model.
 */
class SignUp extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default SignUp;
