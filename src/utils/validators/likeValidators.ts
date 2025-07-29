import { body, query, param } from 'express-validator';

export const likeParamsValidator = [
    param('blogId')
    .isMongoId()
    .withMessage('Invalid blog ID'),
    body('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('Invalid user ID')
]