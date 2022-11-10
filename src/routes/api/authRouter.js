const express = require('express');
const {
  registrationController,
  loginController,
} = require('../../controllers/authControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  registerUserValidation,
  loginUserValidation,
} = require('../../middlewares/userValidationMiddleware');

const router = express.Router();

router.post(
  '/users/register',
  registerUserValidation,
  asyncWrapper(registrationController)
);
router.post('/users/login', loginUserValidation, asyncWrapper(loginController));

module.exports = router;
