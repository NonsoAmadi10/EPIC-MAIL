class Validate {
  static isValidEmail(email) {
    const re = /^[\w]+@epic.com$/;
    const testEmail = email.trim().toLowerCase();
    return re.test(testEmail);
  }

  static isValidParamsLength(param, length) {
    return param.trim().length > length;
  }

 

  static isNotNumber(name) {
    const re = /[0-9]/g;
    const testName = re.test(name.trim().toLowerCase());
    return testName;
  }

  static checkEmpty(input) {
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

  static isWhiteSpace(input) {
    const regex = /\s/g;
    const testBody = regex.test(input);
    return testBody;
  }

  static isMultipleSpace(input) {
    const regex = /\w[ ]{2,}\w/g;
    const testBody = regex.test(input);
    return testBody;
  }

  static isValidParams(input){
    return isNaN(input);
  }
}

export default Validate;
