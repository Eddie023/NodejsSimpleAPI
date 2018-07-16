import Boom from 'boom';
import signUp from '../models/signUp';
import bcrypt from 'bcrypt-nodejs';
import { REFUSED } from 'dns';
import SignUp from '../models/signUp';
/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function registerUser(user) {
  let username = user.username;
  let password = user.password;
  let updatedAt = user.updated_at;

  let hash = bcrypt.hashSync(password);

  return new signUp({
    username: username,
    password: hash,
    updated_at: updatedAt
  })
    .save()
    .then(signup => signup.refresh());
}

export function checkUsers() {
  return signUp.fetchAll();
}
