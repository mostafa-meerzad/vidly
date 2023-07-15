// this middleware acts like a factory function that returns an async route-handler
module.exports = function (handler) {
    return async (req, res, next) => {// this is going to replace the parent function when that is called
      try {
        // the handler itself includes asynchronous operations, thus return a promise and we are catching it here
        await handler(req, res);
      } catch (ex) {
        next(ex);
      }
    };
  }