import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';

export function useBookings(filters = {}) {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.country) params.set('country', filters.country);
      if (filters.status) params.set('status', filters.status);
      if (filters.page) params.set('page', filters.page);

      const res = await api.get(`/bookings?${params}`);
      setBookings(res.data.bookings);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.country, filters.status, filters.page]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, pagination, loading, error, refetch: fetchBookings };
}
