const { User } = require('../db/userModel');
const { ConflictError } = require('../helpers/errors');
const { registration, login } = require('../services/authServices');

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ConflictError();
  }

  try {
    await registration(email, password);
    res.json({
      Status: '201 Created',
      'Content-Type': 'application/json',
      ResponseBody: {
        user: {
          email,
          subscription: 'starter',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const token = await login(email, password);
    res.json({
      Status: '200 OK',
      'Content-Type': 'application/json',
      ResponseBody: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
};
