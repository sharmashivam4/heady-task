class RestResponse {
  constructor (options) {
    options = options ? options : {
      httpStatus: null,
      success: null,
      error: {},
      result: {}
    };
    this.httpStatus = options.httpStatus;
    this.success = options.success;
    this.error = options.error;
    this.result = options.result;
  }
};
module.exports = RestResponse;
