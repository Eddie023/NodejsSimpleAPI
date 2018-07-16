import bookshelf from '../db';
import Todo from './todo.js';

const TABLE_NAME = 'categories';

/**
 * Category model
 */
class Category extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  get todo() {
    return this.belongsToMany(Todo);
  }
}

export default Category;
