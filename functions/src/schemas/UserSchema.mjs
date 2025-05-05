import Joi from "joi";

const createUser = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(0).required(),
    address: Joi.object({
        number: Joi.number().required(),
        streetName: Joi.string().required(),
        cityName: Joi.string().required(),
        state: Joi.string().required(),
        placeId: Joi.string().required()
    }).required()
});

export function validateUser(user) {
    const { error } = createUser.validate(user, { convert: false });
    const hasError = Boolean(error);

    return {
        error: hasError,
        message: hasError ? error.details.map(d => d.message).join(", ").replace(/,(?!.*,)/, " e") : "Erro desconhecido"
    };
}