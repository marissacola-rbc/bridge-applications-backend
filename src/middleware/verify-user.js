const { isEmpty } = require('ramda');
const Users = require('../routes/users/users.model');
const { UnauthorizedError } = require('../utils/errors');

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer')[1];

    if (token) {
      const userId = Buffer.from(token, 'base64').toString('binary');
      const { user } = await Users.getUser(userId);

      if (isEmpty(user)) {
        throw new UnauthorizedError();
      } else {
        req.user = user;
        next();
      }
    } else {
      throw new UnauthorizedError();
    }
  } catch (error) {
    return res.status(401).json();
  }
};

module.exports = verifyUser;

// OTc=     //97

// MQ==     // 1
// Mg==     // 2
