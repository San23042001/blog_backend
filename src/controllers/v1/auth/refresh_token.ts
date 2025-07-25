//Node modules
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

//Custom modules
import { logger } from '@/lib/winston';
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';

//Models
import Token from '@/models/token';

//Types
import type { Request, Response } from 'express';
import { Types } from 'mongoose';

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken =
    req.body.refreshToken;
      if (!refreshToken) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refresh token',
      });
      return;
    }
  try {
    const tokenExits = await Token.exists({ token: refreshToken });
    if (!tokenExits) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refresh token',
      });
      return;
    }

    //Verify refresh token
    const jwtPayload = verifyRefreshToken(refreshToken) as {
      userId: Types.ObjectId;
    };

    const accessToken = generateAccessToken(jwtPayload.userId);

    res.status(200).json({
      accessToken,
    });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Refresh token expired,please login again',
      });
      return;
    }
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refresh token',
      });
      return;
    }

    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error during refresh token', err);
  }
};

export default refreshToken;
