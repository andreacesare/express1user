const Joi = require("joi");


const userSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9._]{4,20}$/)
        .required()
        .messages({
            "string.pattern.base": "Username non valido: può contenere solo lettere, numeri, punti e underscore, lunghezza 4-20 caratteri.",
            "any.required": "Username è obbligatorio."
        }),

    email: Joi.string()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required()
        .messages({
            "string.pattern.base": "Email non valida.",
            "any.required": "Email è obbligatoria."
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "La password deve avere almeno 8 caratteri.",
            "any.required": "Password è obbligatoria."
        })

}).unknown(true);

const usernameSchema= Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9._]{4,20}$/)
        .required()
        .messages({
            "string.pattern.base": "Username non valido: può contenere solo lettere, numeri, punti e underscore, lunghezza 4-20 caratteri.",
            "any.required": "Username è obbligatorio."
        })}).unknown(true);

const emailSchema= Joi.object({
    email: Joi.string()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required()
        .messages({
            "string.pattern.base": "Email non valida.",
            "any.required": "Email è obbligatoria."
        })

}).unknown(true);

const passwordSchema= Joi.object({
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "La password deve avere almeno 8 caratteri.",
            "any.required": "Password è obbligatoria."
        })

}).unknown(true);




function validateUser(data) {
    const { error } = userSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
}

function validateUsername(data){
    const { error } =usernameSchema.validate(data);
    if (error) {
        console.error(error.details);
        throw new Error(error.details[0].message);
    }
}
function validateEmail(data){
    const {error}=emailSchema.validate(data);
    if (error) {
        console.error(error.details);
        throw new Error(error.details[0].message);
    }
}
function validatePassword(data){
    const {error}=passwordSchema.validate(data);
    if (error) {
        console.error(error.details);
        throw new Error(error.details[0].message);
    }
}

module.exports={validateUser,validateUsername,validateEmail,validatePassword};