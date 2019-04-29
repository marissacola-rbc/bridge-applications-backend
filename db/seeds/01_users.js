const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

const pronouns = ['she/her', 'they/their', 'he/his'];

const employmentStatuses = [
  'full_time',
  'part_time',
  'in_school',
  'looking',
  'not_looking',
];

exports.seed = knex => {
  return knex('users')
    .del() // deletes all existing entries
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(
        createSeedData(20, () => ({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          pronouns: faker.helpers.randomize(pronouns),
          employment_status: faker.helpers.randomize(employmentStatuses),
          employer: faker.company.companyName(),
        })),
      );
    });
};
