import { body, param } from 'express-validator';

const validateRequiredName = (validationParam: string, entityName: string) =>
  body(validationParam)
    .exists()
    .withMessage(`${entityName} is required`)
    .bail()
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage(`${entityName} must be alphabetic`)
    .bail()
    .isLength({ min: 3 })
    .withMessage(`${entityName} must be at least 3 characters long`);

const validateOptionalName = (validationParam: string, entityName: string) =>
  body(validationParam)
    .if(body(validationParam).exists().withMessage(`${entityName} is required`))
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage(`${entityName} must be alphabetic`)
    .bail()
    .isLength({ min: 3 })
    .withMessage(`${entityName} must be at least 3 characters long`);

const validateAge = (validationParam: string, entityName: string) =>
  body(validationParam)
    .if(body('age').exists().withMessage(`${entityName} is required`))
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .not()
    .isString()
    .withMessage(`${entityName} must not be a string`)
    .bail()
    .isNumeric()
    .withMessage(`${entityName} must be numeric`)
    .bail()
    .isInt({ min: 7, max: 120 })
    .withMessage(`${entityName} must be between 7 and 120`);

const validateOneOf = (
  validationParam: string,
  entityName: string,
  options: string[],
) =>
  body(validationParam)
    .if(body(validationParam).exists().withMessage(`${entityName} is required`))
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .trim()
    .isIn(options)
    .withMessage(`${entityName} must be within ${options.toString()}`);

const validateOptionalString = (validationParam: string, entityName: string) =>
  body(validationParam)
    .exists()
    .withMessage(`${entityName} is required`)
    .bail()
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9\s,/\\]+$/)
    .withMessage('Address contains invalid characters')
    .bail()
    .isLength({ min: 3 })
    .withMessage(`${entityName} must be at least 3 characters long`);
const validateId = (entityName: string, isUUID?: boolean) =>
  (isUUID
    ? param('id').isUUID().withMessage(`${entityName} must be a valid UUID`)
    : param('id')
        .isNumeric()
        .withMessage(`${entityName} must be a numeric value`));

export {
  validateRequiredName,
  validateOptionalName,
  validateAge,
  validateOneOf,
  validateOptionalString,
  validateId,
};
