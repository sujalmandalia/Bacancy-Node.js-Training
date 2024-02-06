const adminMiddleware = (req, res, next) => {
  const { role } = req.headers;
  if (role === 'admin') {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized Access' });
  }
};

export default adminMiddleware;
