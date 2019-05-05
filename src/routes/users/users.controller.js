const config = require('../../../knexfile');
const database = require('knex')(config);
const { validationResult } = require('express-validator/check');
const Users = require('./users.model');
const IdentifyingInfo = require('../identifyingInfo/identifyingInfo.model');

const listUsersControllerOG = (request, response, next) => {
  return database('users')
    .select()
    .then(users => {
      return response.json({ users });
    })
    .catch(error => {
      next(error); // next doesn't take in anything UNLESS it's an error
    });
};

const listUsersController = async (req, res, next) => {
  return Users.query()
    .eager('identifying_info')
    .then(users => res.json({ users }))
    .catch(error => next(error));
};

const getUserController = async (req, res, next) => {
  try {
    const user = await Users.getUser(req.params.userId);

    if (user === {}) {
      return res.status(404).json({ error: 'user not found' });
    } else {
      return res.json(user);
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
    const user = await Users.insertUser({
      first_name,
      last_name,
      email,
      pronouns,
      employment_status,
      employer,
    });

    const existingNames = await IdentifyingInfo.getExistingNames(
      identifying_info,
    );

    if (existingNames.length) {
      // create a new row in users_identifying_info
      await database('users_identifying_info').insert(
        existingNames.map(info => ({
          user_id: user.id,
          identifying_info_id: info.id,
        })),
      );

      if (existingNames.length === identifying_info.length) {
        return res.json({
          user,
        });
      }
      const newInfos = identifying_info
        .filter(info => !existingNames.find(i => i.name === info.name))
        .map(i => ({
          name: i.name,
          is_gender_related: i.isGenderRelated,
          user_generated: true,
        }));

      const newInfoIds = await IdentifyingInfo.insertIdentifyingInfo(newInfos);

      if (newInfoIds.length) {
        await database('users_identifying_info').insert(
          newInfoIds.map(info => ({
            user_id: user.id,
            identifying_info_id: info,
          })),
        );
      }
    }
    return res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsersController,
  getUserController,
  createUserController,
  listUsersControllerOG,
};
