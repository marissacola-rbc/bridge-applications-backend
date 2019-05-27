const { UnauthorizedError } = require('../utils/errors');

const ENDPOINTS = {
  LIST_USERS: {
    reqType: 'POST',
    path: '/users',
  },
  CREATE_USERS: {
    reqType: 'POST',
    path: '/users',
  },
  READ_USERS: {
    reqType: 'POST',
    path: '/users/',
  },
  UPDATE_USERS: {
    reqType: 'POST',
    path: '/users/',
  },
};
const endpointMap = {
  [ENDPOINTS.CREATE_USERS]: ['create:users'],
  [ENDPOINTS.LIST_USERS]: ['read:users:all'],
  [ENDPOINTS.READ_USERS]: ['read:users:all', 'read:users:own'],
  [ENDPOINTS.UPDATE_USERS]: ['update:users'],
};

const authorize = (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(new UnauthorizedError());
  }

  //   programatically authorize each endpoint
  console.log(req);

  next();
};

module.exports = {
  authorize,
};
