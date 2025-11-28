import { WeatherType } from "@/pages/portfolio";

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

interface DailyWeather {
  time: string[];
  sunrise: string[];
  sunset: string[];
}

interface OpenMeteoResponse {
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
  else if ([2, 3, 45, 48].includes(code)) return "cloudy";
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return "rain";
  else if ([95, 96, 99].includes(code)) return "thunderstorm";
  else if ([71, 73, 75].includes(code)) return "snow";
  return "clear"; // fallback
}
