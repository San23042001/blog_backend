import { rateLimit } from 'express-rate-limit';

// Configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
    windowMs: 60000, // 1-minute time window for request limiting
    limit: 60, // Allow a maximum of 60 requests per window per IP
    standardHeaders: true, // ✅ fixed from 'drafts-8'
    legacyHeaders: false,
    message: {
        error: 'You have sent too many requests in a given amount of time. Please try again later.',
    },
});

export default limiter;
