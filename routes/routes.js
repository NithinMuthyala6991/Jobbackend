import { Router } from "express";
import userController from "../controller/usersController.js";
import mediaHandler from "../middlewares/mediaHandler.js";

import { verifyToken } from "../middlewares/jwt.js";

const userRoute = Router();


userRoute.post("/login",userController.login);
userRoute.post("/sign-up",userController.signUp)

userRoute.post("/add-job", verifyToken, mediaHandler.single("image"),userController.addJob)
userRoute.get("/get-all-jobs",userController.getAllJobs);
userRoute.get("/get-my-jobs", verifyToken,userController.getMyJobs);

export default userRoute;