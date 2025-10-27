import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ClearScene from "../components/weather/clear";
import RainyScene from "../components/weather/raining";
import ThunderstormScene from "../components/weather/thunderstorm";
import Avatar from "../components/avatar";
import ContactForm from "../components/sections/contact-form";
import Dropdown from "../components/dropdown";
import { fetchCurrentWeather, getWeatherMode } from "@/lib/weather";
import Stats from "@/components/stats";
import PlaneController from "@/components/plane";
import ProjectsGallery from "@/components/sections/projects";
import DesignsGallery from "@/components/sections/designs";
import WebsitesTimeline from "@/components/sections/websites";
import PhotographyGallery from "@/components/sections/photography";

const BARCELONA_LAT = 41.3851;
const BARCELONA_LON = 2.1734;

export type WeatherType = "clear" | "cloudy" | "rain" | "thunderstorm";
export type TimeOfDayType = "morning" | "day" | "afternoon" | "night";

export default function Portfolio() {
  const [weather, setWeather] = useState<WeatherType>("clear");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDayType>("night");

  const [weatherMode, setWeatherMode] = useState<WeatherType>("auto");
  const [timeOfDayMode, setTimeOfDayMode] = useState<TimeOfDayType>("auto");

  const [currentWeather, setCurrentWeather] = useState<WeatherType>();

  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [showPlane, setShowPlane] = useState(false);

  useEffect(() => {
    fetchWeather();
    determineTimeOfDay();
  }, []);

  const determineTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 16) {
      setTimeOfDay("day");
    } else if (hour >= 16 && hour < 20) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("night");
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
    } catch (error) {
      console.error("Error fetching weather:", error);
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
    if (value.includes("auto")) fetchWeather();
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

  const handleStatClick = (statType) => {
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
          auto={weather}
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
          auto={timeOfDay}
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

      <Button
        onClick={() => setShowPlane(!showPlane)}
        className={`w-56 ${
          showPlane
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#2D4A6B] hover:bg-[#1F3447]"
        } text-white shadow-lg transition-all duration-300`}
      >
        <Plane className="w-4 h-4 mr-2" />
        {showPlane ? "Ocultar Avión" : "Mostrar Avión"}
      </Button>

      {/* Cards Container */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-12">
        <div
          className="relative w-full max-w-3xl"
          style={{ perspective: "1000px" }}
        >
          {/* Profile Card */}
          <motion.div
            animate={
              isModalOpen
                ? {
                    scale: 0.95,
                    opacity: 0.3,
                    z: -100,
                    rotateX: 5,
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    z: 0,
                    rotateX: 0,
                  }
            }
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full overflow-visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative pt-20 pb-5 px-8">
              {/* Avatar */}
              <div className="mt-[-200px]">
                <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl m-auto">
                  <Avatar />
                </div>
              </div>

              {/* Name and Title */}
              <div className="ml-4 mr-4 mb-4 flex justify-between items-start flex-wrap gap-4">
                <div className="text-center w-full mt-5">
                  <h1 className="text-4xl font-light text-gray-800 mb-1 tracking-wide">
                    Jordi Orriols
                  </h1>
                  <p className="text-gray-400 text-m tracking-wider">
                    Multimedia Engineer Lead
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <Stats
              options={[
                {
                  label: "Projects",
                  value: "15",
                  onClick: () => handleStatClick("projects"),
                },
                {
                  label: "Companies",
                  value: "12",
                  onClick: () => handleStatClick("companies"),
                },
                {
                  label: "Leading Years",
                  value: "3",
                  onClick: () => handleStatClick("leading_years"),
                },
                {
                  label: "Experience Years",
                  value: "12",
                  onClick: () => handleStatClick("experience_years"),
                },
              ]}
            />

            <Button
              onClick={() => setActiveModal("contact")}
              className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar mensaje
            </Button>
          </motion.div>

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

            {activeModal === "designs" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <DesignsGallery onClose={closeModal} />
              </div>
            )}

            {activeModal === "websites" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <WebsitesTimeline onClose={closeModal} />
              </div>
            )}

            {activeModal === "photography" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PhotographyGallery onClose={closeModal} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
