/**
 * =================
 * General Environment Config
 * =================
 */

// --- sitecore api url
const SitecoreApiUrl =
  process.env.NEXT_PUBLIC_SITECORE_API_HOST ||
  'https://mc-a44e9cb7-19e5-47c5-b370-9182-cm.azurewebsites.net';

const DefaultLanguage = process.env.DEFAULT_LANGUAGE || 'en';

/**
 * =================
 * AQI Box Constants
 * =================
 */
// --- API Key
const GoogleApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'google-api-key';
const OpenWeatherApiKey: string =
  process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY || 'open-weather-api-key';
const AQIEndpoint =
  process.env.NEXT_PUBLIC_AQI_ENDPOINT ||
  'https://airquality.googleapis.com/v1/currentConditions:lookup';
const WeatherEndpoint =
  process.env.NEXT_PUBLIC_WEATHER_ENDPOINT || 'https://api.openweathermap.org/data/2.5/weather';
const LocationEndpoint =
  process.env.NEXT_PUBLIC_LOCATION_ENDPOINT || 'http://api.openweathermap.org/geo/1.0/reverse';

const DefaultLatitude = process.env.NEXT_PUBLIC_DEFAULT_LATITUDE || 19.07283;
const DefaultLongitude = process.env.NEXT_PUBLIC_DEFAULT_LONGITUDE || 72.88261;

/**
 * =================
 * SuveryMonkey Constants
 * =================
 */

const SurveyMonkeyApiKey =
  process.env.NEXT_PUBLIC_SURVEYMONKEY_API_KEY || 'https://api.surveymonkey.com/v3';
const SurveyMonkeyToken = process.env.NEXT_PUBLIC_SURVEY_ACCESS_TOKEN || 'something';

//AutoSuggest API key

const SitecoreHostEndpoint = process.env.SITECORE_API_HOST || '';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // --- sitecore api url
  SitecoreApiUrl,
  // --- API Key
  GoogleApiKey,
  OpenWeatherApiKey,
  AQIEndpoint,
  WeatherEndpoint,
  LocationEndpoint,
  DefaultLatitude,
  DefaultLongitude,
  DefaultLanguage,
  SitecoreHostEndpoint,
  // --- SurveyMonkey
  SurveyMonkeyApiKey,
  SurveyMonkeyToken,
};
