const Cohorts = require('./cohorts.model');

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
      return res.status(404).json({ error: 'cohort not found' });
    }
  } catch (error) {
    next(error);
  }
};

const createCohortController = async (req, res, next) => {
  try {
    const { name, welcome_text, thank_you_text } = req.body;
    const newCohort = await Cohorts.createCohort({
      name,
      welcome_text,
      thank_you_text,
    });

    return res.json(newCohort);
  } catch (error) {
    next(error);
  }
};

const updateCohortController = async (req, res, next) => {
  try {
    const { name, welcome_text, thank_you_text } = req.body;
    const newCohort = await Cohorts.updateCohort({
      cohortId: req.params.cohortId,
      name,
      welcome_text,
      thank_you_text,
    });

    if (newCohort.length) {
      return res.json(newCohort);
    } else {
      return res.status(404).json({ error: 'cohort not found' });
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
