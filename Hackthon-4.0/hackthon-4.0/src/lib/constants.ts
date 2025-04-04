/**
 * =================
 * Langauge Constants
 * =================
 */
export const LanguagesCodes = {
  en: 'English',
  'hi-in': 'हिन्दी', // Hindi
  'gu-in': 'ગુજરાતી', // Gujarati
  'mr-in': 'मराठी', // Marathi
  'kn-in': 'ಕನ್ನಡ', // Kannada
  'ta-in': 'தமிழ்', // Tamil
  'te-in': 'తెలుగు', // Telugu
  'bn-in': 'বাংলা', // Bangla
  'ml-in': 'മലയാളം', // Malayalam
};

/**
 * =================
 * AQI Box Constants
 * =================
 */

export type WeatherIconsOptions =
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '09d'
  | '10d'
  | '10n'
  | '11d'
  | '13d'
  | '50d';

export const WeatherIconsCode: { [key: string]: WeatherIconsOptions } = {
  '01d': '01d',
  '01n': '01n',
  '02d': '02d',
  '02n': '02n',
  '03d': '03d',
  '03n': '03d',
  '04d': '03d',
  '04n': '03d',
  '09d': '09d',
  '09n': '09d',
  '10d': '10d',
  '10n': '10n',
  '11d': '11d',
  '11n': '11d',
  '13d': '13d',
  '13n': '13d',
  '50d': '50d',
  '50n': '50d',
};

// --- below lat long value is Mumbai, India location
export const DefaultLatitude = 19.07283;
export const DefaultLongitude = 72.88261;

/**
 * @see https://openweathermap.org/api/one-call-3#data
 * Units of measurement option: standard | metric | imperial
 */
export const Units = 'metric';

export const ExtraComputations = [
  'HEALTH_RECOMMENDATIONS',
  'DOMINANT_POLLUTANT_CONCENTRATION',
  'POLLUTANT_CONCENTRATION',
  'LOCAL_AQI',
  'POLLUTANT_ADDITIONAL_INFO',
];

/**
 * =================
 * AQI Model Pop Constants
 * =================
 */
export const AqiPollutantStandardFallback = {
  co: '4',
  c6h6: '1.7',
  ox: '0',
  o3: '100',
  nh3: '0',
  nmhc: '0',
  no: '0',
  nox: '0',
  no2: '25',
  pm25: '45',
  pm10: '15',
  so2: '0',
  trs: '0',
};

/**
 * =================
 * Layout, Head Constants
 * =================
 */
// --- Meta fallback Constants
export const MetaFallbackConstants = {
  PageTitle: 'BreatheFree Page',
  PageDescription:
    'Breathefree website is a one stop destination that provides information and support on chronic airway diseases like Asthma & COPD, and related therapies',
  Keywords: 'breathefree,breathefree inhaler,cipla breathefree,cipla inhaler',

  AppName: 'BreatheFree',
  SiteName: 'breathefree.com',

  OGTitle: 'BreatheFree Page',
  OGType: 'article',
  OGDescription:
    'Breathefree website is a one stop destination that provides information and support on chronic airway diseases like Asthma & COPD, and related therapies',
  OGSiteName: 'breathefree.com',
  OGUrl: 'https://breathefree.com',
  OGImage: '/icons/icon-192x192.png',

  TwitterCreator: '@ibreathefree',
  TwitterTitle: 'BreatheFree Page',
  TwitterDescription:
    'Breathefree website is a one stop destination that provides information and support on chronic airway diseases like Asthma & COPD, and related therapies',
  TwitterSite: 'breathefree.com',
  TwitterCard: 'summary',
  TwitterImage: '/icons/icon-192x192.png',
};
