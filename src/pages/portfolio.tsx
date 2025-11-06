import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plane } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import ClearScene from "../components/weather/clear";
import RainyScene from "../components/weather/raining";
import ThunderstormScene from "../components/weather/thunderstorm";
import ContactForm from "../components/sections/contact-form";
import Dropdown from "../components/dropdown";
import { fetchCurrentWeather, getWeatherMode } from "@/lib/weather";
import PlaneController from "@/components/plane";
import ProjectsGallery from "@/components/sections/projects";
import Gallery from "@/components/sections/gallery";
import WorkTimeline from "@/components/sections/experience";
import { companiesGallery } from "@/data/companies";
import { experienceTimeline } from "@/data/experience";
import HomeSection from "@/components/sections/home";

const BARCELONA_LAT = 41.3851;
const BARCELONA_LON = 2.1734;

export type WeatherType = "clear" | "cloudy" | "rain" | "thunderstorm";
export type TimeOfDayType = "morning" | "day" | "afternoon" | "night";
export type SectionsType =
  | "projects"
  | "companies"
  | "leading_years"
  | "experience_years"
  | "contact";

export default function Portfolio() {
  const [weather, setWeather] = useState<WeatherType>("clear");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDayType>("night");

  const [weatherMode, setWeatherMode] = useState<WeatherType>("auto");
  const [timeOfDayMode, setTimeOfDayMode] = useState<TimeOfDayType>("auto");

  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDayType>();
  const [currentWeather, setCurrentWeather] = useState<WeatherType>();

  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<SectionsType>(null);
  const [showPlane, setShowPlane] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await fetchWeather();
      determineTimeOfDay();
    }
    fetchData();
  }, []);

  const determineTimeOfDay = () => {
    const hour = new Date().getHours();

    const sunriseHour = sunrise ? new Date(sunrise).getHours() : 8;
    const sunsetHour = sunset ? new Date(sunset).getHours() : 19;

    console.log("Sunrise hour:", sunriseHour);
    console.log("Sunset hour:", sunsetHour);

    if (hour < sunriseHour) {
      setTimeOfDay("night");
      setCurrentTimeOfDay("night");
      console.log("Setting time of day to night");
    } else if (hour >= sunriseHour - 1 && hour < 12) {
      setTimeOfDay("morning");
      setCurrentTimeOfDay("morning");
      console.log("Setting time of day to morning");
    } else if (hour >= 12 && hour < 16) {
      setTimeOfDay("day");
      setCurrentTimeOfDay("day");
      console.log("Setting time of day to day");
    } else if (hour >= sunsetHour - 1 && hour < sunsetHour + 1) {
      setTimeOfDay("afternoon");
      setCurrentTimeOfDay("afternoon");
      console.log("Setting time of day to afternoon");
    } else {
      setTimeOfDay("night");
      setCurrentTimeOfDay("night");
      console.log("Setting time of day to night");
    }
  };

  const fetchWeather = async () => {
    try {
      if (currentWeather) {
        setWeather(currentWeather);
        return;
      }

      setLoading(true);
      const response = await fetchCurrentWeather(BARCELONA_LAT, BARCELONA_LON);

      console.log("Weather response:", response);

      const selectedWeather = getWeatherMode(
        response.current_weather.weathercode
      );

      setCurrentWeather(selectedWeather);
      setWeather(selectedWeather);

      setSunrise(response.daily?.sunrise?.[0] ?? null);
      setSunset(response.daily?.sunset?.[0] ?? null);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setCurrentWeather("clear");
      setWeather("clear");
    } finally {
      setLoading(false);
    }
  };

  const handleWeatherModeChange = (value) => {
    setWeatherMode(value);
    if (value.includes("clear")) setWeather("clear");
    if (value.includes("cloudy")) setWeather("cloudy");
    if (value.includes("rain")) setWeather("rain");
    if (value.includes("thunderstorm")) setWeather("thunderstorm");
    if (value.includes("auto")) setWeather(currentWeather);
  };

  const handleTimeOfDayModeChange = (value) => {
    setTimeOfDayMode(value);
    if (value.includes("morning")) setTimeOfDay("morning");
    if (value.includes("day")) setTimeOfDay("day");
    if (value.includes("afternoon")) setTimeOfDay("afternoon");
    if (value.includes("night")) setTimeOfDay("night");
    if (value.includes("auto")) determineTimeOfDay();
  };

  const getBackgroundComponent = () => {
    if (weather === "thunderstorm") {
      return <ThunderstormScene />;
    }

    if (weather === "rain") {
      return <RainyScene timeOfDay={timeOfDay} />;
    }

    return <ClearScene weather={weather} timeOfDay={timeOfDay} />;
  };

  const handleStatClick = (statType: SectionsType) => {
    setActiveModal(statType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isModalOpen = activeModal !== null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A6FA5] to-[#2D4A6B]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando clima de Barcelona...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      {getBackgroundComponent()}

      {/* Plane in background */}
      <AnimatePresence>{showPlane && <PlaneController />}</AnimatePresence>

      {/* Weather Mode Selector */}
      <div className="absolute top-4 right-4 z-30">
        <Dropdown
          auto={currentWeather}
          value={weatherMode}
          onValueChange={handleWeatherModeChange}
          options={[
            { label: "☀️ Clear", value: "clear" },
            { label: "☁️ Cloudy", value: "cloudy" },
            { label: "🌧️ Rainy", value: "rain" },
            { label: "⚡ Thunderstorm", value: "thunderstorm" },
          ]}
          placeholder="Select Weather"
        />
      </div>

      {/* Day Time Mode Selector */}
      <div className="absolute top-15 right-4 z-30">
        <Dropdown
          auto={currentTimeOfDay}
          value={timeOfDayMode}
          onValueChange={handleTimeOfDayModeChange}
          options={[
            { label: "🌅 Morning", value: "morning" },
            { label: "☀️ Day", value: "day" },
            { label: "☀️ Afternoon", value: "afternoon" },
            { label: "🌙 Night", value: "night" },
          ]}
          placeholder="Select moment"
        />
      </div>

      <div className="absolute bottom-4 right-4 z-30">
        <Button
          onClick={() => setShowPlane(!showPlane)}
          className={`${
            showPlane
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#2D4A6B] hover:bg-[#1F3447]"
          } shadow-lg transition-all duration-300 mt-3 float-right`}
        >
          <Plane className="w-4 h-4" />
        </Button>
      </div>

      {/* Cards Container */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-12">
        <div
          className="relative w-full max-w-3xl"
          style={{ perspective: "1000px" }}
        >
          <HomeSection isModalOpen={isModalOpen} handleStatClick={() => {}} />

          {/* Modals */}
          <AnimatePresence>
            {activeModal === "contact" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ContactForm onClose={closeModal} />
              </div>
            )}

            {activeModal === "projects" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ProjectsGallery onClose={closeModal} />
              </div>
            )}

            {activeModal === "companies" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Gallery options={companiesGallery} onClose={closeModal} />
              </div>
            )}

            {activeModal === "leading_years" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Gallery options={companiesGallery} onClose={closeModal} />
              </div>
            )}

            {activeModal === "experience_years" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <WorkTimeline
                  options={experienceTimeline}
                  onClose={closeModal}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
