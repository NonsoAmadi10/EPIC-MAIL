"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../services/user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var userController = {
  signUp: function signUp(req, res) {
    var user = req.body;

    if (user.firstName !== ' ' || user.lastName !== ' ' || user.password !== ' ') {
      _user.default.createUser(user);

      return _jsonwebtoken.default.sign({
        user: user
      }, process.env.JWT_SECRET_KEY, function (_err, token) {
        return res.json({
          status: 200,
          token: token
        });
      });
    }

    return res.json({
      status: 404,
      error: 'empty input fields'
    });
  },
  loginUser: function loginUser(req, res) {
    var user = req.body;

    if (user.email !== ' ' || user.password !== ' ') {
      var login = _user.default.loginUser(user);

      if (!login) {
        return res.json({
          status: 404,
          error: 'user does not exist or empty input fields'
        });
      }

      return _jsonwebtoken.default.sign({
        user: user
      }, process.env.JWT_SECRET_KEY, function (err, token) {
        return res.json({
          status: 200,
          token: token
        });
      });
    }
  }
};
var _default = userController;
exports.default = _default;