const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  return knex('answers')
    .del()
    .then(() => knex.select('id').from('questions'))
    .then(rows => {
      questions = rows;
      return knex('answers').insert(
        createSeedData(20, i => {
          return {
            question_id: questions[i].id,
            answer_text: faker.lorem.sentence(),
          };
        }),
      );
    });
};
