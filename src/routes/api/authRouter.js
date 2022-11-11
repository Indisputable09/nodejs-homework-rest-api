const express = require('express');
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require('../../controllers/authControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');
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
router.post('/users/logout', authMiddleware, asyncWrapper(logoutController));
router.get(
  '/users/current',
  authMiddleware,
  asyncWrapper(currentUserController)
);
router.patch('/', authMiddleware, asyncWrapper(updateSubscriptionController));

module.exports = router;
