const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

const roles = ['admin', 'student', 'instructor', 'mentor'];

exports.seed = knex => {
  return knex('roles')
    .del()
    .then(() => {
      return knex('roles').insert(
        createSeedData(20, () => ({
          name: faker.helpers.randomize(roles),
        })),
      );
    });
};
