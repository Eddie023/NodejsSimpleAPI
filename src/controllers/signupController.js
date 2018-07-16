import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as signUpService from '../services/signUpServices';
// import { findUser, userValidator } from '../validators/userValidator';

const router = Router();

/**
 * POST /api/signup
 */
router.post('/', (req, res, next) => {
  // res.send(req.body);
  signUpService
    .registerUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => {
      res.send('Sorry this username is already taken');
      next(err);
    });
});

router.get('/', (req, res, next) => {
  signUpService
    .checkUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
