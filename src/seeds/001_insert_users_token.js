/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users_token')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users_token').insert([
          {
            updated_at: new Date(),
            username: 'manish',
            refresh_token: 'abvcsft',
            users_credentials_id: 1
          }
        ])
      ]);
    });
}
