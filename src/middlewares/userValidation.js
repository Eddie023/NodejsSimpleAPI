import Boom from 'boom';
import signUp from '../models/signUp';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import UserToken from '../models/users_token';

export function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    let temp = jwt.verify(bearerToken, 'secret', (err, token) => {
      if (err) {
        // res.sendStatus(403);
        res.send('not verified');
      } else {
        // res.send("verified");
        // res.sendStatus(200);
        next();
      }
    });
  } else {
    res.send('You need to have token to get access');
  }
}

async function validateUser(user) {
  let username = user.username;
  let password = user.password;

  let host = signUp
    .forge()
    .query(function(qb) {
      qb.where({
        username: username
      }).select('password');
    })
    .fetch()
    .then(host => {
      if (!host) {
        throw new Boom.notFound('Cant find the user');
      }
      return host;
    });

  let hostData = host
    .then(data => {
      let result = data.get('password');
      return result;
    })
    .catch(console.log('Check your password again'));

  let hash = await hostData;

  if (bcrypt.compareSync(password, hash)) {
    ///access token should be provided now
    return true;
  } else {
    return false;
  }
}

export async function userValidation(req, res, next) {
  let validUser = await validateUser(req.body);

  if (validUser) {
    let user = req.body;
    let username = user.username;
    let refreshToken = jwt.sign({ username }, 'refreshTokenSecret');
    saveRefreshToken(user.username, refreshToken);
    jwt.sign({ user }, 'secret', { expiresIn: '300s' }, (err, token) => {
      res.json({
        accesstoken: token,
        refreshtoken: refreshToken
      });
      next();
    });
    // next();
  } else {
    res.send('User not validated');
  }
}

async function saveRefreshToken(userName, rToken) {
  //create a database for user
  let user = signUp
    .forge({ username: userName })
    .fetch()
    .then(data => {
      if (!data) {
        console.log('no data');
      }
      return data;
    });

  let id = await user.then(data => {
    return data.get('id');
  });


  return UserToken.forge({
    username: userName,
    refreshToken: rToken,
    users_credentials_id: id
  })
    .save()
    .then(token => token.refresh())
    .catch(console.log('Already saved user data'));
}

export async function verifyRefreshToken(req, res, next) {
  const refreshTokenHeader = req.headers['authorization'];
  const username = req.headers['username'];

  if (typeof refreshTokenHeader !== 'undefined') {
    const token = refreshTokenHeader.split(' ');
    const refreshToken = token[1];

    let auth = UserToken.forge()
      .query(function(qb) {
        qb.where({
          username: username
        });
      })
      .fetch()
      .then(user => {
        if (!user) {
          throw new Boom.notFound('Failed to Auth ');
        }
        return user;
      });

    let dbRefreshToken = await auth.then(data => {
      return data.get('refreshToken');
    });

    if (refreshToken === dbRefreshToken) {
      let access = grantAccess(username);
      res.json({
        access
      });
      next();
    } else {
      console.log('different');
    }
  }
}

function grantAccess(username) {
  let accessToken = jwt.sign({ username }, 'secret', { expiresIn: '300s' });
  return accessToken;
}
