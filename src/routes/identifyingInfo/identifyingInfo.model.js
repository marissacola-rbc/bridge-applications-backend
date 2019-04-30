const { Model } = require('objection');

class IdentifyingInfo extends Model {
  static get tableName() {
    return 'identifying_info';
  }
}

module.exports = IdentifyingInfo;
