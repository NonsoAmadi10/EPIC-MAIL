import messages from '../utils/Message.data';

const messageServices = {

  getallUnreadMessages() {
    const unreadMessages = messages.filter(message => message.status === 'unread');
    return unreadMessages;
  },
  getAllReceivedMessages() {
    const allMessages = messages.filter(message => message.status !== 'sent' && message.status !== 'draft');
    return allMessages;
  },
  getAllSentMessages() {
    const sentMessages = messages.filter(message => message.status === 'sent');
    return sentMessages;
  },
  getASingleMessage(id) {
    const foundMessage = messages.find(message => message.id === id);
    if (!foundMessage) return false;
    return foundMessage;
  },
};

export default messageServices;
