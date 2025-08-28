import Joi from 'joi';

const reviewValidationSchema = Joi.object({
    productId: Joi.string().required(),
    comment: Joi.string().allow(''),
    rating: Joi.number().min(1).max(5).required()
});

export default reviewValidationSchema;