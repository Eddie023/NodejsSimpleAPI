/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('categories_todos')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('categories_todos').insert([
          {
            updated_at: new Date(),
            todo_id: 1,
            category_id: 1
          }
        ])
      ]);
    });
}
