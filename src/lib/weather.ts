import { WeatherType } from "@/pages/portfolio";

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface DailyWeather {
  time: string[];
  sunrise: string[];
  sunset: string[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily?: DailyWeather;
}

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current_weather: "true",
    daily: "sunrise,sunset",
    timezone: "auto",
  });

  const url = `${BASE_URL}?${params.toString()}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Weather API error: ${resp.status} ${resp.statusText}`);
  }
  const data: OpenMeteoResponse = await resp.json();
  return data;
}

export function getWeatherMode(code: number): WeatherType {
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3, 45, 48].includes(code)) return "cloudy";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "clear"; // fallback
}
