//Node Modules
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Custom modules
import { logger } from '@/lib/winston';

// Models
import Blog from '@/models/blog';
import Comment from '@/models/comments';

// Types
import type { Request, Response } from 'express';
import type {IComment} from '@/models/comments';


type CommentData = Pick<IComment,'content'>;

/** 
 * Purify the comment content
 **/

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const commentBlog = async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body as CommentData;
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select('_id commentsCount').exec();
    if(!blog){
        res.status(404).json({
            code:'NotFound',
            message:'Blog not found',
        });
        return;
    }

    const cleanContent = purify.sanitize(content);

    const newComment = await Comment.create({
        blogId,
        content:cleanContent,
        userId,
    });

    logger.info('New comment created',newComment);
    blog.commentsCount++;
    await blog.save();

     logger.info('Blog comments count updated',{
        blogId:blog._id,
        commentsCount:blog.commentsCount,
     });

     res.status(201).json({
        comment:newComment
     });

  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while creating comment in blog', err);
  }
};

export default commentBlog;
