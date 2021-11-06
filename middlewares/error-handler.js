const { CustomAPIError } = require("../errors/custom-errors");

module.exports.errHandler = (err, req, res, next) => {
   if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).send(err.message);
   }
   return res.status(500).json(err);
};
