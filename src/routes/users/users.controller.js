const database = require('../../db');
const Users = require('./users.model');
const IdentifyingInfo = require('../identifyingInfo/identifyingInfo.model');
const { NotFoundError } = require('../../utils/errors');

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
    .then(users => {
      return res.json({ users });
    })
    .catch(error => next(error));
};

const getUserController = async (req, res, next) => {
  try {
    const user = await Users.getUser(req.params.userId);

    if (user === {}) {
      throw new NotFoundError('user not found');
    } else {
      return res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
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

const updateUserController = async (req, res, next) => {
  try {
    const updatedUser = await Users.updateUser(req.params.userId, req.body);

    if (updatedUser.length) {
      return res.json(updatedUser);
    } else {
      throw new NotFoundError('user not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsersController,
  getUserController,
  createUserController,
  listUsersControllerOG,
  updateUserController,
};
