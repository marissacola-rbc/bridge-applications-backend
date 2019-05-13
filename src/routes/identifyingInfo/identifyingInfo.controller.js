const IdentifyingInfo = require('./identifyingInfo.model');
const { NotFoundError } = require('../../utils/errors');

const listIdentifyingInfosController = async (req, res, next) => {
  try {
    const identifyingInfos = await IdentifyingInfo.getIdentifyingInfos();
    return res.json(identifyingInfos);
  } catch (error) {
    next(error);
  }
};

const getIdentifyingInfoController = async (req, res, next) => {
  try {
    const identifyingInfo = await IdentifyingInfo.getIdentifyingInfo(
      req.params.identifyingInfoId,
    );
    if (identifyingInfo.length) {
      return res.json(identifyingInfo[0]);
    } else {
      throw new NotFoundError('identifyingInfo not found');
    }
  } catch (error) {
    next(error);
  }
};

const createIdentifyingInfoController = async (req, res, next) => {
  try {
    const { name, is_gender_related } = req.body;
    console.log('hit', name, is_gender_related);
    const newIdentifyingInfo = await IdentifyingInfo.createIdentifyingInfo({
      name,
      is_gender_related,
      user_generated: req.user.role === 'user',
    });

    return res.json(newIdentifyingInfo);
  } catch (error) {
    next(error);
  }
};

const updateIdentifyingInfoController = async (req, res, next) => {
  try {
    const { name, is_gender_related } = req.body;
    const newIdentifyingInfo = await IdentifyingInfo.updateIdentifyingInfo({
      identifyingInfoId: req.params.identifyingInfoId,
      identifyingInfo: {
        name,
        is_gender_related,
      },
    });

    if (newIdentifyingInfo.length) {
      return res.json(newIdentifyingInfo);
    } else {
      throw new NotFoundError('identifyingInfo not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listIdentifyingInfosController,
  getIdentifyingInfoController,
  createIdentifyingInfoController,
  updateIdentifyingInfoController,
};
