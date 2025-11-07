import React, { Suspense } from "react";
import Portfolio from "./pages/portfolio";
import "./lib/i18n";

export default () => (
  <Suspense fallback="loading">
    <Portfolio />
  </Suspense>
);
