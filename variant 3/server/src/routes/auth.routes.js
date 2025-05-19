const router = require('express').Router();
const AuthController = require('../controllers/Auth.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
  .get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens)
  .post('/signup', AuthController.signUp)
  .post('/signin', AuthController.signIn)
  .delete('/signout', AuthController.signOut);

module.exports = router;
