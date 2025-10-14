import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  acceptTask,
  getTaskById,
} from '../controllers/task.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/accept', acceptTask);

export default router;
