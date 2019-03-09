"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("../services/messages.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagesController = {
  fetchAllUnreadMessage: function fetchAllUnreadMessage(req, res) {
    var allUnreadMessages = _messages.default.getallUnreadMessages();

    return res.json({
      status: 200,
      data: allUnreadMessages
    });
  },
  fetchAllMessages: function fetchAllMessages(req, res) {
    var allMessages = _messages.default.getAllReceivedMessages();

    return res.json({
      status: 200,
      data: allMessages
    });
  },
  fetchAllSentMessages: function fetchAllSentMessages(req, res) {
    var sentMessages = _messages.default.getAllSentMessages();

    return res.json({
      status: 200,
      data: sentMessages
    });
  },
  fetchSingleMessage: function fetchSingleMessage(req, res) {
    var id = Number(req.params.id);

    var found = _messages.default.getASingleMessage(id);

    if (!found) {
      return res.json({
        status: 401,
        error: 'Bad Request'
      });
    }

    return res.json({
      status: 200,
      data: found
    });
  },
  postMessages: function postMessages(req, res) {
    var messageBody = req.body;

    if (messageBody.subject === ' ' || messageBody.message === ' ' || messageBody.senderName === ' ') {
      return res.json({
        status: 404,
        error: 'empty input body'
      });
    }

    var newMessage = _messages.default.postMessages(req.body);

    return res.json({
      status: 200,
      data: newMessage
    });
  }
};
var _default = messagesController;
exports.default = _default;