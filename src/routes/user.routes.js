import { Router } from "express";
import { registerUser } from "../contollers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

console.log("Environment variables:");
console.log(process.env.CLOUDINARY_API_SECRET);

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/test").get((req, res) => {
  res.json({ message: "Hello from the test route!" });
});

export default router;
