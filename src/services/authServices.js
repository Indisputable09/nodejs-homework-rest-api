const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
// const { NotAuthorizedError } = require('../helpers/errors');

const registration = async (email, password) => {
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   return {
  //     Status: '409 Conflict',
  //     'Content-Type': 'application/json',
  //     ResponseBody: {
  //       message: 'Email in use',
  //     },
  //   };
  // }
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  await user.save();
  // try {
  //   const newUser = new User({
  //     email,
  //     password: await bcrypt.hash(password, 10),
  //   });
  //   // newUser.setPassword(password);
  //   await newUser.save();
  //   res.status(201).json({
  //     status: 'success',
  //     code: 201,
  //     data: {
  //       message: 'Registration successful',
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }

  // await user.save();
};

const login = async userId => {};

module.exports = {
  registration,
  login,
};
