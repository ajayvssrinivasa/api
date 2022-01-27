const { body,check,validationResult } = require('express-validator');
exports.validateUser = [
    check('username')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
      check('firstname', 'firstName length should be 4 characters')
.isLength({ min: 5}),
check('lastname', 'lastName length should be 2 characters')
.isLength({ min: 5}),
check('empid', 'empid length should be 3 characters')
.isLength({ min: 3}),
body('password').isLength({min: 6}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];