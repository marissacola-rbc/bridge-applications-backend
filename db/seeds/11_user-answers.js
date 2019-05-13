const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  return knex('user_answers')
    .del()
    .then(() => knex.select('id').from('questions'))
    .then(rows => {
      questions = rows;
      return knex.select('id').from('users');
    })
    .then(rows => {
      users = rows;
      return knex.select('id').from('answers');
    })
    .then(rows => {
      answers = rows;
      return knex.select('id').from('applications');
    })
    .then(rows => {
      applications = rows;
      return knex('user_answers').insert(
        createSeedData(20, i => {
          return {
            question_id: questions[i].id,
            user_id: users[i].id,
            answer_id: answers[i].id,
            application_id: applications[i].id,
          };
        }),
      );
    });
};
