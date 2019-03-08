import messageServices from '../services/messages.service';

const messagesController = {
  fetchAllUnreadMessage(req, res) {
    const allUnreadMessages = messageServices.getallUnreadMessages();
    return res.json({
      status: 200,
      data: allUnreadMessages,
    });
  },
};
export default messagesController;
