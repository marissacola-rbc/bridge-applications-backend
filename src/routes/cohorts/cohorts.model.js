const { Model } = require('objection');

class Cohorts extends Model {
  static get tableName() {
    return 'cohorts';
  }

  static getCohorts() {
    return Cohorts.query().select();
  }

  static getCohort(cohortId) {
    return Cohorts.query()
      .select()
      .where('id', cohortId);
  }

  static createCohort(cohort) {
    return Cohorts.query()
      .insert(cohort)
      .returning('*');
  }

  static updateCohort({ cohortId, name, welcome_text, thank_you_text }) {
    return Cohorts.query()
      .where({ id: cohortId })
      .update({
        name,
        welcome_text,
        thank_you_text,
      })
      .returning('*');
  }
}

module.exports = Cohorts;
