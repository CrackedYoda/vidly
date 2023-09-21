function validate(item) {

    const genrenameschema = Joi.object({  // TO use joi validation you first create the validation schema 
        genre: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
    })

    return genrenameschema.validate(item);

}

exports.validate = validate;