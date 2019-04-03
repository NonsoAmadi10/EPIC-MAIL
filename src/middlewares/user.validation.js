import Validator from '../validator/validate';

class authUser {
  static signup(req, res, next) {
    const {
      firstName,
      lastName,
      password,
      email,
    } = req.body;
    


    const response = error => res.status(400).send({ status: 400, error });
    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(lastName)) return response('lastname cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (Validator.checkEmpty(firstName)) return response('firstname cannot be empty');
    if (Validator.isWhiteSpace(firstName)) return response('firstname cannot contain spaces');
    if (Validator.isWhiteSpace(lastName)) return response('lastname cannot contain spaces');
    if (Validator.isMultipleSpace(password)) return response('password cannot contain multiple spaces');
    if (!Validator.isValidEmail(email)) return response('invalid email');
    if (!Validator.isValidParamsLength(firstName, 1)) return response('firstname must be atleast two characters long');
    if (!Validator.isValidParamsLength(lastName, 1)) return response('lastname must be atleast two characters long');
    if (!Validator.isValidParamsLength(password, 5)) return response('password must be greater than five letters');
    if (Validator.isNotNumber(firstName)) return response('firstname cannot  contain number');
    if (Validator.isNotNumber(lastName)) return response('lastname cannot contain numbers');



    req.firstName = firstName.trim();
    req.lastName = lastName.trim();
    req.email = email.trim();
    req.password = password.trim();
    return next();
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    const response = error => res.json({ status: 400, error });
    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (!Validator.isValidEmail(email)) return response('invalid email');
    if (!Validator.isValidParamsLength(password, 5)) return response('password must be greater than five letters');

    return next();
  }
}

export default authUser;
