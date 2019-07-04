const ValidationError = require('../error/ValidationError.js');

class DTOValidator {

    isValidDTO(dto, properties = []) {
        const failures = properties.filter(property => !(property in dto));

        if (failures.length === 0) {
            const obj = {};

            properties.forEach(property => obj[property] = dto[property]);

            return obj;
        }

        throw new ValidationError(`The following properties were not found: ${failures.join(', ')}.`);
    }
}

module.exports = new DTOValidator();