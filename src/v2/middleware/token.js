import jwt from 'jsonwebtoken';


class Token {
  static generateTokenSignup(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const token = jwt.sign({
      firstName, lastName, email, password,
    }, process.env.JWT_SECRET_KEY);


    return res.status(201).send({
      status: 'success',
      token,
    });
  }

  static generateTokenLogin(req, res) {
    const {
      email, password,
    } = req.body;
    const token = jwt.sign({
      email, password,
    }, process.env.JWT_SECRET_KEY);


    return res.status(200).send({
      status: 'success',
      token,
    });
  }
}
export default Token;
