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
}

module.exports = Users;
