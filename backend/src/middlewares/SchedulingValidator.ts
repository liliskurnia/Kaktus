import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator/src/middlewares/validation-chain-builders';
import { validationResult } from 'express-validator/src/validation-result';

const validateSchedule = [
  check('tpsCode').isString(),
  check('operatorCode').isString(),
  check('driverCode').isString(),
  check('trashCode').isString(),
  check('scheduledDate').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    return next();
  },
];

export default validateSchedule;
