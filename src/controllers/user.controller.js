import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../services/user.service';

dotenv.config();

const userController = {
  signUp(req, res) {
    const user = req.body;
    userService.createUser(user);
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, (_err, token) => res.json({
      status: 201,
      token,
    }));
  },

  loginUser(req, res) {
    const user = req.body;
    const login = userService.loginUser(user);
    if (!login) {
      return res.json({
        status: 404,
        error: 'user does not exist',
      });
    }
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => res.json({
      status: 200,
      token,
    }));
  },

};
export default userController;
