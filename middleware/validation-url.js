const { celebrate, Joi } = require('celebrate');

const validateGetMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { validateGetMovie };
