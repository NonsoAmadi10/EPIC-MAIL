"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = [{
  id: 1,
  createdOn: new Date().getTime,
  subject: 'BootCamp Invitation',
  message: 'Lorem Ipsum bshsgjshsjsghssksjs',
  senderId: _contact.default[0].id,
  parentMessageId: 1,
  status: 'unread'
}, {
  id: 2,
  createdOn: new Date().getTime,
  subject: 'BootCamp Invitation',
  message: 'Lorem Ipsum bshsgjshsjsghssksjs',
  receiverId: _contact.default[1].id,
  parentMessageId: 1,
  status: 'sent'
}, {
  id: 3,
  createdOn: new Date().getTime,
  subject: 'Piggy Bank',
  message: 'Save money here. follow this link to save more https:// piggybank.com to continue',
  receiverId: _contact.default[0].id,
  parentMessageId: 2,
  status: 'sent'
}, {
  id: 4,
  createdOn: new Date().getTime,
  subject: 'BootCamp Invitation',
  message: 'Lorem Ipsum bshsgjshsjsghssksjs',
  senderId: _contact.default[3].id,
  parentMessageId: 1,
  status: 'read'
}, {
  id: 5,
  createdOn: new Date().getTime,
  subject: 'BootCamp Invitation',
  message: 'Lorem Ipsum bshsgjshsjsghssksjs',
  receiverId: _contact.default[2].id,
  parentMessageId: 2,
  status: 'draft'
}, {
  id: 6,
  createdOn: new Date().getTime,
  subject: 'BootCamp Invitation',
  message: 'Lorem Ipsum bshsgjshsjsghssksjs',
  receiverId: _contact.default[2].id,
  parentMessageId: 1,
  status: 'unread'
}];
var _default = messages;
exports.default = _default;