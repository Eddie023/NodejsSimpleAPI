/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert([
          {
            name: 'GYM',
            updated_at: new Date(),
            user_id: 1
          },

          {
            name: 'Buy',
            updated_at: new Date(),
            user_id: 1
          }
        ])
      ]);
    });
}
