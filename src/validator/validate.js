class Validate {
  static isValidEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    const testEmail = re.test(email.trim().toLowerCase());
    return testEmail;
  }

  static isValidPassword(password) {
    return password.trim().length > 5;
  }

  static isValidFirstName(firstName) {
    return firstName.trim().length > 1;
  }

  static isValidLastName(lastName) {
    return lastName.trim().length > 1;
  }
}

export default Validate;

