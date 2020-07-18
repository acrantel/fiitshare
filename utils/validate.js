// Ensure that someone didn't send a penguin when we expected an integer

// NOTE: an empty string is considered not a string
export function isString (value) {
    return typeof value === 'string' && value !== '';
}

// This isn't necessary but I think it helps to make the code more clear, maybe.
export const isId = isString;

export function isUrl (value) {
    return isString(value); // TODO: url validation?
}

const levels = ['Beginner', 'Intermediate', 'Advanced'];
export function isLevel (value) {
    return levels.includes(value);
}

export function arrayOf (validator) {
    // Time to code like a ninja! (For better error output lol)
    const name = `${validator.name}[]`;
    return {
        [name] (value) {
            return Array.isArray(value) && value.every(validator)
        }
    }[name];
}

// NOTE: The number predicates assume non-negative.
export function isNumber (value) {
    return Number.isFinite(value) && value >= 0;
}

export function isInt (value) {
    return Number.isInteger(value) && value >= 0;
}

export const isMillis = isInt;

const intensities = [1, 2, 3, 4, 5];
export function isIntensity (value) {
    return intensities.includes(value);
}

export function isBoolean (value) {
    return typeof value === 'boolean';
}

export function whatever () {
    return true;
}

export function optional (validator) {
    const name = `${validator.name} (optional)`;
    return {
        [name] (value) {
            return value === undefined || validator(value);
        }
    }[name];
}

// This is an angry higher-order function: it throws errors instead of returning
// false.
export function validate (validatorObj, { partial = false } = {}) {
    const entries = Object.entries(validatorObj);
    
    return function isObject (value) {
        if (typeof value !== 'object') {
            throw new TypeError('Value is not an object.');
        }
        
        // Each entry in value must be valid
        for (const [key, validator] of entries) {
            // If partial mode is enabled, then skip omitted keys.
            if (partial && !value.hasOwnProperty(key)) continue;
            
            try {
                if (!validator(value[key])) {
                    throw new TypeError(`Property \`${key}\` does not satisfy \`${validator.name}\`.`);
                }
            } catch (err) {
                if (validator && validator.name === 'isObject') {
                    throw new TypeError(`In property \`${key}\`: ${err.message}`);
                } else {
                    throw err;
                }
            }
        }
        
        // No extra keys allowed
        for (const key of Object.keys(value)) {
            if (!validatorObj.hasOwnProperty(key)) {
                throw new TypeError(`Value has extra property ${key}.`)
            }
        }
        
        return true;
    };
}
