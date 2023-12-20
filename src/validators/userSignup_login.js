import Joi from "joi";

const userSinupValidation = Joi.object({
  FirstName: Joi.string(),
  LastName: Joi.string(),
  Email: Joi.string(),
  Password: Joi.string().min(4).required(),
});

export { userSinupValidation };
