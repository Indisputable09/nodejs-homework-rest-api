const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');
const { User } = require('../db/userModel');

const registration = async (email, password) => {
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong');
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return token;
};

module.exports = {
  registration,
  login,
};
