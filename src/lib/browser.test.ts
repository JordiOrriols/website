import { describe, it, expect } from "vitest";
import { isSafari } from "./browser";

const SAFARI_MACOS =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
const SAFARI_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";
const CHROME_MACOS =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const CHROME_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.6367.113 Mobile/15E148 Safari/604.1";
const FIREFOX_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/126.0 Mobile/15E148 Safari/605.1.15";
const CHROME_ANDROID =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
const FIREFOX_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0";

describe("isSafari", () => {
  it("detects desktop Safari", () => {
    expect(isSafari(SAFARI_MACOS, "Apple Computer, Inc.")).toBe(true);
  });

  it("detects iOS Safari", () => {
    expect(isSafari(SAFARI_IOS, "Apple Computer, Inc.")).toBe(true);
  });

  it("does not flag desktop Chrome as Safari", () => {
    expect(isSafari(CHROME_MACOS, "Google Inc.")).toBe(false);
  });

  it("does not flag Chrome on iOS (CriOS) as Safari", () => {
    expect(isSafari(CHROME_IOS, "Apple Computer, Inc.")).toBe(false);
  });

  it("does not flag Firefox on iOS (FxiOS) as Safari", () => {
    expect(isSafari(FIREFOX_IOS, "Apple Computer, Inc.")).toBe(false);
  });

  it("does not flag Chrome on Android as Safari", () => {
    expect(isSafari(CHROME_ANDROID, "Google Inc.")).toBe(false);
  });

  it("does not flag Firefox on Windows as Safari", () => {
    expect(isSafari(FIREFOX_WINDOWS, "")).toBe(false);
  });
});
