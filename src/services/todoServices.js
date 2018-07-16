import Boom from 'boom';
import Todo from '../models/todo.js';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllTodo() {
  return Todo.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({
    name: todo.name,
    updated_at: todo.updated_at,
    user_id: todo.user_id
  })
    .save()
    .then(todo => todo.refresh());
}

export function handleFilter(query) {
  console.log(query.name);
  const sort_by = query.sort_by || 'id';
  const sort_order = query.sort_order || 'ASC';
  const page = query.page || '1';

  if (query.name) {
    return new Todo()
      .query(function(qb) {
        qb.where('name', 'LIKE', query.name);
      })
      .orderBy(sort_by, sort_order)
      .fetchPage({
        pageSize: query.per_page,
        page: page,
        withRelated: 'category'
      })
      .then(data => {
        return data;
      });
  } else {
    return new Todo()
      .orderBy(sort_by, sort_order)
      .fetchPage({
        pageSize: query.per_page,
        page: page,
        withRelated: 'category'
      })
      .then(data => {
        return data;
      });
  }
}

/**
 * Get a todo by id.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodoId(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('User not found');
    }

    return todo;
  });
}

export function deleteItem(id) {
  return new Todo({ id }).fetch().then(user => user.destroy());
}

export function updateItem(id, item) {
  return new Todo({ id })
    .save({
      name: item.name,
      user_id: item.user_id
    })
    .then(item => item.refresh());
}
