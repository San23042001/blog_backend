//Custom modules
import { logger } from '@/lib/winston';

//Models
import User from '@/models/user';

//Types
import type { Request, Response } from 'express';

const updateCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      website,
      facebook,
      instagram,
      linkedin,
      x,
      youtube,
    } = req.body;
    const user = await User.findById(userId).select('+password').exec();

    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      return;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (first_name) user.firstName = first_name;
    if (last_name) user.lastName = last_name;
    if (!user.socialLinks) {
      user.socialLinks = {};
    }
    if (website) user.socialLinks.website = website;
    if (facebook) user.socialLinks.facebook = facebook;
    if (instagram) user.socialLinks.instagram = instagram;
    if (linkedin) user.socialLinks.linkedin = linkedin;
    if (x) user.socialLinks.x = x;
    if (youtube) user.socialLinks.youtube = youtube;

    await user.save();
    res.status(200).json({
      user,
    });
    logger.info('User updated successfully', user);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while updating current user', err);
  }
};

export default updateCurrentUser;
