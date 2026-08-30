import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_NAMESPACE = "fly-with-me";
const CAL_LINK = "jordiorriols/fly-with-me";

export default function FlyBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div data-testid="fly-booking-embed">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "600px", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
