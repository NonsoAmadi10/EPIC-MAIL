import jwt from 'jsonwebtoken';
import userService from '../services/user.service';

const userController = {
  signUp(req, res) {
    const user = req.body;
    if (user.firstName !== ' ' || user.lastName !== ' ' || user.password !== ' ') {
      userService.createUser(user);
      return jwt.sign({ user }, 'shshshshs', (_err, token) => res.json({
        status: 200,
        token,
      }));
    }

    return res.json({
      status: 404,
      message: 'empty input fields',
    });
  },

  loginUser(req, res) {
    const user = req.body;
    if (user.email !== ' ' || user.password !== ' ') {
      const login = userService.loginUser(user);
      if (!login) {
        return res.json({
          status: 404,
          message: 'user does not exist. kindly log in',
        });
      }
      return jwt.sign({ user }, 'shshshshs', (err, token) => res.json({
        status: 200,
        token,
      }));
    }

    return res.json({
      status: 404,
      message: 'empty input fields',
    });
  },
};
export default userController;
