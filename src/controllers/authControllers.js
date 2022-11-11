const { User } = require('../db/userModel');
const { ConflictError, WrongParametersError } = require('../helpers/errors');
const {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
} = require('../services/authServices');

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

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user);

    res.json({
      Status: '204 No Content',
    });
  } catch (error) {
    next(error);
  }
};

const currentUserController = async (req, res) => {
  const { email, subscription } = await currentUser(req.user._id);

  res.json({
    Status: '200 OK',
    'Content-Type': 'application/json',
    ResponseBody: {
      email,
      subscription,
    },
  });
};

const updateSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const availableSubscriptions = ['starter', 'pro', 'business'];
  if (!availableSubscriptions.includes(subscription)) {
    next(new WrongParametersError('Wrong type of subscription'));
  }
  try {
    await changeSubscription(req.user._id, subscription);
    res.json({
      status: 'success',
      code: 200,
      subscription,
      message: 'Subscription has been successfully changed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
};
