import React, { Suspense } from "react";
import Portfolio from "./pages/portfolio";
import FlyWithMe from "./pages/vuela-conmigo";
import "./lib/i18n";
import { ErrorBoundary } from "react-error-boundary";

const segmentsFlyWithMe = ["vuela-conmigo", "fly-with-me", "vola-amb-mi"];

const isFlyWithMeRoute = () => {
  if (typeof window === "undefined") return false;
  // Matches "/vuela-conmigo" with or without a leading locale segment (e.g. "/en/vuela-conmigo"),
  // so the hidden page is reachable even if someone guesses a locale-prefixed URL.
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segmentsFlyWithMe.includes(segments[segments.length - 1]);
};

export default () => (
  <Suspense fallback="loading">
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {isFlyWithMeRoute() ? <FlyWithMe /> : <Portfolio />}
    </ErrorBoundary>
  </Suspense>
);
