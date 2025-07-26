//Custom modules
import { logger } from '@/lib/winston';
import config from '@/config';

//Models
import Blog from '@/models/blog';
import User from '@/models/user';

//Types
import type { Request, Response } from 'express';

interface QueryType {
  status?: 'draft' | 'published';
  $or?: Record<string, any>[];
}

const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit as string) || config.defaultResLimit;
    const offset = parseInt(req.query.offset as string) || config.defaultResOffset;
    const search = (req.query.search as string)?.trim();

    const user = await User.findById(userId).select('role').lean().exec();
    const query: QueryType = {};

    // Show only published posts to normal users
    if (user?.role === 'user') {
      query.status = 'published';
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // case-insensitive
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v')
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      limit,
      offset,
      total,
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while fetching blogs', err);
  }
};

export default getAllBlogs;
