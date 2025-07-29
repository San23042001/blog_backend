//Node modules
import { Router } from "express";
import { body,param } from "express-validator";


// Controllers
import likeBlog from "@/controllers/v1/likes/like_blog";

//Middlewares
import validationError from "@/middlewares/validationError";
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import unlikeBlog from "@/controllers/v1/likes/unlike_blog";
//Validators
import { likeParamsValidator } from "@/utils/validators/likeValidators";




const router = Router();

router.post('/blog/:blogId',authenticate,authorize(['admin','user']),likeParamsValidator,validationError,likeBlog);
router.delete('/blog/:blogId',authenticate,authorize(['admin','user']),likeParamsValidator,validationError,unlikeBlog);

export default router;