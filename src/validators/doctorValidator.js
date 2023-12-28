import Joi from "joi";

const doctorValidation = Joi.object({
  days: Joi.string(),
  start_time:Joi.string(),
  end_time:Joi.string(),
  fee:Joi.string(),
  morning:Joi.string(),
  afternoon:Joi.string(),
  evening:Joi.string(),
  doctorTimeDateId: Joi.string(),
  photo: Joi.string(),
  password: Joi.string(),
  registration: Joi.string(),
  name: Joi.string(),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  email: Joi.string().email(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least one alphabet, one digit, and one symbol.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
  qualification: Joi.string(),
  specialization: Joi.string(),
  experience: Joi.number(),
  gender: Joi.string(),
  age: Joi.number(),
  blood_group: Joi.string(),

  house_street_no: Joi.string(),
  colony_locality: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  pincode: Joi.string(),

  extra_mobile: Joi.string(),
  languages: Joi.string(),
  physical_info: Joi.string(),
  virtual: Joi.string(),

  medical_registration_proof: Joi.string(),
  degree_proof: Joi.string(),
  govt_id_proof: Joi.string(),

  Upload_Photo: Joi.string(),
});

export { doctorValidation };
