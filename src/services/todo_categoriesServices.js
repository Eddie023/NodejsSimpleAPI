import Boom from 'boom';
import Category from '../models/category.js';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAll() {
  return Category.fetchAll();
}

/**
 * create a new category.
 *
 * @param  {Number|String}  category
 * @return {Promise}
 */
export function createCategory(category) {
  return new Category({ name: category.name }).save().then(category => category.refresh());
}

export function deleteCategory(id) {
  return new Category({ id }).fetch().then(category => category.destroy());
}

//   export function updateCategory(id,category){
//     return new Category ({ id }).save({name :category.name }).then(category => category.refresh());
//   }
