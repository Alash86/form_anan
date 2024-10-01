import { emailRegex, phoneRegex, passwordRegex } from "./regex"
import Joi from "joi";

const schema = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).max(256).required().label("First Name"),
        middle: Joi.string().min(2).max(256).allow("").label("Middle Name"),
        last: Joi.string().min(2).max(256).required().label("last Name"),
    }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .message("phone must be a standard Israeli phone number")
        .min(9)
        .max(11)
        .required()
        .label("Phone"),
    email: Joi.string()
        .pattern(emailRegex)
        .message("email must be a standard email")
        .min(5)
        .email({ tlds: { allow: false } })
        .label("Email"),
    password: Joi.string()
        .pattern(passwordRegex)
        .message(
            "password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
        )
        .min(7).max(20)
        .required()
        .label("Password"),
    image: Joi.object({
        url: Joi.string().min(14).allow("").label("Image url"),
        alt: Joi.string().min(2).max(256).allow("").label("Image alt"),
    }),
    address: Joi.object({
        state: Joi.string().min(2).max(256).allow("").label("state"),
        country: Joi.string().min(2).max(256).required().label("country"),
        city: Joi.string().min(2).max(256).required().label("city"),
        street: Joi.string().min(2).max(256).required().label("street"),
        houseNumber: Joi.number()
            .min(2)
            .max(256)
            .required()
            .messages({ "number.min": "house number must be a minimum of 2 digits." })
            .label("house number"),
        zip: Joi.number()
            .min(2)
            .max(256)
            .messages({ "number.min": "Zip must be a minimum of 2 digits." })
            .required()
            .label("zip"),
    }),
    isBusiness: Joi.boolean(),
});
export default schema;
