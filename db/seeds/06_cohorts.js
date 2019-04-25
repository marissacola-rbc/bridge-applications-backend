const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  return knex('cohorts')
    .del()
    .then(() => {
      return knex('cohorts').insert(
        createSeedData(20, () => ({
          name: faker.random.words(),
          welcome_text: faker.lorem.sentences(),
          thank_you_text: faker.lorem.sentences(),
        })),
      );
    });
};
