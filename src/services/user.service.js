import dummyData from '../utils/User.data';
import User from '../models/user.model';

const userService = {
  createUser(userData) {
    const newUser = new User(); // User entry should be modelled after the user models
    const allUser = dummyData.userData;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.email = userData.email;
    newUser.password = userData.password;

    const newUserEntry = {
      id: allUser.length + 1,
      firstName: newUser.firstName,
      email: newUser.email,
      lastName: newUser.lastName,
      password: newUser.password,


    };

    allUser.push(newUserEntry);
    return newUserEntry;
  },
  loginUser(userData) {
    /*
      Search through to find if user exist, return true
        */
    const allUser = dummyData.userData;
    // eslint-disable-next-line max-len
    const findUser = allUser.find(user => (user.email === userData.email && user.password === userData.password));
    if (findUser) return findUser;
    return false;
  },
};

export default userService;
