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
  /* 
  Data will be in the format {
   subject,
   message,
   senderName : "lorem lorem"
  } */

  const senderName = messageBody.senderName.split(' ')
  const findContact = contacts.find(user => user.firstName === senderName[0] && user.lastName === senderName[1]);
  if (!findContact) {
    const newMessage = {
      id: messages.length + 1,
      subject: messageBody.subject,
      createdOn: new Date(),
      message: messageBody.message,
      receiverId: contacts.length + 1,
      parentMessageId: 1,
      status: 'sent',
    };
    messages.push(newMessage);
    return newMessage;
  }

  const newMessages = {
    id: messages.length + 1,
    subject: messageBody.subject,
    createdOn: new Date(),
    message: messageBody.message,
    receiverId: findContact.id,
    parentMessageId: messages.length + 1,
    status: 'sent',
  }

  messages.push(newMessages);
  return newMessages;
  }
};

export default messageServices;
