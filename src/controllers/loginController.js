import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as signUpService from '../services/signUpServices';
// import { findUser, userValidator } from '../validators/userValidator';
import { userValidation } from '../middlewares/userValidation';
import { verifyRefreshToken } from '../middlewares/userValidation';

const router = Router();

router.post('/', userValidation, (req, res, next) => {
  res.status(HttpStatus.ACCEPTED).json({
    message: 'User has been validated'
  });
});

export default router;
