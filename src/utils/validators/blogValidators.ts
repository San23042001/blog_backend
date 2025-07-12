import { body,query,param } from 'express-validator';

export const createBlogValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 180 })
    .withMessage('Title must be less than 180 characters'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('status').optional().isIn(['draft','published']).withMessage('Status must be one of the value,draft or published',),
];

export const getBlogsByUserValidation = [
    param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 to 50'),
    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Offset must be a positive integer'),
]

export const getBlogsBySlugValidation = [
    param('slug')
    .notEmpty()
    .withMessage('Slug is required'),
]

export const getAllBlogsValidation = [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 to 50'),
    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Offset must be a positive integer'),
]
