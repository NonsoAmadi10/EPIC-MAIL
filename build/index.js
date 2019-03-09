"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _message = _interopRequireDefault(require("./routes/message.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 4000;
app.use(_express.default.json());
app.use('/api/v1', _user.default);
app.use('/api/v1/', _message.default);
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to epic mail'
  });
});
app.listen(port, console.log('App is running'));
var _default = app;
exports.default = _default;