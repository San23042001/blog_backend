//Node modules
import { Router } from "express";


// Controllers
import register from "@/controllers/v1/auth/register";
import login from "@/controllers/v1/auth/login";
import refreshToken from "@/controllers/v1/auth/refresh_token";
import logout from "@/controllers/v1/auth/logout";
//Middlewares
import validationError from "@/middlewares/validationError";
import authenticate from "@/middlewares/authenticate";
//Validators
import { registerValidation,loginValidation,refreshTokenValidation } from "@/utils/validators/authValidators";



const router = Router();

router.post('/register',registerValidation,validationError,register);
router.post('/login',loginValidation,validationError,login);
router.post('/refresh-token',refreshTokenValidation,validationError,refreshToken);
router.post('/logout',authenticate,logout)
export default router;