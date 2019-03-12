"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Message = _interopRequireDefault(require("../utils/Message.data"));

var _contact = _interopRequireDefault(require("../utils/contact.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageServices = {
  getallUnreadMessages: function getallUnreadMessages() {
    var unreadMessages = _Message.default.filter(function (message) {
      return message.status === 'unread';
    });

    return unreadMessages;
  },
  getAllReceivedMessages: function getAllReceivedMessages() {
    var allMessages = _Message.default.filter(function (message) {
      return message.status !== 'sent' && message.status !== 'draft';
    });

    return allMessages;
  },
  getAllSentMessages: function getAllSentMessages() {
    var sentMessages = _Message.default.filter(function (message) {
      return message.status === 'sent';
    });

    return sentMessages;
  },
  getASingleMessage: function getASingleMessage(id) {
    var foundMessage = _Message.default.find(function (message) {
      return message.id === id;
    });

    if (!foundMessage) return false;
    return foundMessage;
  },
  postMessages: function postMessages(messageBody) {
    /* 
    Data will be in the format {
     subject,
     message,
     senderName : "lorem lorem"
    } */
    var senderName = messageBody.senderName.split(' ');

    var findContact = _contact.default.find(function (user) {
      return user.firstName === senderName[0] && user.lastName === senderName[1];
    });

    if (!findContact) {
      var newMessage = {
        id: _Message.default.length + 1,
        subject: messageBody.subject,
        createdOn: new Date(),
        message: messageBody.message,
        receiverId: _contact.default.length + 1,
        parentMessageId: 1,
        status: 'sent'
      };

      _Message.default.push(newMessage);

      return newMessage;
    }

    var newMessages = {
      id: _Message.default.length + 1,
      subject: messageBody.subject,
      createdOn: new Date(),
      message: messageBody.message,
      receiverId: findContact.id,
      parentMessageId: _Message.default.length + 1,
      status: 'sent'
    };

    _Message.default.push(newMessages);

    return newMessages;
  }
};
var _default = messageServices;
exports.default = _default;