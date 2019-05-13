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

  static createCohort({
    name,
    welcome_text,
    thank_you_text,
    start_date,
    end_date,
  }) {
    return Cohorts.query()
      .insert({ name, welcome_text, thank_you_text, start_date, end_date })
      .returning('*');
  }

  static updateCohort(cohortId, cohort) {
    return Cohorts.query()
      .where({ id: cohortId })
      .patch(cohort)
      .returning('*');
  }

  static get relationMappings() {
    const Applications = require('../applications/applications.model');
    return {
      applications: {
        relation: Model.HasManyRelation,
        modelClass: Applications,
        join: {
          from: 'cohorts.id',
          to: 'applications.cohort_id',
        },
      },
    };
  }
}

module.exports = Cohorts;
