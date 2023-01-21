const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/male_user_jfdd34',
      url: 'https://res.cloudinary.com/hateybazarey/image/upload/v1674285104/avatars/male_user_jfdd34.webp',
    },
  });

  const token =  user.getJwtToken();
  res.status(201).json({
    success: true,
    token
  })
});
