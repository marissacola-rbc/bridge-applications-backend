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
}

module.exports = IdentifyingInfo;
