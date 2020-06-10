import { Joi, Segments } from 'celebrate'

export const show = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}

export const create = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    website: Joi.string().uri().required()
  })
}