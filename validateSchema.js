const Joi = require("joi");

const listingSchema = Joi.object({
    listing:Joi.object({
        
            title:Joi.string().pattern(/^[a-zA-Z\s]+$/).required(),
            description:Joi.string().required(),
            price:Joi.number().required().min(0),
            location:Joi.string().required(),
            country:Joi.string().required(),
            image:Joi.string().allow(null,""),
        
    }).required()
});



const reviewSchema = Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        ratings:Joi.number().required().min(0).max(5),
    }).required(),
})

module.exports = {listingSchema,reviewSchema};