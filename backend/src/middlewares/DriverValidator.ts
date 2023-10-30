import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator/src/middlewares/validation-chain-builders';
import { validationResult } from 'express-validator/src/validation-result';

const validateDReg = [
  check('nik').isLength({ min: 12 }),
  check('nama').isString(),
  check('telp').isString(),
  check('password').isLength({ min: 6 }),
  check('alamat').isString(),
  check('kota').isString(),
  check('gender').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    return next();
  },
];

export default validateDReg;
