import { AppError } from '../utils/AppError.js';

const gccCountries = ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'];

export const validateBookingInput = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length < 6) {
    errors.push('Full name must be at least 6 characters (three names).');
  }

  if (!data.phone || data.phone.trim().length < 7) {
    errors.push('Valid phone number is required.');
  }

  if (!data.countryCode) {
    errors.push('Country code is required.');
  }

  if (!data.country) {
    errors.push('Country is required.');
  }

  if (!data.eventCountry || !gccCountries.includes(data.eventCountry)) {
    errors.push('Event country must be a GCC country (SA, AE, KW, QA, BH, OM).');
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.push('City/region is required.');
  }

  if (data.location && (!data.location.latitude || !data.location.longitude)) {
    errors.push('Location coordinates are required when location is provided.');
  }

  if (!data.cupsCount || data.cupsCount < 1) {
    errors.push('Cups count must be at least 1.');
  }

  if (typeof data.sweetOption !== 'boolean') {
    errors.push('Sweet option must be a boolean value.');
  }

  const validEventTypes = ['events', 'wedding', 'graduation', 'family', 'engagement', 'other'];
  if (!data.eventType || !validEventTypes.includes(data.eventType)) {
    errors.push('Event type is required and must be a valid type.');
  }

  return errors;
};

export const validateStatusUpdate = (status) => {
  const validStatuses = ['new', 'contacting', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return `Status must be one of: ${validStatuses.join(', ')}`;
  }
  return null;
};
