import pool from '../../database/config/pooler';

class MessageContoller {
  static async postMessages(req, res) {
    const decUser = req.user;
    const senderid = decUser.id;


    const {
      subject, message, email,
    } = req.body;

    const createdon = new Date();
    try {
      const receiver = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
      console.log(receiver);
      if (receiver.rows.length > 0) {
        const { id } = receiver.rows[0];

        const createMsg = await pool.query('INSERT INTO messages(subject, createdon, senderId, message)VALUES($1, $2, $3, $4) RETURNING *;', [subject, createdon, senderid, message]);
        const result = createMsg.rows[0];
        const msg = await pool.query('INSERT INTO usermessages(receiverId, messageId, read)VALUES($1, $2, $3) RETURNING * ;', [id, result.id, false]);

        return res.status(201).send({ status: 'success', message: 'message sent', data: createMsg.rows[0] });
      }

      return res.status(401).send({ status: 'error', message: 'no user exist with that email' });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', error });
    }
  }

  static async getAllreceived(req, res) {
    const decUser = req.user;
    const senderid = decUser.id;

    try {
      const getallReceived = await pool.query('SELECT * FROM messages LEFT JOIN usermessages ON  receiverId=$1 ORDER BY createdon DESC;', [senderid]);
      return res.status(200).send({ status: 'success', data: getallReceived.rows });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }

  static async getAllUnreadMessages(req, res) {
    const decUser = req.user;
    const senderid = decUser.id;
    try {
      const getallReceived = await pool.query('SELECT * FROM messages LEFT JOIN usermessages ON  receiverId=$1 AND read=$2 ORDER BY createdon DESC;', [senderid, false]);
      return res.status(200).send({ status: 'success', data: getallReceived.rows });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }

  static async getASpecificMessage(req, res) {
    const messageId = req.params.id;
    const decUser = req.user;
    const senderid = decUser.id;
    try {
      const getaSpecific = await pool.query('SELECT * FROM messages WHERE id=$1 AND senderId=$2 ;', [messageId, senderid]);
      return res.status(200).send({ status: 'success', data: getaSpecific.rows[0] });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }

  static async getSentMessage(req, res) {

    const decUser = req.user;
    const senderid = decUser.id;
    try {
      const getsentMessages = await pool.query('SELECT * FROM messages WHERE senderId=$1;', [senderid]);

      return res.status(200).send({ status: 'success', data: getsentMessages.rows });
    } catch (error) {
      return res.status(400).send({ status: 'error', error: {} });
    }
  }

 /* static async deleteMessages(req, res) {
    const decUser = req.user;
    const senderid = decUser.id;
    const { id } = req.params;
     try{
       const getMessage = await pool.query('SELECT * FROM usermessages WHERE messageId=$1', [id]);
       console.log(getMessage.rows[0]);from usermessages WHERE messageId=$1
       if(getMessage.rows.length === 0){
         return res.status(400).send({status: 'error', error: 'message does not exist'});
       }
       const deleteMessage = await pool.query('DELETE from messages WHERE  ;', [getMessage.rows[0].id]);
     return res.status(204).send({status: 'success'}); 
  } catch (error) {
    console.log(error);
    return res.status(409).send({status: 'error', error: 'error deleting database'});
  }
} 
*/
}

export default MessageContoller;
