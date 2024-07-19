import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requied!");
  }
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "Email or username already exists!");
  }

  const avatarLoaclpath = req.files?.avatar[0]?.path;
  const coverImageLoaclPath = req.files?.coverImage[0]?.path;

  if (!avatarLoaclpath) {
    throw new ApiError(400, "Avatar file is requied!");
  }

  const avatar = await uploadToCloudinary(avatarLoaclpath);
  const coverImage = await uploadToCloudinary(coverImageLoaclPath);
});

export default registerUser;
