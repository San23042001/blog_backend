//Node modules
import * as express from 'express';
//Types
import {Types} from 'mongoose';

declare global{
    namespace Express{
        interface Request{
            userId?: Types.ObjectId;
        }
    }
}

