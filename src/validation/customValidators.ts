import { body, param } from 'express-validator';
import UserRole from '../utils/Constants';
import { capitalize } from '../utils/helperFunctions';

const validateRequiredName = (validationParam: string, entityName: string) =>
  body(validationParam)
    .exists()
    .withMessage(`${entityName} is required`)
    .bail()
    .notEmpty()
    .withMessage(`${entityName} cannot be empty`)
    .bail()
    .trim()
    .isAlpha('en-US', { ignore: [' ', '2', '3', '7'] })
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

const validateFieldExistince = (validationParam: string) =>
  body(validationParam).if(
    body(validationParam)
      .exists()
      .withMessage(`${capitalize(validationParam)} is required`),
  );

const validateNumericRange = (
  validationParam: string,
  entityName: string,
  range: { minimum: number; maximum: number },
) =>
  body(validationParam)
    .if(body(validationParam).exists().withMessage(`${entityName} is required`))
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
    .isInt({
      min: range.minimum,
      max: range.maximum,
    })
    .withMessage(
      `${entityName} must be between ${range.minimum} and ${range.maximum}`,
    );

//  TODO:  Fix skip validation for optional fields (msx or min)
const validateDecimalRange = (
  validationParam: string,
  entityName: string,
  range: { minimum: number; maximum?: number },
) =>
  body(validationParam)
    .if(body(validationParam).exists().withMessage(`${entityName} is required`))
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
    .isFloat({
      min: range.minimum,
      max: range.maximum,
    })
    .withMessage(`${entityName} must be greater than ${range.minimum}`);

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

const validateEmail = () => body('email').notEmpty().isEmail();

const validatePassword = () => body('password').notEmpty();
const validateDate = (entityName: string) =>
  body('date')
    .if(body('date').exists().withMessage(`${entityName} date is required`))
    .notEmpty()
    .withMessage(`${entityName} date cannot be empty`)
    .bail();
// .isDate()
// .withMessage('donation date is invalid'),;
// TODO: Resume date validation

const validateRole = () =>
  body('role')
    .notEmpty()
    .custom((role) => {
      console.log(role);
      console.log(Object.keys(UserRole));
      return Object.keys(UserRole).indexOf(role) !== -1;
    })
    .withMessage('Invalid Role');

const validateId = (entityName: string, isUUID?: boolean) =>
  (isUUID
    ? param('id').isUUID().withMessage(`${entityName} Id must be a valid UUID`)
    : param('id')
        .isNumeric()
        .withMessage(`${entityName} Id must be a numeric value`));

const validateRelationalId = (entityName: string, isUUID?: boolean) =>
  (isUUID
    ? body(`${entityName}.id`)
        .exists()
        .withMessage(`${entityName} is required`)
        .bail()
        .notEmpty()
        .withMessage(`${entityName} cannot be empty`)
        .bail()
        .isUUID()
        .withMessage(`${entityName} Id must be a valid UUID`)
    : body(`${entityName}.id`)
        .exists()
        .withMessage(`${entityName} is required`)
        .bail()
        .notEmpty()
        .withMessage(`${entityName} cannot be empty`)
        .bail()
        .isNumeric()
        .withMessage(`${entityName} Id must be a numeric value`));

export {
  validateRequiredName,
  validateOptionalName,
  validateFieldExistince,
  validateNumericRange,
  validateDecimalRange,
  validateOneOf,
  validateOptionalString,
  validateId,
  validateRelationalId,
  validateEmail,
  validatePassword,
  validateDate,
  validateRole,
};
