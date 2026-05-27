import * as bookingService from '../services/bookingService.js';
import { AppError } from '../utils/AppError.js';
import { validateBookingInput, validateStatusUpdate } from '../validations/bookingValidation.js';

export const createBooking = async (req, res, next) => {
  try {
    const errors = validateBookingInput(req.body);
    if (errors.length > 0) {
      return next(new AppError(errors.join('; '), 400));
    }

    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const result = await bookingService.getAllBookings(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return next(new AppError('Booking not found.', 404));
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const error = validateStatusUpdate(status);
    if (error) return next(new AppError(error, 400));

    const booking = await bookingService.updateBookingStatus(req.params.id, status);
    if (!booking) return next(new AppError('Booking not found.', 404));
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.deleteBooking(req.params.id);
    if (!booking) return next(new AppError('Booking not found.', 404));
    res.status(200).json({ success: true, message: 'Booking deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await bookingService.getDashboardStats();
    res.status(200).json({ success: true, ...stats });
  } catch (error) {
    next(error);
  }
};
