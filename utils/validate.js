// Ensure that someone didn't send a penguin when we expected an integer

export function isString (value) {
    return typeof value === 'string';
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

export function isArrayOf (validator, value) {
    return Array.isArray(value) && value.every(validator);
}

export function isNumber (value) {
    return Number.isFinite(value);
}

export function isInt (value) {
    return Number.isInteger(value);
}

export const isMillis = isInt;

const intensities = [1, 2, 3, 4, 5];
export function isIntensity (value) {
    return intensities.includes(value);
}

export function isBoolean (value) {
    return typeof value === 'boolean';
}

export function validate (validatorObj) {
    const entries = Object.entries(validatorObj);
    
    return value => {
        if (typeof value !== 'object') return false;
        
        for (const [key, validator] in entries) {
            validator(value[key])
        }
    };
}
