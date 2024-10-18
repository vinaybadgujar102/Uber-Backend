const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).send({
      data: {
        user,
        token,
      },
      success: true,
      error: null,
      message: "registered successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.status(201).send({
      data: {
        user,
        token,
      },
      success: true,
      error: null,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { register, login };
