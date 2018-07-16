import Boom from 'boom';
import Category from '../models/category.js';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllCategories() {
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

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getCategoriesId(id) {
  return new Category({ id }).fetch().then(category => {
    if (!category) {
      throw new Boom.notFound('Category not found');
    }

    return category;
  });
}

export function getCategoriesName(name) {
  console.log('asldfjas;ldfjsad;lfsadjf;lsdf');
  return new Category({ name }).fetch().then(category => {
    if (!category) {
      throw new Boom.notFound('category not found');
    }
    return category;
  });
}

export function deleteCategory(id) {
  return new Category({ id }).fetch().then(category => category.destroy());
}

export function updateCategory(id, category) {
  return new Category({ id }).save({ name: category.name }).then(category => category.refresh());
}
