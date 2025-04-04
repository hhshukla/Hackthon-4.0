import { WeatherIconsCode, WeatherIconsOptions } from 'lib/constants';

export type ValueOf<T> = T[keyof T];
export type WeatherImageFieldType =
  | 'PopupBGCloudyImage'
  | 'PopupBGNightImage'
  | 'PopupBGRainyImage'
  | 'PopupBGSunnyImage';
/**
 * get current day and Date
 */
export function getCurrentDateAndDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

export const getWeatherIcon = (iconCode?: string): WeatherIconsOptions => {
  if (iconCode && WeatherIconsCode[iconCode]) {
    return WeatherIconsCode[iconCode] as WeatherIconsOptions;
  } else {
    return WeatherIconsCode['01d']; // Default value
  }
};

export const getAqiColor = (aqi?: number) => {
  if (!aqi) return `ColorCode50`;

  if (aqi <= 50) {
    return `ColorCode50`;
  } else if (aqi <= 100) {
    return `ColorCode100`;
  } else if (aqi <= 200) {
    return `ColorCode200`;
  } else if (aqi <= 300) {
    return `ColorCode300`;
  } else if (aqi <= 400) {
    return `ColorCode400`;
  } else if (aqi <= 500) {
    return `ColorCode500`;
  } else {
    return `ColorCode50`;
  }
};

export const getWeatherImageFieldName = (iconCode: WeatherIconsOptions): WeatherImageFieldType => {
  const defaultWeather: WeatherImageFieldType = 'PopupBGSunnyImage';

  // raininy Icon
  if (iconCode === '09d' || iconCode === '10d' || iconCode === '10n' || iconCode === '11d') {
    return 'PopupBGRainyImage';
  } else if (iconCode === '01n' || iconCode === '02n') {
    return 'PopupBGNightImage';
  } else if (iconCode === '03d' || iconCode === '50d') {
    return 'PopupBGCloudyImage';
  } else {
    return defaultWeather;
  }
};

export const calculateDewPoint = (tempC: string | undefined, humidity: string | undefined) => {
  const tempCNumber = parseInt(tempC ?? '28');
  const humnidityNumber = parseInt(humidity ?? '50');
  // Constants for the Magnus-Tetens approximation
  const a = 17.27;
  const b = 237.7;

  // Calculate alpha
  const alpha = (a * tempCNumber) / (b + tempCNumber) + Math.log(humnidityNumber / 100.0);

  // Calculate dew point
  const dewPoint = (b * alpha) / (a - alpha);

  return dewPoint;
};
