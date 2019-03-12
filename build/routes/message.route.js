"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _messages = _interopRequireDefault(require("../controllers/messages.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/messages/unread', _messages.default.fetchAllUnreadMessage);
router.get('/messages', _messages.default.fetchAllMessages);
router.get('/messages/sent', _messages.default.fetchAllSentMessages);
router.get('/messages/:id', _messages.default.fetchSingleMessage);
router.post('/messages', _messages.default.postMessages);
router.delete('/messages/:id', _messages.default.deleteMessagesController);
var _default = router;
exports.default = _default;