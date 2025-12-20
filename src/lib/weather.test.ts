import { describe, it, expect, vi } from 'vitest';
import { getWeatherMode, fetchCurrentWeather } from './weather';

describe('Weather', () => {
  describe('getWeatherMode', () => {
    it('returns "clear" for clear weather codes', () => {
      expect(getWeatherMode(0)).toBe('clear');
      expect(getWeatherMode(1)).toBe('clear');
    });

    it('returns "cloudy" for cloudy weather codes', () => {
      expect(getWeatherMode(2)).toBe('cloudy');
      expect(getWeatherMode(3)).toBe('cloudy');
      expect(getWeatherMode(45)).toBe('cloudy');
      expect(getWeatherMode(48)).toBe('cloudy');
    });

    it('returns "rain" for rain weather codes', () => {
      expect(getWeatherMode(51)).toBe('rain');
      expect(getWeatherMode(61)).toBe('rain');
      expect(getWeatherMode(80)).toBe('rain');
      expect(getWeatherMode(82)).toBe('rain');
    });

    it('returns "thunderstorm" for thunderstorm codes', () => {
      expect(getWeatherMode(95)).toBe('thunderstorm');
      expect(getWeatherMode(96)).toBe('thunderstorm');
      expect(getWeatherMode(99)).toBe('thunderstorm');
    });

    it('returns "snow" for snow weather codes', () => {
      expect(getWeatherMode(71)).toBe('snow');
      expect(getWeatherMode(73)).toBe('snow');
      expect(getWeatherMode(75)).toBe('snow');
    });

    it('returns "clear" for unknown weather codes', () => {
      expect(getWeatherMode(999)).toBe('clear');
    });
  });

  describe('fetchCurrentWeather', () => {
    it('fetches weather data successfully', async () => {
      const mockResponse = {
        latitude: 41.3851,
        longitude: 2.1734,
        generationtime_ms: 1,
        utc_offset_seconds: 3600,
        timezone: 'Europe/Madrid',
        timezone_abbreviation: 'CET',
        elevation: 12,
        current_weather: {
          temperature: 15,
          windspeed: 10,
          winddirection: 180,
          weathercode: 0,
          time: '2024-01-01T12:00:00Z',
        },
        daily: {
          time: ['2024-01-01'],
          sunrise: ['2024-01-01T07:30:00Z'],
          sunset: ['2024-01-01T17:45:00Z'],
        },
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as any;

      const result = await fetchCurrentWeather(41.3851, 2.1734);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('latitude=41.3851')
      );
    });

    it('throws error on failed response', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        })
      ) as any;

      await expect(fetchCurrentWeather(41.3851, 2.1734)).rejects.toThrow(
        /Weather API error/
      );
    });
  });
});
