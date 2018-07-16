import bookshelf from '../db';
import Categories from './category.js';
import Users from './user.js';

const TABLE_NAME = 'todos';

/**
 * User model.
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  category() {
    return this.belongsToMany(Categories);
  }

  user() {
    return this.belongsTo(Users);
  }
}

export default Todo;
