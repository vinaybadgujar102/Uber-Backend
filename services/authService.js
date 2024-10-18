const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  const user = new User(userData);
  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    user,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    user,
    token,
  };
};

module.exports = { register, login };
