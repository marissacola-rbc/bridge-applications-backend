const Cohorts = require('./cohorts.model');
const { NotFoundError } = require('../../utils/errors');

const listCohortsController = async (req, res, next) => {
  try {
    const cohorts = await Cohorts.getCohorts();
    return res.json(cohorts);
  } catch (error) {
    next(error);
  }
};

const getCohortController = async (req, res, next) => {
  try {
    const cohort = await Cohorts.getCohort(req.params.cohortId);
    if (cohort.length) {
      return res.json(cohort[0]);
    } else {
      throw new NotFoundError('cohort not found');
    }
  } catch (error) {
    next(error);
  }
};

const createCohortController = async (req, res, next) => {
  try {
    const {
      name,
      welcome_text,
      thank_you_text,
      start_date,
      end_date,
    } = req.body;
    const newCohort = await Cohorts.createCohort({
      name,
      welcome_text,
      thank_you_text,
      start_date,
      end_date,
    });

    return res.json(newCohort);
  } catch (error) {
    next(error);
  }
};

const updateCohortController = async (req, res, next) => {
  try {
    const {
      name,
      welcome_text,
      thank_you_text,
      start_date,
      end_date,
    } = req.body;
    const newCohort = await Cohorts.updateCohort(req.params.cohortId, {
      name,
      welcome_text,
      thank_you_text,
      start_date,
      end_date,
    });

    if (newCohort.length) {
      return res.json(newCohort);
    } else {
      throw new NotFoundError('cohort not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCohortsController,
  getCohortController,
  createCohortController,
  updateCohortController,
};
