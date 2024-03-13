const sendResponse = (res, statuscode, status, operation, data) => {
  return res.status(statuscode).json({ status, operation, data: data });
}

export default sendResponse