// Custom modules
import { logger } from '@/lib/winston';

// Models
import Blog from '@/models/blog';
import Comment from '@/models/comments';

// Types
import type { Request, Response } from 'express';

const getCommentsByBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).select('_id').lean().exec();
    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    const allComments = await Comment.find({ blogId }).lean().exec();

    res.status(200).json({
      comments: allComments,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while fetching comments in blog', err);
  }
};

export default getCommentsByBlog;
