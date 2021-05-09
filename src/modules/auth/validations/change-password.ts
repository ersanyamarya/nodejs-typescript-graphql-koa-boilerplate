import Joi from 'joi'
// import joiObjectId from 'joi-objectid'

// Joi.objectId = joiObjectId(Joi)

export default Joi.object({
  // userID: Joi.objectId().required(),
  userID: Joi.string().required(),
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
})
