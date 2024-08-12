import {check} from "express-validator"

export const RegisterSchemaValidation = [
  check('email','email is required')
    .exists()
    .isEmail(),

  check('username','username is required')
    .exists()
    .withMessage('username should be alphanumeric character only')
    .trim()
    .isLength({min:6,max:13}),

  check('password','password is required')
    .exists()
    .isLength({min:6,max:100})
    .trim(),

    
]
export const loginSchemaValidation = [
    check("email", "correct email is required")
      .exists()
      .trim(),
  
    check("password", "correct password is required")
      .exists()
      .isLength({ min: 6, max: 15 })
      .trim(),
  
  ];