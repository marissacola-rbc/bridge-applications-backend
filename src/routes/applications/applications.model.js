const { Model } = require('objection');

class Applications extends Model {
  static get tableName() {
    return 'applications';
  }

  static getApplications() {
    return Applications.query().select();
  }

  static getApplication(applicationId) {
    return Applications.query()
      .select()
      .where('id', applicationId);
  }

  static createApplication({
    user_id,
    cohort_id,
    accepted_test,
    accepted_cohort,
    applicationId,
  }) {
    return Applications.query()
      .insert({
        user_id,
        cohort_id,
        accepted_test,
        accepted_cohort,
        applicationId,
      })
      .returning('*');
  }

  static updateApplication(applicationId, application) {
    return Applications.query()
      .where({ id: applicationId })
      .patch(application)
      .returning('*');
  }

  static get relationMappings() {
    const Cohorts = require('../cohorts/cohorts.model');
    const Users = require('../users/users.model');
    return {
      cohorts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cohorts,
        join: {
          from: 'applications.cohort_id',
          to: 'cohorts.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'applications.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Applications;
