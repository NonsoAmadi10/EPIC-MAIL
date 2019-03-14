import contacts from './contact.data';

const messages = [
  {
    id: 1,
    createdOn: new Date().getTime,
    subject: 'BootCamp Invitation',
    message: 'Lorem Ipsum bshsgjshsjsghssksjs',
    senderId: contacts[0].id,
    parentMessageId: 1,
    status: 'unread',
  },
  {
    id: 2,
    createdOn: new Date().getTime,
    subject: 'BootCamp Invitation',
    message: 'Lorem Ipsum bshsgjshsjsghssksjs',
    receiverId: contacts[1].id,
    parentMessageId: 1,
    status: 'sent',
  },
  {
    id: 3,
    createdOn: new Date().getTime,
    subject: 'Piggy Bank',
    message: 'Save money here. follow this link to save more https:// piggybank.com to continue',
    receiverId: contacts[0].id,
    parentMessageId: 2,
    status: 'sent',
  },
  {
    id: 4,
    createdOn: new Date().getTime,
    subject: 'BootCamp Invitation',
    message: 'Lorem Ipsum bshsgjshsjsghssksjs',
    senderId: contacts[3].id,
    parentMessageId: 1,
    status: 'read',
  },
  {
    id: 5,
    createdOn: new Date().getTime,
    subject: 'BootCamp Invitation',
    message: 'Lorem Ipsum bshsgjshsjsghssksjs',
    receiverId: contacts[2].id,
    parentMessageId: 2,
    status: 'draft',
  },
  {
    id: 6,
    createdOn: new Date().getTime,
    subject: 'BootCamp Invitation',
    message: 'Lorem Ipsum bshsgjshsjsghssksjs',
    receiverId: contacts[2].id,
    parentMessageId: 1,
    status: 'unread',
  },
];
export default messages;
