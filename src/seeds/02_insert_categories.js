/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('categories')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert([
          {
            name: 'Office related'
          },

          {
            name: 'Home related'
          },
          {
            name: 'Personal goals'
          }
        ])
      ]);
    });
}
