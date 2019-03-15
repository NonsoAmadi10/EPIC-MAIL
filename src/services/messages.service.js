/* eslint-disable max-len */
import messages from '../utils/Message.data';
import contacts from '../utils/contact.data';

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
  postMessages(messageBody) {
    const newMessage = {
      id: messages.length + 1,
      subject: messageBody.subject,
      message: messageBody.message,
      createdOn: new Date(),
      parentMessageId: 1,
      status: 'sent',
    };

    messages.push(newMessage);
    return newMessage;
  },
  deleteMessages(id) {
    const messageID = messages.find(item => item.id === id);
    const deleteIndex = messages.indexOf(messageID);
    if (deleteIndex == -1) return false;
    const removeIndex = messages.splice(deleteIndex, 1);
    return removeIndex;
  },
};

export default messageServices;
