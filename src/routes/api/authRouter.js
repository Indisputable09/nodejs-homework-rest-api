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
  '/register',
  registerUserValidation,
  asyncWrapper(registrationController)
);
router.post('/login', loginUserValidation, asyncWrapper(loginController));
router.post('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.patch('/', authMiddleware, asyncWrapper(updateSubscriptionController));

module.exports = router;
