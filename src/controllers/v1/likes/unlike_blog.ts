// Custom modules
import { logger } from '@/lib/winston';

// Models
import Blog from '@/models/blog';
import Like from '@/models/like';

// Types
import type { Request, Response } from 'express';

const unlikeBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { userId } = req.body;
  try {
    const existingLike = await Like.findOne({ userId, blogId }).lean().exec();
    if (!existingLike) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Like not found',
      });
      return;
    }
    await Like.deleteOne({ _id: existingLike._id });
    const blog = await Blog.findById(blogId).select('likesCount').exec();
    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    blog.likesCount--;
    await blog.save();
    logger.info('Blog disliked successfully',{
      userId,
      blog:blog._id,
      likesCount:blog.likesCount
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while disliking a blog', err);
  }
};

export default unlikeBlog;
