const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

//* Bearer sdclsdcksldclnkskldc.spdcsdcsp.psdocpsdclclsdc

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    console.log(user);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    console.log('=========verifyAccessToken=========', message);
    res
      .status(403)
      .json(
        formatResponse(
          403,
          'Invalid access token',
          null,
          'Invalid access token'
        )
      );
  }
}

module.exports = verifyAccessToken;
