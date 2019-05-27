const express = require('express');
const { check } = require('express-validator/check');
const verifyToken = require('../../middleware/verify-token');
const { validate } = require('../../middleware/validate');
const IdentifyingInfo = require('./identifyingInfo.model');
const {
  listIdentifyingInfosController,
  getIdentifyingInfoController,
  createIdentifyingInfoController,
  updateIdentifyingInfoController,
} = require('./identifyingInfo.controller');

const identifyingInfoRouter = express.Router();
identifyingInfoRouter.use(verifyToken);

identifyingInfoRouter.get('', listIdentifyingInfosController);
identifyingInfoRouter.get('/:identifyingInfoId', getIdentifyingInfoController);
identifyingInfoRouter.post(
  '',
  [
    check('name').isString(),
    check('name').custom(value => {
      return IdentifyingInfo.getIdentifyingInfos()
        .where({ name: value })
        .then(result => {
          if (result.length) {
            return Promise.reject('name must be unique');
          }
        })
        .catch(err => Promise.reject());
    }),
    check('is_gender_related').isBoolean(),
  ],
  validate,
  createIdentifyingInfoController,
);
identifyingInfoRouter.put(
  '/:identifyingInfoId',
  [
    check('name').isString(),
    check('name').custom(value => {
      return IdentifyingInfo.getIdentifyingInfos()
        .where({ name: value })
        .then(result => {
          if (result.length) {
            return Promise.reject('name must be unique');
          }
        })
        .catch(err => Promise.reject());
    }),
    check('is_gender_related').isBoolean(),
    check('identifyingInfoId').custom((value, { req }) => {
      return IdentifyingInfo.getIdentifyingInfo(value)
        .then(result => {
          if (result.length === 0) {
            Promise.reject('invalid identifyingInfoId');
          } else {
            if (!result[0].user_generated && req.user.role === 'user') {
              Promise.reject('unauthorized');
            }
          }
        })
        .catch(err => Promise.reject());
    }),
  ],
  validate,
  updateIdentifyingInfoController,
);

module.exports = { identifyingInfoRouter };
