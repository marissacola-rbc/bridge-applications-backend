const express = require('express');
const config = require('../../../knexfile');
const database = require('../../db');

const {
  listUsersController,
  getUserController,
  createUserController,
  listUsersControllerWithModel,
} = require('./users.controller');
const { check } = require('express-validator/check');

const usersRouter = express.Router();

usersRouter.get('', listUsersControllerWithModel);
usersRouter.get('/:userId', getUserController);
usersRouter.post(
  '',
  [
    check('first_name', 'first name must be 2 characters').isLength({ min: 2 }),
    check('last_name', 'last name must be 2 characters').isLength({ min: 2 }),
    check('email', 'email must be valid email').isEmail(),
    check('email').custom(value => {
      return database('users')
        .where({ email: value })
        .then(users => {
          if (users.length) {
            return Promise.reject('email must be unique');
          }
        });
    }),
    check('pronouns', 'pronouns must be a list of valid pronouns').exists(),
    check(
      'employment_status',
      'employment status must be valid employment status',
    ).isIn(['full_time', 'part_time', 'in_school', 'looking', 'not_looking']),
    check('employer', 'employer must be valid employer').isString(), // employer is nullable so I dont think we need
    check('identifying_info').isArray(),
  ],
  createUserController,
);

module.exports = {
  usersRouter,
};
