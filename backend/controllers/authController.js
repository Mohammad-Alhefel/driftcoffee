import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { AppError } from '../utils/AppError.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Email and password are required.', 400));
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return next(new AppError('Invalid email or password.', 401));
    }

    const token = signToken(admin._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    next(error);
  }
};

export const logout = (_req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

export const checkAuth = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    if (!admin) return next(new AppError('Admin not found.', 404));
    res.status(200).json({ success: true, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    next(error);
  }
};
