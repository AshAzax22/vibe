const sendErrorResponse = (res, status, message) => {
  return res.status(status).send({ message });
};

module.exports = {
  sendErrorResponse,
};
