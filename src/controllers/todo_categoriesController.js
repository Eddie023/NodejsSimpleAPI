import { Router } from 'express';
import HttpStatus, { PROXY_AUTHENTICATION_REQUIRED } from 'http-status-codes';
import * as categoryService from '../services/todo_categoriesServices';

const router = Router();

/**
 * GET /api/categories
 */
router.get('/', (req, res, next) => {
  categoryService
    .getAllCategories()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

// router.get('/:id', (req,res)=>{
//   todoService
//     .getTodoId(req.params.id)
//     .then(data => res.json({ data }))
// });
/**
 * POST /api/categories
 */
router.post('/', (req, res) => {
  categoryService
    .createCategory(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  categoryService
    .deleteCategory(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  categoryService
    .updateCategory(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
