//Node modules
import { Router } from 'express';

// Controllers
import commentBlog from '@/controllers/v1/comment/comment_blog';
import getCommentsByBlog from '@/controllers/v1/comment/get_comments_by_blog';
import deleteComment from '@/controllers/v1/comment/delete_comment';
//Middlewares
import validationError from '@/middlewares/validationError';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';

//Validators
import {
  commentParamsValidator,
  deleteCommentValidator,
  getCommentValidator,
} from '@/utils/validators/commentValidators';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  commentParamsValidator,
  validationError,
  commentBlog,
);
router.get(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  getCommentValidator,
  validationError,
  getCommentsByBlog,
);
router.delete(
  '/:commentId',
  authenticate,
  authorize(['admin', 'user']),
  deleteCommentValidator,
  validationError,
  deleteComment,
);

export default router;
