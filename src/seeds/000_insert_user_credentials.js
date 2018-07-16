/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users_credentials')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users_credentials').insert([
          {
            updated_at: new Date(),
            username: 'Manish chaulagain',
            password: 'xxxxxxxx'
          },
          {
            updated_at: new Date(),
            username: 'John Doe',
            password: 'xxx11122'
          }
        ])
      ]);
    });
}
