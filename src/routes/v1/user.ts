//Node modules
import { Router } from 'express';

//Middleware
import authenticate from '@/middlewares/authenticate';
import validationError from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';
import {
  userValidation,
  getAllUserValidation,
  getUserByIDValidation,
  deleteUserByIDValidation,
} from '@/utils/validators/userValidators';
//Controllers
import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';
import deleteCurrentUser from '@/controllers/v1/user/delete_current_user';
import getAllUser from '@/controllers/v1/user/get_all_users';
import getUserById from '@/controllers/v1/user/get_user_by_id';
import deleteUserById from '@/controllers/v1/user/delete_user_by_id';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);
router.put(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  userValidation,
  validationError,
  updateCurrentUser,
);
router.delete(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);
router.get(
  '/',
  authenticate,
  authorize(['admin']),
  getAllUserValidation,
  validationError,
  getAllUser,
);
router.get(
  '/:userId',
  authenticate,
  authorize(['admin']),
  getUserByIDValidation,
  validationError,
  getUserById,
);
router.delete(
  '/:userId',
  authenticate,
  authorize(['admin']),
  deleteUserByIDValidation,
  validationError,
  deleteUserById,
);
export default router;
