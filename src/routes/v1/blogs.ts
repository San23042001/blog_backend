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
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';
//Validators
import {
  createBlogValidation,
  getAllBlogsValidation,
  getBlogsBySlugValidation,
  getBlogsByUserValidation,
  updateBlogsValidation,
} from '@/utils/validators/blogValidators';
import getBlogBySlug from '@/controllers/v1/blog/get_blog_by_slug';
import { body } from 'express-validator';
import updateBlog from '@/controllers/v1/blog/update_blog';

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

router.get(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  getAllBlogsValidation,
  validationError,
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize(['admin', 'user']),
  getBlogsByUserValidation,
  validationError,
  getBlogsByUser,
);

router.get(
  '/:slug',
  authenticate,
  authorize(['admin', 'user']),
  getBlogsBySlugValidation,
  validationError,
  getBlogBySlug,
);

router.put('/:blogId',authenticate,authorize(["admin"]),upload.single('banner_image'),updateBlogsValidation,validationError,uploadBlogBanner('put'),updateBlog)

export default router;
