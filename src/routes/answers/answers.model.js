const { Model } = require('objection');

class Answers extends Model {
  static get tableName() {
    return 'answers';
  }

  static getAnswers() {
    return Answers.query().select();
  }

  static getAnswer(answerId) {
    return Answers.query()
      .select()
      .where('id', answerId);
  }

  static createAnswer(answer) {
    return Answers.query()
      .insert(answer)
      .returning('*');
  }

  static updateAnswer({ answerId, answer_text }) {
    return Answers.query()
      .where({ id: answerId })
      .update({
        answer_text,
      })
      .returning('*');
  }

  static get relationMappings() {
    const Questions = require('../questions/questions.model');
    return {
      questions: {
        relation: Model.BelongsToOneRelation,
        modelClass: Questions,
        join: {
          from: 'answers.question_id',
          to: 'questions.id',
        },
      },
    };
  }
}

module.exports = Answers;
