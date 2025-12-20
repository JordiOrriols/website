import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plane, Volume2, VolumeOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import type { ExperienceEntry } from "@/data/experience";

import DynamicScene from "../components/weather/scenes/dynamic";
import ThunderstormScene from "../components/weather/scenes/thunderstorm";
import ContactForm from "../components/sections/contact-form";
import Dropdown from "../components/dropdown";
import { fetchCurrentWeather, getWeatherMode } from "@/lib/weather";
import PlaneController from "@/components/plane";
import ProjectsGallery from "@/components/sections/projects";
import Gallery from "@/components/sections/gallery";
import WorkTimeline from "@/components/sections/experience";
import { companiesGallery } from "@/data/companies";
import HomeSection from "@/components/sections/home";
import { useTranslation } from "react-i18next";
import { useAmbientAudio } from "@/lib/ambient";
import { ErrorBoundary } from "react-error-boundary";
import NewYearScene from "@/components/weather/scenes/new-year";
import HalloweenScene from "@/components/weather/scenes/halloween";

const BARCELONA_LAT = 41.3851;
const BARCELONA_LON = 2.1734;

export type WeatherType = "clear" | "cloudy" | "rain" | "thunderstorm" | "snow";
export type TimeOfDayType = "morning" | "day" | "afternoon" | "night";
export type SeasonType = "easter" | "summer" | "halloween" | "christmas" | "newYear" | "none";

// Mode types include "auto" for selectors
type WeatherMode = WeatherType | "auto";
type TimeOfDayMode = TimeOfDayType | "auto";
type SeasonMode = SeasonType | "auto";

export type SectionsType =
  | "projects"
  | "companies"
  | "leading_years"
  | "experience_years"
  | "contact";

export default function Portfolio() {
  const { t } = useTranslation();

  const [weather, setWeather] = useState<WeatherType>("clear");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDayType>("night");
  const [season, setSeason] = useState<SeasonType>("none");

  const [weatherMode, setWeatherMode] = useState<WeatherMode>("auto");
  const [timeOfDayMode, setTimeOfDayMode] = useState<TimeOfDayMode>("auto");
  const [seasonMode, setSeasonMode] = useState<SeasonMode>("auto");

  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDayType | undefined>();
  const [currentWeather, setCurrentWeather] = useState<WeatherType | undefined>();
  const [currentSeason, setCurrentSeason] = useState<SeasonType | undefined>();

  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<SectionsType | null>(null);
  const [showPlane, setShowPlane] = useState(false);
  const [activeSpecialEvents, setActiveSpecialEvents] = useState(false);

  const { playThunder, playFireworks, playClick, playNotification, toggleMute, muted } =
    useAmbientAudio(weather, timeOfDay);

  useEffect(() => {
    async function fetchData() {
      await fetchWeather();
      determineTimeOfDay();
      determineSeason();
    }
    fetchData();
  }, []);

  const fetchWeather = async () => {
    try {
      if (currentWeather) {
        setWeather(currentWeather);
        return;
      }

      setLoading(true);
      const response = await fetchCurrentWeather(BARCELONA_LAT, BARCELONA_LON);

      console.log("Weather response:", response);

      const selectedWeather = getWeatherMode(response.current_weather.weathercode);

      setCurrentWeather(selectedWeather);
      setWeather(selectedWeather);

      setSunrise(response.daily?.sunrise[0] ?? null);
      setSunset(response.daily?.sunset[0] ?? null);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setCurrentWeather("clear");
      setWeather("clear");
    } finally {
      setLoading(false);
    }
  };

  const determineTimeOfDay = () => {
    const hour = new Date().getHours();

    const sunriseHour = sunrise ? new Date(sunrise).getHours() : 8;
    const sunsetHour = sunset ? new Date(sunset).getHours() : 19;

    const startMorning = sunriseHour - 1;
    const endMorning = sunriseHour + 2;
    const startAfternoon = sunsetHour - 2;
    const endAfternoon = sunsetHour + 1;

    if (hour >= startMorning && hour < endMorning) {
      setTimeOfDay("morning");
      setCurrentTimeOfDay("morning");
      console.log("Setting time of day to morning");
    } else if (hour >= endMorning && hour < startAfternoon) {
      setTimeOfDay("day");
      setCurrentTimeOfDay("day");
      console.log("Setting time of day to day");
    } else if (hour >= startAfternoon && hour < endAfternoon) {
      setTimeOfDay("afternoon");
      setCurrentTimeOfDay("afternoon");
      console.log("Setting time of day to afternoon");
    } else {
      setTimeOfDay("night");
      setCurrentTimeOfDay("night");
      console.log("Setting time of day to night");
    }
  };

  const determineSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // 1–12
    const day = now.getDate(); // 1–31

    // Año nuevo: del 29 de diciembre al 2 de enero
    if ((month === 12 && day >= 29) || (month === 1 && day <= 2)) {
      setSeason("newYear");
      setCurrentSeason("newYear");
    }
    // Halloween: del 25 al 31 de octubre
    else if (month === 10 && day >= 25 && day <= 31) {
      setSeason("halloween");
      setCurrentSeason("halloween");
    }
    // Navidad: noviembre y diciembre (excepto 29–31 dic, ya cubiertos por newYear)
    else if ([11, 12].includes(month)) {
      setSeason("christmas");
      setCurrentSeason("christmas");
    }
    // Pascua: abril
    else if (month === 4) {
      setSeason("easter");
      setCurrentSeason("easter");
    }

    // Verano: junio, julio, agosto
    else if ([6, 7, 8].includes(month)) {
      setSeason("summer");
      setCurrentSeason("summer");
    }
    // Sin temporada especial
    else {
      setSeason("none");
      setCurrentSeason("none");
    }
  };

  const handleWeatherModeChange = (value: string) => {
    const v = value as WeatherMode;
    setWeatherMode(v);
    if (v.includes("clear")) setWeather("clear");
    else if (v.includes("cloudy")) setWeather("cloudy");
    else if (v.includes("rain")) setWeather("rain");
    else if (v.includes("thunderstorm")) setWeather("thunderstorm");
    else if (v.includes("snow")) setWeather("snow");
    else if (v.includes("auto")) setWeather(currentWeather ?? "clear");
  };

  const handleTimeOfDayModeChange = (value: string) => {
    const v = value as TimeOfDayMode;
    setTimeOfDayMode(v);
    if (v.includes("morning")) setTimeOfDay("morning");
    else if (v.includes("day")) setTimeOfDay("day");
    else if (v.includes("afternoon")) setTimeOfDay("afternoon");
    else if (v.includes("night")) setTimeOfDay("night");
    else if (v.includes("auto")) setTimeOfDay(currentTimeOfDay ?? "day");
  };

  const handleSeasonModeChange = (value: string) => {
    const v = value as SeasonMode;
    setSeasonMode(v);
    if (v.includes("christmas")) setSeason("christmas");
    else if (v.includes("newYear")) setSeason("newYear");
    else if (v.includes("easter")) setSeason("easter");
    else if (v.includes("summer")) setSeason("summer");
    else if (v.includes("halloween")) setSeason("halloween");
    else if (v.includes("none")) setSeason("none");
    else if (v.includes("auto")) setSeason(currentSeason ?? "none");
  };

  const getBackgroundComponent = () => {
    if (season === "newYear") return <NewYearScene playFireworks={playFireworks}></NewYearScene>;
    if (season === "halloween") return <HalloweenScene></HalloweenScene>;

    if (weather === "thunderstorm") {
      return <ThunderstormScene playThunder={playThunder} />;
    }

    return <DynamicScene weather={weather} timeOfDay={timeOfDay} />;
  };

  const handleStatClick = (statType: SectionsType) => {
    setActiveModal(statType);
    playClick();
  };

  const closeModal = () => {
    setActiveModal(null);
    playClick();
  };

  const handleShowPlane = () => {
    setShowPlane(!showPlane);
    if (!showPlane) playNotification();
  };

  const isModalOpen = activeModal !== null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A6FA5] to-[#2D4A6B]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">{t("loadingWeather")}</p>
        </div>
      </div>
    );
  }

  const experienceTimeline = t("experienceTimeline", {
    returnObjects: true,
  }) as unknown as import("@/data/experience").ExperienceEntry[];

  const fallbackComponent = null;

  const disabledDropdown = season === "newYear" || season === "halloween";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <ErrorBoundary fallback={fallbackComponent}>{getBackgroundComponent()}</ErrorBoundary>

      {/* Plane in background */}
      <ErrorBoundary fallback={fallbackComponent}>
        <AnimatePresence>{showPlane && <PlaneController />}</AnimatePresence>
      </ErrorBoundary>

      <ErrorBoundary fallback={fallbackComponent}>
        {/* Weather Mode Selector */}
        <div className="absolute top-4 right-4 z-30 hidden md:block">
          <Dropdown
            auto={t(currentWeather ?? "clear")}
            value={weatherMode}
            onValueChange={handleWeatherModeChange}
            disabled={disabledDropdown}
            options={[
              { label: `☀️ ${t("clear")}`, value: "clear" },
              { label: `☁️ ${t("cloudy")}`, value: "cloudy" },
              { label: `🌧️ ${t("rain")}`, value: "rain" },
              { label: `⚡ ${t("thunderstorm")}`, value: "thunderstorm" },
              { label: `❄️ ${t("snow")}`, value: "snow" },
            ]}
            placeholder={t("selectWeather")}
          />
        </div>

        {/* Day Time Mode Selector */}
        <div className="absolute top-15 right-4 z-30 hidden md:block">
          <Dropdown
            auto={t(currentTimeOfDay ?? "day")}
            value={timeOfDayMode}
            onValueChange={handleTimeOfDayModeChange}
            disabled={disabledDropdown}
            options={[
              { label: `🌅 ${t("morning")}`, value: "morning" },
              { label: `☀️ ${t("day")}`, value: "day" },
              { label: `☀️ ${t("afternoon")}`, value: "afternoon" },
              { label: `🌙 ${t("night")}`, value: "night" },
            ]}
            placeholder={t("selectMoment")}
          />
        </div>

        {/* Season Mode Selector */}
        {activeSpecialEvents && (
          <div className="absolute top-26 right-4 z-30 hidden md:block">
            <Dropdown
              auto={t(currentSeason ?? "none")}
              value={seasonMode}
              onValueChange={handleSeasonModeChange}
              disabled={false}
              options={[
                { label: `🐣 ${t("easter")}`, value: "easter" },
                { label: `☀️ ${t("summer")}`, value: "summer" },
                { label: `👻 ${t("halloween")}`, value: "halloween" },
                { label: `🎄 ${t("christmas")}`, value: "christmas" },
                { label: `🎉 ${t("newYear")}`, value: "newYear" },
                { label: `💼 ${t("none")}`, value: "none" },
              ]}
              placeholder={t("selectSeason")}
            />
          </div>
        )}
      </ErrorBoundary>

      <div className="absolute bottom-4 right-16 z-30 hidden md:block">
        <Button
          onClick={handleShowPlane}
          className={`${
            showPlane ? "bg-red-600 hover:bg-red-700" : "bg-[#2D4A6B] hover:bg-[#1F3447]"
          } shadow-lg transition-all duration-300 mt-3 float-right`}
        >
          <Plane className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-30">
        <Button
          onClick={() => toggleMute()}
          className={`${
            muted ? "bg-[#2D4A6B] hover:bg-[#1F3447]" : "bg-red-600 hover:bg-red-700"
          } shadow-lg transition-all duration-300 mt-3 float-right`}
        >
          {muted ? <VolumeOff className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Cards Container */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="relative w-full max-w-3xl" style={{ perspective: "1000px" }}>
          <ErrorBoundary fallback={fallbackComponent}>
            <HomeSection
              season={season}
              isModalOpen={isModalOpen}
              handleStatClick={handleStatClick}
              onClickAvatar={() => setActiveSpecialEvents(!activeSpecialEvents)}
            />
          </ErrorBoundary>

          {/* Modals */}
          <AnimatePresence>
            {activeModal === "contact" && (
              <ErrorBoundary fallback={fallbackComponent}>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ContactForm onClose={closeModal} />
                </div>
              </ErrorBoundary>
            )}

            {activeModal === "projects" && (
              <ErrorBoundary fallback={fallbackComponent}>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ProjectsGallery title={""} subtitle={""} onClose={closeModal} />
                </div>
              </ErrorBoundary>
            )}

            {activeModal === "companies" && (
              <ErrorBoundary fallback={fallbackComponent}>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Gallery
                    title={t("companiesTitle")}
                    subtitle={t("companiesSubtitle")}
                    options={companiesGallery}
                    onClose={closeModal}
                  />
                </div>
              </ErrorBoundary>
            )}

            {activeModal === "leading_years" && (
              <ErrorBoundary fallback={fallbackComponent}>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Gallery
                    title={""}
                    subtitle={""}
                    options={companiesGallery}
                    onClose={closeModal}
                  />
                </div>
              </ErrorBoundary>
            )}

            {activeModal === "experience_years" && (
              <ErrorBoundary fallback={fallbackComponent}>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <WorkTimeline
                    title={t("workTimelineTitle")}
                    subtitle={t("workTimelineSubtitle")}
                    options={experienceTimeline}
                    onClose={closeModal}
                  />
                </div>
              </ErrorBoundary>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
