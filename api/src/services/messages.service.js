import messages from '../utils/Message.data';

const messageServices = {

  getallUnreadMessages() {
    const unreadMessages = messages.filter(message => message.status === 'unread');
    return unreadMessages;
  },
  getAllMessages() {
    const allMessages = messages;
    return allMessages;
  },
};

export default messageServices;
