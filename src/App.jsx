import React, { Suspense } from "react";
import Portfolio from "./pages/portfolio";
import "./lib/i18n";
import { ErrorBoundary } from "react-error-boundary";

export default () => (
  <Suspense fallback="loading">
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Portfolio />
    </ErrorBoundary>
  </Suspense>
);
