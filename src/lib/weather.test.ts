import { describe, it, expect, vi } from "vitest";
import { getWeatherMode, fetchCurrentWeather } from "./weather";

describe("Weather", () => {
  describe("getWeatherMode", () => {
    it.each([
      [0, "clear"],
      [1, "clear"],
    ])("returns clear for code %i", (code, expected) => {
      expect(getWeatherMode(code)).toBe(expected);
    });

    it.each([
      [2, "cloudy"],
      [3, "cloudy"],
      [45, "cloudy"],
      [48, "cloudy"],
    ])("returns cloudy for code %i", (code, expected) => {
      expect(getWeatherMode(code)).toBe(expected);
    });

    it.each([
      [51, "rain"],
      [61, "rain"],
      [80, "rain"],
      [82, "rain"],
    ])("returns rain for code %i", (code, expected) => {
      expect(getWeatherMode(code)).toBe(expected);
    });

    it.each([
      [95, "thunderstorm"],
      [96, "thunderstorm"],
      [99, "thunderstorm"],
    ])("returns thunderstorm for code %i", (code, expected) => {
      expect(getWeatherMode(code)).toBe(expected);
    });

    it.each([
      [71, "snow"],
      [73, "snow"],
      [75, "snow"],
    ])("returns snow for code %i", (code, expected) => {
      expect(getWeatherMode(code)).toBe(expected);
    });

    it("returns clear for unknown weather codes", () => {
      expect(getWeatherMode(999)).toBe("clear");
    });
  });

  describe("fetchCurrentWeather", () => {
    it("fetches weather data successfully", async () => {
      const mockResponse = {
        latitude: 41.3851,
        longitude: 2.1734,
        generationtime_ms: 1,
        utc_offset_seconds: 3600,
        timezone: "Europe/Madrid",
        timezone_abbreviation: "CET",
        elevation: 12,
        current_weather: {
          temperature: 15,
          windspeed: 10,
          winddirection: 180,
          weathercode: 0,
          time: "2024-01-01T12:00:00Z",
        },
        daily: {
          time: ["2024-01-01"],
          sunrise: ["2024-01-01T07:30:00Z"],
          sunset: ["2024-01-01T17:45:00Z"],
        },
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      ) as typeof global.fetch;

      const result = await fetchCurrentWeather(41.3851, 2.1734);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("latitude=41.3851"));
    });

    it("throws error on failed response", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        } as Response)
      ) as typeof global.fetch;

      await expect(fetchCurrentWeather(41.3851, 2.1734)).rejects.toThrow(/Weather API error/);
    });
  });
});
