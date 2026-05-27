import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { countries } from '../ui/CountrySelect.jsx';

const COLORS = ['#5C3A2A', '#7A4E3A', '#A67B5B', '#C4A882', '#D4BFA5', '#E8D5C4'];

function ChartCard({ children, title }) {
  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-coffee-900 dark:text-white mb-4 sm:mb-6">{title}</h3>
      {children}
      </div>
  );
}

export function CountryChart({ data }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const chartData = (data || []).map((item) => {
    const c = countries.find((c) => c.code === item._id);
    return { name: c ? (isAr ? c.nameAr : c.nameEn) : item._id, count: item.count, flag: c?.flag || '' };
  });

  if (chartData.length === 0) return null;

  return (
    <ChartCard title={isAr ? 'الطلبات حسب الدولة' : 'Bookings by Country'}>
      <div className="h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" opacity={0.3} />
            <XAxis type="number" tick={{ fill: '#A67B5B', fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#A67B5B', fontSize: isAr ? 9 : 10 }} width={isAr ? 95 : 90} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #E8D5C4',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: 12,
              }}
              formatter={(value, name, props) => [`${props.payload.flag || ''} ${value}`, '']}
              labelFormatter={() => ''}
            />
            <Bar dataKey="count" fill="#7A4E3A" radius={[0, 8, 8, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function StatusChart({ data }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const chartData = (data || []).map((item) => ({ name: t(`dashboard.${item._id}`), value: item.count }));

  if (chartData.length === 0) return null;

  return (
    <ChartCard title={isAr ? 'حالة الطلبات' : 'Booking Status'}>
      <div className="h-56 sm:h-72 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #E8D5C4',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function TrendChart({ data }) {
  const { t } = useTranslation();

  const chartData = (data || []).map((item) => ({ date: item._id, count: item.count }));

  if (chartData.length === 0) return null;

  return (
    <ChartCard title={t('dashboard.last30Days')}>
      <div className="h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fill: '#A67B5B', fontSize: 9 }} />
            <YAxis tick={{ fill: '#A67B5B', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #E8D5C4',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#7A4E3A"
              strokeWidth={2}
              dot={{ fill: '#5C3A2A', strokeWidth: 1.5, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function RegionChart({ data }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const chartData = (data || []).map((item) => {
    const c = countries.find((c) => c.code === item._id?.country);
    const flag = c?.flag || '';
    return {
      name: `${flag} ${item._id?.city || ''}`,
      count: item.count,
    };
  });

  if (chartData.length === 0) return null;

  return (
    <ChartCard title={isAr ? 'الطلبات حسب المنطقة' : 'Bookings by Region'}>
      <div className="h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 5, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" opacity={0.3} />
            <XAxis type="number" tick={{ fill: '#A67B5B', fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#A67B5B', fontSize: 10 }} width={isAr ? 150 : 130} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #E8D5C4',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="#C68E5E" radius={[0, 8, 8, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}