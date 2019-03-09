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
};
export default messagesController;
