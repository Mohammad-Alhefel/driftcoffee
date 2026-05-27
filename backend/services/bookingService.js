import { Booking } from '../models/Booking.js';

export const getAllBookings = async ({ search, country, status, startDate, endDate, page, limit }) => {
  const query = {};

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  if (country) query.eventCountry = country;
  if (status) query.status = status;

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [bookings, total] = await Promise.all([
    Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Booking.countDocuments(query),
  ]);

  return {
    bookings,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

export const getBookingById = async (id) => {
  return Booking.findById(id);
};

export const createBooking = async (data) => {
  return Booking.create(data);
};

export const updateBookingStatus = async (id, status) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
};

export const deleteBooking = async (id) => {
  return Booking.findByIdAndDelete(id);
};

export const getDashboardStats = async () => {
  const [total, byCountry, byStatus, byDate, byCity] = await Promise.all([
    Booking.countDocuments(),
    Booking.aggregate([{ $group: { _id: '$eventCountry', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Booking.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]),
    Booking.aggregate([
      { $group: { _id: { country: '$eventCountry', city: '$city' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 },
    ]),
  ]);

  return { total, byCountry, byStatus, byDate, byCity };
};
