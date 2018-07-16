import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as signUpService from '../services/signUpServices';
// import { findUser, userValidator } from '../validators/userValidator';
import { userValidation } from '../middlewares/userValidation';
import { verifyRefreshToken } from '../middlewares/userValidation';

const router = Router();

router.post('/', verifyRefreshToken, (req, res, next) => {
  console.log('working');
});

export default router;
