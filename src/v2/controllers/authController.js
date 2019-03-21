/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import pool from '../../database/config/pooler';


class UserController {
  static async signup(req, res, next) {
    const {
      firstName, lastName, password, email,
    } = req.body;
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
      if (existingUser.rowCount) {
        console.log(existingUser.rowCount);
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
      const existingUser = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
      
      if (existingUser.rowCount <= 0) {
        return res.status(400).send({
          status: 'error',
          message: 'no user exist kindly register',
        });
      }
      const comparePassword = bcrypt.compareSync(password, existingUser.rows[0].password);
      if (!comparePassword) return res.status(400).send({ status: 'error', message: 'incorrect password' });

      req.id = existingUser.rows[0].id;
      req.email = existingUser.rows[0].email;
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }
}
export default UserController;
