//Node modules
import { param, query, body } from 'express-validator';
//Modules
import User from '@/models/user';

export const userValidation = [
  body('username')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Username must be less than 20 characters')
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });
      if (userExists) {
        throw Error('This username is already in use');
      }
    }),
  body('email')
    .optional()
    .isLength({ max: 50 })
    .withMessage('email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (userExists) {
        throw Error('This email is already in use');
      }
    }),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('first_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('First name must be at less 20 characters long'),
  body('last_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Last name must be at less 20 characters long'),
  body(['website', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'])
    .optional()
    .isURL()
    .withMessage('Invalid URL')
    .isLength({ max: 100 })
    .withMessage('Url must be less than 20 characters'),
];

export const getAllUserValidation = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer'),
];

export const getUserByIDValidation = [
  param('userId').notEmpty().isMongoId().withMessage('Invalid user ID'),
];

export const deleteUserByIDValidation = [
  param('userId').notEmpty().isMongoId().withMessage('Invalid user ID'),
];
