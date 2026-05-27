import { useTranslation } from 'react-i18next';

export const countries = [
  { code: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
  { code: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', flag: '🇦🇪', dialCode: '+971' },
  { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', flag: '🇰🇼', dialCode: '+965' },
  { code: 'QA', nameAr: 'قطر', nameEn: 'Qatar', flag: '🇶🇦', dialCode: '+974' },
  { code: 'BH', nameAr: 'البحرين', nameEn: 'Bahrain', flag: '🇧🇭', dialCode: '+973' },
  { code: 'OM', nameAr: 'عمان', nameEn: 'Oman', flag: '🇴🇲', dialCode: '+968' },
];

export default function CountrySelect({ value, onChange, showDialCode = false, placeholder, error }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div>
      <select
        value={value}
        onChange={(e) => {
          const country = countries.find((c) => c.code === e.target.value);
          onChange(country || null);
        }}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400/30' : ''}`}
      >
        <option value="">{placeholder}</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {isAr ? c.nameAr : c.nameEn} {showDialCode ? c.dialCode : ''}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
