const config = require('../../../knexfile');
const database = require('knex')(config);
const { validationResult } = require('express-validator/check');
const Users = require('./users.model');

const listUsersController = (request, response, next) => {
  return database('users')
    .select()
    .then(users => {
      return response.json({ users });
    })
    .catch(error => {
      next(error); // next doesn't take in anything UNLESS it's an error
    });
};

const listUsersControllerWithModel = async (req, res, next) => {
  return Users.query()
    .eager('identifying_info')
    .then(users => res.json({ users }))
    .catch(error => next(error));
};

// TO DO
// const getUserWithModel = async (req, res, next) => {
//   return Users.query();
// };

const getUserController = async (req, res, next) => {
  try {
    const user = await database('users')
      .select('users.*', 'identifying_info.name as identifier')
      .join(
        'users_identifying_info',
        'users.id',
        '=',
        'users_identifying_info.user_id',
      )
      .join(
        'identifying_info',
        'identifying_info.id',
        '=',
        'users_identifying_info.identifying_info_id',
      )
      .where({ 'users.id': req.params.userId });

    if (user.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    } else {
      return res.json({
        user: {
          ...user[0],
          identifying_info: user.map(u => u.identifier),
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const {
    first_name,
    last_name,
    email,
    pronouns,
    employment_status,
    employer,
    identifying_info,
  } = req.body;

  try {
    const users = await database('users')
      .insert({
        first_name,
        last_name,
        email,
        pronouns,
        employment_status,
        employer,
      })
      .returning('*'); // select what we want back

    // identifying_info = [{'name': "blah", 'isGenderRelated': false}]
    const names = identifying_info.map(i => i.name);

    const existing = await database('identifying_info')
      .select()
      .whereIn('name', names);

    if (existing.length) {
      // create a new row in users_identifying_info
      await database('users_identifying_info').insert(
        existing.map(info => ({
          user_id: users[0].id,
          identifying_info_id: info.id,
        })),
      );

      if (existing.length === identifying_info.length) {
        return res.json({
          user: {
            ...users[0],
          },
        });
      }

      const newInfos = identifying_info
        .filter(info => !existing.find(i => i.name === info.name))
        .map(i => ({
          name: i.name,
          is_gender_related: i.isGenderRelated,
          user_generated: true,
        }));

      const newInfoIds = await database('identifying_info')
        .insert(newInfos)
        .returning('id');

      if (newInfoIds.length) {
        await database('users_identifying_info').insert(
          newInfoIds.map(info => ({
            user_id: users[0].id,
            identifying_info_id: info,
          })),
        );
      }
    }
    return res.json({
      user: {
        ...users[0],
      },
    });
  } catch (error) {
    next(err);
  }
};

module.exports = {
  listUsersController,
  getUserController,
  createUserController,
  listUsersControllerWithModel,
};
