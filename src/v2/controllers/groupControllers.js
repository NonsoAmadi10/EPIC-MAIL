import pool from '../../database/config/pooler';

class GroupController {
  static async createGroup(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;

    const { name } = req.body;
    const createdon = new Date();

    try {
      const existingGroup = await pool.query('SELECT * FROM groups WHERE name=$1;', [name]);

      if (existingGroup.rows.length > 0) {
        return res.status(400).send({ status: 'error', error: 'group name is exist' });
      }

      const addGroup = await pool.query('INSERT INTO groups(name, ownerId, createdon)VALUES($1, $2, $3) RETURNING * ;', [name, ownerid, createdon]);
      console.log(addGroup);
      return res.status(201).send({ status: 'success', data: addGroup.rows[0] });
    } catch (error) {
      return res.status(400).send({ status: 'error', error: 'error creating groups' });
    }
  }

  static async getAllGroups(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;

    try {
      const getMyGroup = await pool.query('SELECT * FROM groups WHERE ownerId=$1;', [ownerid]);
      if (getMyGroup.rows.length === 0) {
        return res.status(400).send({ status: 'error', error: 'You have not created a group' });
      }

      return res.status(200).send({ status: 'success', data: getMyGroup.rows });
    } catch (error) {
      return res.status(400).send({ status: error, error: 'error getting groups' });
    }
  }

  static async updateAllGroups(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;
    const { name } = req.body;
    const { id } = req.params;

    try {
      const groupExist = await pool.query('SELECT * FROM groups WHERE id=$1;', [id]);
      if (groupExist.rows.length === 0) {
        return res.status(400).send({ status: 'error', error: 'group does not exist' });
      }
      const updateGroup = await pool.query('UPDATE groups SET name=$1 WHERE id=$2 AND ownerId=$3  RETURNING * ;', [name, id, ownerid]);
      return res.status(200).send({ status: 'success', data: updateGroup.rows[0] });
    } catch (error) {
      return res.status(500).send({ status: 'error', error: 'error updating groups' });
    }
  }

  static async deleteAGroup(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;
    const { id } = req.params;
    try {
      const groupExist = await pool.query('SELECT * FROM groups WHERE id=$1;', [id]);
      if (groupExist.rows.length === 0) {
        return res.status(400).send({ status: 'error', error: 'group does not exist' });
      }
      const deleteGroup = await pool.query('DELETE from groups WHERE id=$1;', [id]);
      return res.status(204).send({ status: 'success', message: 'group successfully deleted' });
    } catch (error) {
      return res.status(500).send({ status: 'error', error: 'error deleting' });
    }
  }

  static async addUsertoGroup(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;
    const { id } = req.params;
    const member = req.body.email;

    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email=$1;', [member]);
      if (existingUser.rows.length === 0) {
        return res.status(400).send({ status: 'error', error: 'The email entered is not a valid epic mail user' });
      }
      const getgroupId = await pool.query('SELECT * FROM groups WHERE id=$1 AND ownerId=$2;', [id, ownerid]);
      const checkIfuserIngroup = await pool.query('SELECT * FROM usergroup WHERE members=$1;', [existingUser.rows[0].id]);
      if (checkIfuserIngroup.rows.length > 0) {
        res.status(409).send({ status: 'error', error: ' User already exists!' });
      }
      const addUser = await pool.query('INSERT INTO usergroup(groudId, members)VALUES($1, $2) RETURNING * ;', [getgroupId.rows[0].id, existingUser.rows[0].id]);
      return res.status(201).send({ status: 'success', data: addUser.rows[0] });
    } catch (error) {
      console.log(error);
      res.status(409).send({ status: 'error', error: 'error adding user' });
    }
  }

  static async deleteUserInGroup(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;
    const { id } = req.params;
    const member = req.body.email;
    try {
      const memberId = await pool.query('SELECT * FROM users WHERE email=$1;', [member]);
      const groupExist = await pool.query('SELECT * FROM groups WHERE id=$1 AND ownerId=$2;', [id, ownerid]);
      if (groupExist.rows.length === 0) {
        res.status(400).send({ status: 'error', error: 'group does not exist' });
      }
      const checkUserInGroup = await pool.query('SELECT * FROM usergroup WHERE members=$1;', [memberId.rows[0].id]);
      if (checkUserInGroup.rows.length === 0) {
        res.status(409).send({ status: 'error', error: 'User is not part of this group' });
      }

      const deleteUser = await pool.query('DELETE FROM usergroup WHERE members=$1 AND groudId=$2 ;', [memberId.rows[0].id, groupExist.rows[0].id]);
      res.status(204).send({ status: 'success', message: 'user successfully deleted' });
    } catch (error) {
      
      res.status(409).send({ status: 'error', error: 'error deleting user' });
    }
  }
 /* static async sendGroupMessage(req, res) {
    const decUser = req.user;
    const ownerid = decUser.id;
    const { id } = req.params;
    const groupExist = await pool.query('SELECT * FROM group WHERE id=$1 and ownerId=$2;', [id, ownerid]);
    if (groupExist.rows.length === 0) {
      res.status(400).send({ status: 'error', error: 'group does not exist' });
    }

  }
  */
}

export default GroupController;
