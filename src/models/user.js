import bookshelf from '../db';
import Todo from './todo.js';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  todos() {
    return this.hasMany(Todo);
  }
}

export default User;
