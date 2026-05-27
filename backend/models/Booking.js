import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    eventCountry: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String, default: '' },
    },
    cupsCount: { type: Number, required: true, min: 1 },
    sweetOption: { type: Boolean, required: true },
    eventType: {
      type: String,
      enum: ['events', 'wedding', 'graduation', 'family', 'engagement', 'other'],
      default: 'events',
    },
    notes: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['new', 'contacting', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', bookingSchema);
