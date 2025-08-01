//Custom modules
import {v2 as cloudinary} from 'cloudinary';

//Custom modules
import { logger } from '@/lib/winston';

//Models
import Blog from '@/models/blog';
import User from '@/models/user';

//Types
import type { Request, Response } from 'express';

const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId;

    const user = await User.findById(userId).select('role').lean().exec();

    const blog = await Blog.findById(blogId).select('author banner.publicId').lean().exec();

    if (!blog) {
      res.status(404).json({ code: 'NotFound', message: 'Blog not found' });
      return;
    }
    //Show only the published post to a normal user
    if (blog.author !== userId && user?.role !== 'admin') {
      res.status(403).json({
        code: 'AuthorizationError',
        message: 'Access denied,insufficient permissions',
      });
      logger.warn('A user tried to access a blog without permission', {
        userId,
      });
      return;
    }

    await cloudinary.uploader.destroy(blog.banner.publicId);
    logger.info('Blog banner deleted from Cloudinary',{
      publicId:blog.banner.publicId
    })

    await Blog.deleteOne({_id:blogId});
     logger.info('Blog deleted successfully',{
     blogId
    });

    res.sendStatus(204);

  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while deleting blog', err);
  }
};

export default deleteBlog;
