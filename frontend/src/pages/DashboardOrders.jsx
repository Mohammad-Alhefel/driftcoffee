import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { api } from '../services/api.js';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import BookingTable from '../components/dashboard/BookingTable.jsx';
import BookingModal from '../components/dashboard/BookingModal.jsx';

export default function DashboardOrders() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filters, setFilters] = useState({ search: '', country: '', status: '', page: 1 });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.country) params.set('country', filters.country);
      if (filters.status) params.set('status', filters.status);
      if (filters.page) params.set('page', filters.page);

      const res = await api.get(`/bookings?${params}`);
      setBookings(res.data.bookings);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      setError(err.response?.data?.message || t('dashboard.error'));
    } finally {
      setLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      toast.success(t('dashboard.statusUpdated'));
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm(t('dashboard.deleteConfirm'))) return;
    try {
      await api.delete(`/bookings/${id}`);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <DashboardLayout title={t('dashboard.recentBookings')}>
      <BookingTable
        bookings={bookings}
        loading={loading}
        error={error}
        onRetry={fetchData}
        filters={filters}
        onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))}
        onView={(booking) => setSelectedBooking(booking)}
        onDelete={deleteBooking}
        onStatusChange={updateStatus}
      />
      <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </DashboardLayout>
  );
}