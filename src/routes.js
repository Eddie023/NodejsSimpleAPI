import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import todoController from './controllers/todoController';
import categoriesController from './controllers/categoriesController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import refreshController from './controllers/refreshController';

/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.get('/home', (req, res) => {
  res.send('hello world');
});
/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API version
 *     description: App version
 *     produces:
 *       - application/json
 *     tags:
 *       - Base
 *     responses:
 *       200:
 *         description: Application and API version
 *         schema:
 *           title: Users
 *           type: object
 *           $ref: '#/definitions/App'
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', usersController);
router.use('/todo', todoController);
router.use('/categories', categoriesController);
router.use('/signup', signupController);
router.use('/login', loginController);
router.use('/refresh', refreshController);

export default router;
