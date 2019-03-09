"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../utils/User.data"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userService = {
  createUser: function createUser(userData) {
    var newUser = new _user.default(); // User entry should be modelled after the user models

    var allUser = _User.default.userData;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.password = userData.password;
    var newUserEntry = {
      id: allUser.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: newUser.password
    };
    allUser.push(newUserEntry);
    return newUserEntry;
  },
  loginUser: function loginUser(userData) {
    /*
      Search through to find if user exist, return true
        */
    var allUser = _User.default.userData; // eslint-disable-next-line max-len

    var findUser = allUser.find(function (user) {
      return user.email === userData.email && user.password === userData.password;
    });
    return findUser;
  }
};
var _default = userService;
exports.default = _default;