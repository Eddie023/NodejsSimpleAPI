import { Router } from 'express';
import HttpStatus, { PROXY_AUTHENTICATION_REQUIRED } from 'http-status-codes';
import * as todoService from '../services/todoServices';
import { verifyToken } from '../middlewares/userValidation';

const router = Router();

router.get('/', verifyToken, (req, res, next) => {
  todoService.handleFilter(req.query).then(data => res.json({ data }));
});

router.get('/:id', (req, res) => {
  todoService.getTodoId(req.params.id).then(data => res.json({ data }));
});

/**
 * POST /api/todo
 */
router.post('/', (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  todoService
    .deleteItem(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  todoService
    .updateItem(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
