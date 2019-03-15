class messageAuth {
  static checkEmptyBody(req, res, next) {
    const { subject, message } = req.body;
    const missingFields = [subject, message].map((field, index) => {
      const keys = {
        0: 'subject',
        1: 'message',
      };
      return field === undefined ? keys[index] : null;
    }).filter(field => field !== null).join(', ');

    if (!subject || !message) {
      return res.json({
        status: 400,
        message: 'empty input fields',
      });
    }

    return next();
  }
}
export default messageAuth;

