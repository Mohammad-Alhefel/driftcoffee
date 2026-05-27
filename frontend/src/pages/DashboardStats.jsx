import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Users, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api.js';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import StatsCard from '../components/dashboard/StatsCard.jsx';
import { CountryChart, StatusChart, TrendChart, RegionChart } from '../components/dashboard/DashboardCharts.jsx';
import { SkeletonStats } from '../components/ui/SkeletonLoader.jsx';

export default function DashboardStats() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await api.get('/bookings/stats');
      setStats(res.data);
    } catch {
      // stats are secondary
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <DashboardLayout title={t('dashboard.title')}>
      {statsLoading ? (
        <SkeletonStats />
      ) : stats ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          <StatsCard title={t('dashboard.totalBookings')} value={stats.total || 0} icon={Coffee} color="total" />
          <StatsCard
            title={t('dashboard.new')}
            value={stats.byStatus?.find((s) => s._id === 'new')?.count || 0}
            icon={Users}
            color="new"
          />
          <StatsCard
            title={t('dashboard.completed')}
            value={stats.byStatus?.find((s) => s._id === 'completed')?.count || 0}
            icon={CheckCircle}
            color="completed"
          />
          <StatsCard
            title={t('dashboard.cancelled')}
            value={stats.byStatus?.find((s) => s._id === 'cancelled')?.count || 0}
            icon={XCircle}
            color="cancelled"
          />
        </motion.div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats && <CountryChart data={stats.byCountry} />}
        {stats && <StatusChart data={stats.byStatus} />}
      </div>

      {stats && (
        <div className="mb-6 sm:mb-8">
          <TrendChart data={stats.byDate} />
        </div>
      )}

      {stats && (
        <div className="mb-6 sm:mb-8">
          <RegionChart data={stats.byCity} />
        </div>
      )}
    </DashboardLayout>
  );
}