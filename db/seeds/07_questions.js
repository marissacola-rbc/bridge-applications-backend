const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

const questionTypes = ['checkbox', 'radio', 'text'];

exports.seed = knex => {
  return knex('questions')
    .del()
    .then(() => {
      return knex('questions').insert(
        createSeedData(20, () => ({
          question_text: faker.lorem.sentence(),
          question_type: faker.helpers.randomize(questionTypes),
        })),
      );
    });
};
