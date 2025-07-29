//Node Modules
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Custom modules
import { logger } from '@/lib/winston';

// Models
import Blog from '@/models/blog';

// Types
import type { Request, Response } from 'express';
import type { IBlog } from '@/models/blog';

type BlogData = Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>;

// Purify the blog content
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, banner, status } = req.body as BlogData;
    const userId = req.userId;

    const cleanContent = purify.sanitize(content);

    // Step 1: Create the blog
    const newBlog = await Blog.create({
      title,
      content: cleanContent,
      banner,
      status,
      author: userId,
    });

    // Step 2: Populate the author field
    const populatedBlog = await Blog.findById(newBlog._id)
      .select('-__v -banner.publicId')
      .populate('author', '-password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    logger.info('New blog created', populatedBlog);

    res.status(201).json({
      blog: populatedBlog,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while creating blog', err);
  }
};

export default createBlog;
