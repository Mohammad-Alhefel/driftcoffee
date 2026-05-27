import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, Crosshair } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMarker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

function MapUpdater({ countryCenter, cityCenter }) {
  const map = useMap();
  const prevCityRef = useRef(null);

  useEffect(() => {
    if (cityCenter && (cityCenter.lat !== prevCityRef.current?.lat || cityCenter.lng !== prevCityRef.current?.lng)) {
      map.setView([cityCenter.lat, cityCenter.lng], 9, { animate: true, duration: 0.8 });
      prevCityRef.current = cityCenter;
    } else if (countryCenter && !cityCenter) {
      map.setView([countryCenter.lat, countryCenter.lng], 6, { animate: true });
    }
  }, [countryCenter, cityCenter, map]);

  return null;
}

const countryCenters = {
  SA: { lat: 24.7136, lng: 46.6753 },
  AE: { lat: 25.2048, lng: 55.2708 },
  KW: { lat: 29.3759, lng: 47.9774 },
  QA: { lat: 25.2854, lng: 51.531 },
  BH: { lat: 26.2285, lng: 50.586 },
  OM: { lat: 23.588, lng: 58.3829 },
};

export default function MapPicker({ onLocationChange, country, cityCenter }) {
  const { t } = useTranslation();
  const [position, setPosition] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState(null);

  const defaultCenter = { lat: 24.7136, lng: 46.6753 };
  const center = (country && countryCenters[country]) || defaultCenter;
  const initialZoom = cityCenter ? 9 : 6;

  const handlePositionChange = (pos) => {
    setPosition(pos);
    setError(null);
    onLocationChange({ latitude: pos.lat, longitude: pos.lng });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handlePositionChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setDetecting(false);
      },
      () => {
        setError('Could not detect location. Please choose on the map.');
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-coffee-700 dark:text-coffee-300 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {t('booking.location')}
        </label>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={detectLocation}
          disabled={detecting}
          className="btn-ghost text-sm flex items-center gap-1.5"
        >
          <Crosshair className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
          {t('booking.detectLocation')}
        </motion.button>
      </div>

      <div className="h-64 md:h-80 rounded-xl overflow-hidden border border-coffee-200 dark:border-coffee-700 shadow-inner relative z-0">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={initialZoom}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} onPositionChange={handlePositionChange} />
          <MapUpdater countryCenter={center} cityCenter={cityCenter} />
        </MapContainer>
      </div>

      {position && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-coffee-500 dark:text-coffee-400 font-mono"
        >
          {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </motion.p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
