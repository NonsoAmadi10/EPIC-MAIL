import messages from '../utils/Message.data';

const messageServices = {

  getallUnreadMessages() {
    const unreadMessages = messages.map(message => message.status === 'unread');
    return unreadMessages || {};
  },
};

export default messageServices;
