/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import pool from '../../database/Table';


class UserController {
  static async signup(req, res, next) {
    const {
      firstName, lastName, password, email,
    } = req.body;
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email=$1; ', [email]);
      if (existingUser.rowCount > 0) {
        console.log(existingUser);
        res.status(500).send({
          status: 'error',
          message: 'email already exist',
        });
      }
      const newPassword = bcrypt.hashSync(password, 10);

      await pool.query('INSERT INTO users (firstname, lastname, password, email) VALUES ($1, $2, $3, $4);', [firstName, lastName, newPassword, email]);
      return next();
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  }

  static async login(req, res, next) {
    const {
      password, email,
    } = req.body;

    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email=$1;', [email]).rowCount;
      if (!existingUser) {
        return res.status(400).send({
          status: 'error',
          message: 'no user exist kindly register',
        });
      }
      const userDetails = await pool.query('SELECT * FROM users WHERE email=$1;'[email]).rows[0];
      const comparePassword = bcrypt.compareSync(password, userDetails.password);
      if (!comparePassword) return res.status(400).send({ status: 'error', message: 'incorrect password' });

      req.password = userDetails.password;
      req.email = userDetails.email;
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }
}

export default UserController;
