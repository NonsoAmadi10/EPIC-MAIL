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
};

export default messageServices;
