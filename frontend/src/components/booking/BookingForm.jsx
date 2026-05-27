import { useState, useMemo, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { api } from '../../services/api.js';
import { countries } from '../ui/CountrySelect.jsx';
import MapPicker from '../ui/MapPicker.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

const cityCenters = {
  SA: {
    'منطقة الرياض': { lat: 24.7136, lng: 46.6753 },
    'Riyadh Region': { lat: 24.7136, lng: 46.6753 },
    'منطقة مكة المكرمة': { lat: 21.3891, lng: 39.8579 },
    'Makkah Region': { lat: 21.3891, lng: 39.8579 },
    'منطقة المدينة المنورة': { lat: 24.5247, lng: 39.5692 },
    'Madinah Region': { lat: 24.5247, lng: 39.5692 },
    'منطقة القصيم': { lat: 26.3327, lng: 43.9688 },
    'Al-Qassim Region': { lat: 26.3327, lng: 43.9688 },
    'المنطقة الشرقية': { lat: 26.4207, lng: 50.0888 },
    'Eastern Region': { lat: 26.4207, lng: 50.0888 },
    'منطقة عسير': { lat: 18.2169, lng: 42.5053 },
    'Asir Region': { lat: 18.2169, lng: 42.5053 },
    'منطقة تبوك': { lat: 28.3835, lng: 36.5663 },
    'Tabuk Region': { lat: 28.3835, lng: 36.5663 },
    'منطقة حائل': { lat: 27.5219, lng: 41.6907 },
    'Hail Region': { lat: 27.5219, lng: 41.6907 },
    'منطقة الحدود الشمالية': { lat: 30.0013, lng: 40.7994 },
    'Northern Borders Region': { lat: 30.0013, lng: 40.7994 },
    'منطقة جازان': { lat: 16.8892, lng: 42.5611 },
    'Jazan Region': { lat: 16.8892, lng: 42.5611 },
    'منطقة نجران': { lat: 17.5656, lng: 44.2289 },
    'Najran Region': { lat: 17.5656, lng: 44.2289 },
    'منطقة الباحة': { lat: 20.0129, lng: 41.4677 },
    'Al-Bahah Region': { lat: 20.0129, lng: 41.4677 },
    'منطقة الجوف': { lat: 29.9873, lng: 39.6931 },
    'Al-Jawf Region': { lat: 29.9873, lng: 39.6931 },
  },
  AE: {
    'إمارة أبو ظبي': { lat: 24.4539, lng: 54.3773 },
    'Abu Dhabi Emirate': { lat: 24.4539, lng: 54.3773 },
    'إمارة دبي': { lat: 25.2048, lng: 55.2708 },
    'Dubai Emirate': { lat: 25.2048, lng: 55.2708 },
    'إمارة الشارقة': { lat: 25.3463, lng: 55.4209 },
    'Sharjah Emirate': { lat: 25.3463, lng: 55.4209 },
    'إمارة عجمان': { lat: 25.4052, lng: 55.5136 },
    'Ajman Emirate': { lat: 25.4052, lng: 55.5136 },
    'إمارة رأس الخيمة': { lat: 25.7895, lng: 55.9432 },
    'Ras Al Khaimah Emirate': { lat: 25.7895, lng: 55.9432 },
    'إمارة الفجيرة': { lat: 25.1288, lng: 56.3415 },
    'Fujairah Emirate': { lat: 25.1288, lng: 56.3415 },
    'إمارة أم القيوين': { lat: 25.5647, lng: 55.5532 },
    'Umm Al Quwain Emirate': { lat: 25.5647, lng: 55.5532 },
  },
  KW: {
    'محافظة العاصمة': { lat: 29.3697, lng: 47.9783 },
    'Capital Governorate': { lat: 29.3697, lng: 47.9783 },
    'محافظة حولي': { lat: 29.3333, lng: 48.0167 },
    'Hawalli Governorate': { lat: 29.3333, lng: 48.0167 },
    'محافظة الفروانية': { lat: 29.2833, lng: 47.95 },
    'Farwaniya Governorate': { lat: 29.2833, lng: 47.95 },
    'محافظة الأحمدي': { lat: 29.0769, lng: 48.0833 },
    'Ahmadi Governorate': { lat: 29.0769, lng: 48.0833 },
    'محافظة الجهراء': { lat: 29.35, lng: 47.6667 },
    'Jahra Governorate': { lat: 29.35, lng: 47.6667 },
    'محافظة مبارك الكبير': { lat: 29.2575, lng: 48.0756 },
    'Mubarak Al-Kabeer Governorate': { lat: 29.2575, lng: 48.0756 },
  },
  QA: {
    'بلدية الدوحة': { lat: 25.2854, lng: 51.531 },
    'Doha Municipality': { lat: 25.2854, lng: 51.531 },
    'بلدية الريان': { lat: 25.2919, lng: 51.4244 },
    'Al Rayyan Municipality': { lat: 25.2919, lng: 51.4244 },
    'بلدية الوكرة': { lat: 25.1678, lng: 51.5269 },
    'Al Wakrah Municipality': { lat: 25.1678, lng: 51.5269 },
    'بلدية أم صلال': { lat: 25.4167, lng: 51.4 },
    'Umm Salal Municipality': { lat: 25.4167, lng: 51.4 },
    'بلدية الخور والذخيرة': { lat: 25.6833, lng: 51.5 },
    'Al Khor & Al Thakhira': { lat: 25.6833, lng: 51.5 },
    'بلدية الشمال': { lat: 26.1333, lng: 51.2167 },
    'Al Shamal Municipality': { lat: 26.1333, lng: 51.2167 },
    'بلدية الضعاين': { lat: 25.35, lng: 51.45 },
    'Al Daayen Municipality': { lat: 25.35, lng: 51.45 },
    'بلدية مسيعيد': { lat: 24.9833, lng: 51.55 },
    'Mesaieed Municipality': { lat: 24.9833, lng: 51.55 },
  },
  BH: {
    'محافظة العاصمة': { lat: 26.2285, lng: 50.586 },
    'Capital Governorate': { lat: 26.2285, lng: 50.586 },
    'محافظة المحرق': { lat: 26.2572, lng: 50.6117 },
    'Muharraq Governorate': { lat: 26.2572, lng: 50.6117 },
    'المحافظة الشمالية': { lat: 26.1333, lng: 50.5 },
    'Northern Governorate': { lat: 26.1333, lng: 50.5 },
    'المحافظة الجنوبية': { lat: 26.0, lng: 50.55 },
    'Southern Governorate': { lat: 26.0, lng: 50.55 },
  },
  OM: {
    'محافظة مسقط': { lat: 23.588, lng: 58.3829 },
    'Muscat Governorate': { lat: 23.588, lng: 58.3829 },
    'محافظة ظفار': { lat: 17.0333, lng: 54.0833 },
    'Dhofar Governorate': { lat: 17.0333, lng: 54.0833 },
    'محافظة مسندم': { lat: 26.1, lng: 56.2833 },
    'Musandam Governorate': { lat: 26.1, lng: 56.2833 },
    'محافظة البريمي': { lat: 24.25, lng: 55.7833 },
    'Al Buraimi Governorate': { lat: 24.25, lng: 55.7833 },
    'محافظة الداخلية': { lat: 22.9333, lng: 57.5333 },
    'Ad Dakhiliyah Governorate': { lat: 22.9333, lng: 57.5333 },
    'محافظة شمال الباطنة': { lat: 23.7167, lng: 57.1 },
    'North Al Batinah Governorate': { lat: 23.7167, lng: 57.1 },
    'محافظة جنوب الباطنة': { lat: 23.3833, lng: 57.4333 },
    'South Al Batinah Governorate': { lat: 23.3833, lng: 57.4333 },
    'محافظة شمال الشرقية': { lat: 22.5667, lng: 59.5333 },
    'North Al Sharqiyah Governorate': { lat: 22.5667, lng: 59.5333 },
    'محافظة جنوب الشرقية': { lat: 22.0, lng: 59.65 },
    'South Al Sharqiyah Governorate': { lat: 22.0, lng: 59.65 },
    'محافظة الظاهرة': { lat: 23.1833, lng: 56.5333 },
    'Ad Dhahirah Governorate': { lat: 23.1833, lng: 56.5333 },
    'محافظة الوسطى': { lat: 19.8833, lng: 56.2667 },
    'Al Wusta Governorate': { lat: 19.8833, lng: 56.2667 },
  },
};

export default function BookingForm() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState(null);
  const isSubmitting = useRef(false);

  const defaultCity = isAr ? 'إمارة دبي' : 'Dubai Emirate';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({ defaultValues: { country: 'AE', city: defaultCity } });

  const selectedCountryCode = watch('country');
  const selectedCityName = watch('city');

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === selectedCountryCode) || null,
    [selectedCountryCode]
  );

  const regions = useMemo(() => {
    if (!selectedCountryCode) return [];
    const r = t(`booking.regions.${selectedCountryCode}`, { returnObjects: true });
    return Array.isArray(r) ? r : [];
  }, [selectedCountryCode, i18n.language]);

  const cityCenter = useMemo(() => {
    if (!selectedCityName || !selectedCountryCode) return null;
    const map = cityCenters[selectedCountryCode];
    return map?.[selectedCityName] || null;
  }, [selectedCityName, selectedCountryCode]);

  const onSubmit = useCallback(
    async (data) => {
      const selCountry = countries.find((c) => c.code === data.country);
      if (!selCountry) {
        toast.error(isAr ? 'يرجى اختيار الدولة' : 'Please select a country');
        return;
      }

      if (isSubmitting.current) return;
      isSubmitting.current = true;
      setLoading(true);
      try {
        const payload = {
          fullName: data.fullName.trim(),
          phone: data.phone.trim(),
          countryCode: selCountry.dialCode,
          country: selCountry.code,
          eventCountry: selCountry.code,
          city: data.city,
          ...(location && {
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
              address: `${data.city}, ${selCountry.code}`,
            },
          }),
          cupsCount: parseInt(data.cupsCount, 10),
          sweetOption: data.sweetOption === 'true',
          eventType: data.eventType || 'events',
          notes: data.notes?.trim() || '',
        };

        await api.post('/bookings', payload);
        setSuccess(true);
        toast.success(t('booking.success'));

        setTimeout(() => {
          reset();
          setLocation(null);
          setSuccess(false);
        }, 3000);
      } catch (err) {
        toast.error(err.response?.data?.message || (isAr ? 'حدث خطأ في الإرسال' : 'Submission failed'));
      } finally {
        setLoading(false);
        isSubmitting.current = false;
      }
    },
    [location, t, isAr, reset]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card p-4 md:p-10">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-4xl font-black text-coffee-900 dark:text-white mb-1 md:mb-2">
            {t('booking.title')}
          </h2>
          <p className="text-xs md:text-base text-coffee-500 dark:text-coffee-400">{t('booking.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
              {t('booking.fullName')}
            </label>
            <input
              {...register('fullName', {
                required: isAr ? 'حقل مطلوب' : 'Required',
                minLength: {
                  value: 6,
                  message: isAr ? 'يجب إدخال الاسم الثلاثي على الأقل' : 'Enter at least three names',
                },
              })}
              placeholder={t('booking.fullNamePlaceholder')}
              className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.phone')}
              </label>
                <div className="flex gap-1.5 md:gap-2">
                <div className="w-24 md:w-36 shrink-0">
                  <input
                    value={selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dialCode}` : '🇦🇪 +971'}
                    readOnly
                    className="input-field text-center font-bold bg-coffee-50 dark:bg-coffee-800 cursor-default"
                    dir="ltr"
                  />
                </div>
                <input
                  {...register('phone', {
                    required: isAr ? 'حقل مطلوب' : 'Required',
                    minLength: { value: 7, message: isAr ? 'رقم غير صحيح' : 'Invalid number' },
                  })}
                  type="tel"
                  placeholder={t('booking.phonePlaceholder')}
                  className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.country')}
              </label>
              <select
                {...register('country', {
                  required: isAr ? 'حقل مطلوب' : 'Required',
                  onChange: (e) => {
                    setValue('city', '');
                  },
                })}
                className={`input-field ${errors.country ? 'border-red-400' : ''}`}
              >
                <option value="">{t('booking.selectCountry')}</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {isAr ? c.nameAr : c.nameEn} ({c.dialCode})
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.city')}
              </label>
              <select
                {...register('city', { required: isAr ? 'حقل مطلوب' : 'Required' })}
                className={`input-field ${errors.city ? 'border-red-400' : ''}`}
                disabled={!selectedCountryCode || regions.length === 0}
              >
                <option value="">{t('booking.selectCity')}</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <MapPicker onLocationChange={setLocation} country={selectedCountryCode} cityCenter={cityCenter} />
          <p className="text-[10px] md:text-xs text-coffee-400 dark:text-coffee-500 mt-1 text-center">
            {t('booking.locationOptional')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.eventType')}
              </label>
              <select
                {...register('eventType', { required: isAr ? 'حقل مطلوب' : 'Required' })}
                className={`input-field ${errors.eventType ? 'border-red-400' : ''}`}
              >
                {(['events', 'wedding', 'graduation', 'family', 'engagement', 'other']).map((type) => (
                  <option key={type} value={type}>
                    {t(`booking.eventTypes.${type}`)}
                  </option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.eventType.message}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.cupsCount')}
              </label>
              <input
                {...register('cupsCount', {
                  required: isAr ? 'حقل مطلوب' : 'Required',
                  min: { value: 1, message: t('booking.cupsMin') },
                  valueAsNumber: true,
                })}
                type="number"
                min="1"
                className={`input-field ${errors.cupsCount ? 'border-red-400' : ''}`}
              />
              {errors.cupsCount && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.cupsCount.message}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.sweetOption')}
              </label>
              <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
                <label className="flex items-center gap-1.5 md:gap-2 cursor-pointer">
                  <input
                    {...register('sweetOption')}
                    type="radio"
                    value="true"
                    defaultChecked
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-coffee-600 focus:ring-coffee-500"
                  />
                  <span className="text-xs md:text-sm text-coffee-700 dark:text-coffee-300">{t('booking.yes')}</span>
                </label>
                <label className="flex items-center gap-1.5 md:gap-2 cursor-pointer">
                  <input
                    {...register('sweetOption')}
                    type="radio"
                    value="false"
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-coffee-600 focus:ring-coffee-500"
                  />
                  <span className="text-xs md:text-sm text-coffee-700 dark:text-coffee-300">{t('booking.no')}</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-bold text-coffee-700 dark:text-coffee-300 mb-1 md:mb-1.5">
                {t('booking.notes')}
              </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder={t('booking.notesPlaceholder')}
              className="input-field resize-none"
            />
          </div>

          <SubmitButton
            text={loading ? t('booking.submitting') : t('booking.submit')}
            loading={loading}
            success={success}
            disabled={success}
          />
        </form>
      </div>
    </motion.div>
  );
}
