import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../services/user.service';

dotenv.config();

const userController = {
  signUp(req, res) {
    const user = req.body;
    if (user.firstName !== ' ' || user.lastName !== ' ' || user.password !== ' ') {
      userService.createUser(user);
      return jwt.sign({ user }, process.env.JWT_SECRET_KEY, (_err, token) => res.json({
        status: 200,
        token,
      }));
    }

    return res.json({
      status: 404,
      error: 'empty input fields',
    });
  },

  loginUser(req, res) {
    const user = req.body;
    if (user.email !== ' ' || user.password !== ' ') {
      const login = userService.loginUser(user);
      if (!login) {
        return res.json({
          status: 404,
          error: 'user does not exist or empty input fields',
        });
      }
      return jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => res.json({
        status: 200,
        token,
      }));
    }

    return res.json({
      status: 404,
      error: 'empty input fields',
    });
  },
};
export default userController;
