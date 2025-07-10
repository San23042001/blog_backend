//Node modules
import { Router } from 'express';
import multer from 'multer';

//Middleware
import authenticate from '@/middlewares/authenticate';
import validationError from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';

//Controllers
import createBlog from '@/controllers/v1/blog/create_blog';

//Validators
import { createBlogValidation } from '@/utils/validators/blogValidators';

const upload = multer();
const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  uploadBlogBanner('post'),
  createBlogValidation,
  validationError,
  createBlog,
);

export default router;
