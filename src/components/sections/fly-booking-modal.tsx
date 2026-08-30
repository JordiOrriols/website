import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/ui/modal";
import FlyBooking from "./fly-booking";

interface FlyBookingModalProps {
  onClose: () => void;
}

// Wider than the default modal so Cal.com's month view can fit day + time slots side by side.
export default function FlyBookingModal({ onClose }: FlyBookingModalProps) {
  const { t } = useTranslation();

  return (
    <Modal title={t("flyWithMeBookingLabel")} onClose={onClose} maxWidth="max-w-5xl">
      <FlyBooking />
    </Modal>
  );
}
