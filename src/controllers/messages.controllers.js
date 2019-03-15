import messageServices from '../services/messages.service';

const messagesController = {
  fetchAllUnreadMessage(req, res) {
    const allUnreadMessages = messageServices.getallUnreadMessages();
    return res.json({
      status: 200,
      data: allUnreadMessages,
    });
  },
  fetchAllMessages(req, res) {
    const allMessages = messageServices.getAllReceivedMessages();
    return res.json({
      status: 200,
      data: allMessages,
    });
  },
  fetchAllSentMessages(req, res) {
    const sentMessages = messageServices.getAllSentMessages();
    return res.json({
      status: 200,
      data: sentMessages,
    });
  },
  fetchSingleMessage(req, res) {
    const id = Number(req.params.id);
    const found = messageServices.getASingleMessage(id);
    if (!found) {
      return res.json({
        status: 401,
        error: 'Bad Request',
      });
    }
    return res.json({
      status: 200,
      data: found,
    });
  },

  postMessages(req, res) {
    const messageBody = req.body;
    const newMessage = messageServices.postMessages(messageBody);
    return res.json({
      status: 201,
      data: newMessage,
    });
  },

  deleteMessagesController(req, res) {
    const id = Number(req.params.id);
    const deleteMessage = messageServices.deleteMessages(id);
    if (!deleteMessage) {
      res.json({
        status: 404,
        error: 'Invalid ID',
      });
    }
    return res.json({
      status: 204,
      message: 'message deleted',
    });
  },
};
export default messagesController;
