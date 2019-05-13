const { Model } = require('objection');

class Questions extends Model {
  static get tableName() {
    return 'questions';
  }

  static getQuestions() {
    return Questions.query().select();
  }

  static getQuestion(questionId) {
    return Questions.query()
      .select()
      .where('id', questionId);
  }

  static createQuestion({ question_text, question_type }) {
    return Questions.query()
      .insert({ question_text, question_type })
      .returning('*');
  }

  static updateQuestion(questionId, question) {
    return Questions.query()
      .where({ id: questionId })
      .patch(question)
      .returning('*');
  }

  static get relationMappings() {
    const Answers = require('../answers/answers.model');
    return {
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Answers,
        join: {
          from: 'questions.id',
          to: 'answers.question_id',
        },
      },
    };
  }
}

module.exports = Questions;
