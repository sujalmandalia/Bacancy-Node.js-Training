import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'jwtsecret', (err, decode) => {
    if (err) {
      res.status(401).json({
        err,
        msg: 'Forbidden Access',
      });
    } else {
      req.user = decode;
      next();
    }
  });
};
export default authMiddleware;
