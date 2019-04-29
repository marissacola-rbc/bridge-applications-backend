const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  return knex('applications')
    .del()
    .then(() => knex.select('id').from('users'))
    .then(rows => {
      users = rows;
      return knex.select('id').from('cohorts');
    })
    .then(rows => {
      cohorts = rows;
      return knex('applications').insert(
        createSeedData(20, i => {
          return {
            user_id: users[i].id,
            cohort_id: cohorts[i].id,
            accepted_test: faker.random.boolean(),
            accepted_cohort: faker.random.boolean(),
          };
        }),
      );
    });
};
