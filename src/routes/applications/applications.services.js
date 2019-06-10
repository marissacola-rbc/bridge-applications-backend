const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });

const { ServerError } = require('../../utils/errors');
const { logger } = require('../../utils/logger');

const invokeEmailService = async ({ firstName, lastName, email }) => {
  try {
    const emailServiceParams = {
      FunctionName: process.env.EMAIL_LAMBDA_NAME,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        body: {
          firstName,
          lastName,
          email: 'marissa.colacitti@gmail.com',
        },
      }),
    };
    await lambda
      .invoke(emailServiceParams)
      .promise()
      .then(result => {
        return result;
      });
  } catch (error) {
    logger.error(`error calling email service: ${error}`);
    throw new ServerError('error calling email service');
  }
};

const invokeSlackService = async ({ applicantName, cohortName }) => {
  try {
    const slackServiceParams = {
      FunctionName: process.env.SLACK_LAMBDA_NAME,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        body: {
          applicantName,
          cohortName,
        },
      }),
    };
    await lambda
      .invoke(slackServiceParams)
      .promise()
      .then(result => {
        return result;
      });
  } catch (error) {
    logger.error(`error calling slack service: ${error}`);
    throw new ServerError('error calling slack service');
  }
};

module.exports = { invokeEmailService, invokeSlackService };
