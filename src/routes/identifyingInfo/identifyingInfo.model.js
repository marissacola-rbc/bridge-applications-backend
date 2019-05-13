const { Model } = require('objection');

class IdentifyingInfo extends Model {
  static get tableName() {
    return 'identifying_info';
  }

  static getExistingNames(identifying_info) {
    const names = identifying_info.map(i => i.name);
    return IdentifyingInfo.query()
      .select()
      .whereIn('name', names);
  }

  static insertIdentifyingInfo(identifyingInfoArray) {
    return IdentifyingInfo.query()
      .insert(identifyingInfoArray)
      .returning('id');
  }

  static getIdentifyingInfos() {
    return IdentifyingInfo.query().select();
  }

  static getIdentifyingInfo(identifyingInfoId) {
    return IdentifyingInfo.query()
      .select()
      .where('id', identifyingInfoId);
  }

  static createIdentifyingInfo(identifyingInfo) {
    return IdentifyingInfo.query()
      .insert(identifyingInfo)
      .returning('*');
  }

  static updateIdentifyingInfo({ identifyingInfoId, identifyingInfo }) {
    return IdentifyingInfo.query()
      .where({ id: identifyingInfoId })
      .update({
        identifyingInfo,
      })
      .returning('*');
  }

  static get relationMappings() {
    const Users = require('../users/users.model');
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: 'identifying_info.id',
          through: {
            from: 'users_identifying_info.identifying_info_id',
            to: 'users_identifying_info.user_id',
          },
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = IdentifyingInfo;
