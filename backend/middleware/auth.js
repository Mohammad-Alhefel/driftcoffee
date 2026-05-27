import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export const protect = (req, _res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('Not authenticated. Please login.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(new AppError('Invalid or expired token.', 401));
  }
};
