import express from "express";
import {
  resgisterController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", resgisterController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot password
router.post("/forgot-password", forgotPasswordController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
