const { isEmpty } = require('ramda');
const Users = require('../routes/users/users.model');
const { UnauthorizedError } = require('../utils/errors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authenticate = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-rz0zjltb.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: 'application-api',
  issuer: 'https://dev-rz0zjltb.auth0.com/',
  algorithms: ['RS256'],
});

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];

    if (token) {
      console.log(token);
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

// module.exports = verifyToken;
module.exports = authenticate;
