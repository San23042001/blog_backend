//Node Modules
import dotenv from 'dotenv';
//Types
import type ms from 'ms';

dotenv.config();

const config = {
    PORT:process.env.PORT || 3000,
    NODE_ENV:process.env.NODE_ENV,
    WHITELIST_ORIGINS:['https://docs.blog-api.codewithsadee.com'],
    MONGO_URL:process.env.MONGO_URL,
    LOG_LEVEL:process.env.LOG_LEVEL || 'info',
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET!,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
    WHITELIST_ADMINS_MAIL:[
        'shettysanjay719@gmail.com',
        'shettysanjay506@gmail.com'
    ],
    defaultResLimit:20,
    defaultResOffset:0,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET!,
}

export default config;

