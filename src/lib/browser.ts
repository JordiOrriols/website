// Detects desktop/iOS Safari specifically, excluding other WebKit-based browsers on iOS
// (Chrome/Firefox/Edge on iOS all report "Safari" in their user agent too).
export function isSafari(userAgent?: string, vendor?: string): boolean {
  const hasNavigator = typeof navigator !== "undefined";
  const ua = userAgent ?? (hasNavigator ? navigator.userAgent : "");
  const ven = vendor ?? (hasNavigator ? navigator.vendor : "");

  const isAppleVendor = ven.toLowerCase().includes("apple");
  const isSafariUA = ua.toLowerCase().includes("safari");
  const isOtherBrowser = /chrome|chromium|crios|fxios|edgios|edg\/|opr\/|opios|android/i.test(ua);

  return isAppleVendor && isSafariUA && !isOtherBrowser;
}
