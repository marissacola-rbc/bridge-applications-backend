const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const IdentifyingInfo = require('../identifyingInfo/identifyingInfo.model');
    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: 'users.id',
          through: {
            from: 'users_identifying_info.user_id',
            to: 'users_identifying_info.identifying_info_id',
          },
          to: 'identifying_info.id',
        },
      },
    };
  }

  static async getUser(userId) {
    const user = await Users.query()
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
      .where({ 'users.id': userId });

    if (user.length) {
      const {
        id,
        first_name,
        last_name,
        email,
        pronouns,
        employment_status,
        employer,
      } = user[0];
      return {
        user: {
          id,
          first_name,
          last_name,
          email,
          pronouns,
          employment_status,
          employer,
          identifying_info: user.map(u => u.identifier),
        },
      };
    } else {
      return {};
    }
  }

  static insertUser({
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns,
  }) {
    return Users.query()
      .insert({
        first_name,
        last_name,
        email,
        employment_status,
        employer,
        pronouns,
      })
      .returning('*'); // select what we want back
  }
}

module.exports = Users;
