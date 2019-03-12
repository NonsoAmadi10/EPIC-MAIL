"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Message = _interopRequireDefault(require("../utils/Message.data"));

var _contact = _interopRequireDefault(require("../utils/contact.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
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
    var newMessage = {
      id: _Message.default.length + 1,
      subject: messageBody.subject,
      message: messageBody.message,
      createdOn: new Date(),
      parentMessageId: 1,
      status: 'sent'
    };

    _Message.default.push(newMessage);

    return newMessage;
  },
  deleteMessages: function deleteMessages(id) {
    var messageID = _Message.default.find(function (item) {
      return item.id === id;
    });

    var deleteIndex = _Message.default.indexOf(messageID);

    if (deleteIndex == -1) return false;

    var removeIndex = _Message.default.splice(deleteIndex, 1);

    return removeIndex;
  }
};
var _default = messageServices;
exports.default = _default;