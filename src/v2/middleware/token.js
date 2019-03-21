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
      id, email,
    } = req;
    const token = jwt.sign({
      id, email,
    }, process.env.JWT_SECRET_KEY);


    return res.status(200).send({
      status: 'success',
      token,
    });
  }

  static async authorize(req, res, next) {
    
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(400).send({ status: 'error', message: 'you must be logged in to access this route' });

      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', message: 'unauthorized failed' });
    }

  }
}
export default Token;
