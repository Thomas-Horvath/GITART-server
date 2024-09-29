const Joi = require('joi');

const userRegisterSchema = Joi.object({
    Password: Joi.string().required(),
    BookingName: Joi.string().allow(''),
    LastName: Joi.string().allow(''),
    FirstName: Joi.string().allow(''),
    EmailAddress: Joi.string().email().required(),
    PhoneNumber: Joi.string().allow(''),
    PolicyAccept: Joi.boolean().required()
});

module.exports = userRegisterSchema;