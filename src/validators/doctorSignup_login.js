import Joi from "joi";

const doctorSinupValidation = Joi.object({
  FirstName: Joi.string(),
  LastName: Joi.string(),
  Email: Joi.string(),
  Password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least one alphabet, one digit, and one symbol.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
});

export { doctorSinupValidation };
