const express = require('express');
const {
  registrationController,
  loginController,
} = require('../../controllers/authControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  registerUserValidation,
} = require('../../middlewares/userValidationMiddleware');

const router = express.Router();

router.post(
  '/users/registration',
  registerUserValidation,
  asyncWrapper(registrationController)
);
router.post('/users/login', asyncWrapper(loginController));

module.exports = router;
