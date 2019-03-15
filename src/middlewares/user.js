import Validator from '../validator/validate';

class authUser {
  static signup(req, res, next) {
    const {
      firstName,
      lastName,
      password,
      email,
    } = req.body;
    if (firstName === ' ' || email === ' ' || password === ' ' || lastName === ' ') {
      return res.json({
        status: 400,
        error: 'empty input fields',
      });
    }

    const response = error => res.json({ status: 400, error });
    if (!Validator.isValidEmail(email)) return response('invalid email');
    if (!Validator.isValidFirstName(firstName)) return response('firstname must be atleast two characters long');
    if (!Validator.isValidLastName(lastName)) return response('lastname must be atleast two characters long');
    if (!Validator.isValidPassword(password)) return response('password must be greater than five letters');
    req.firstName = firstName.trim();
    req.lastName = lastName.trim();
    req.email = email.trim();
    req.password = password.trim();
    return next();
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    if (email === ' ' || password === ' ') {
      return res.json({
        status: 400,
        error: 'empty input fields',
      });
    }
    return next();
  }
}

export default authUser;
