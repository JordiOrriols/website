import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/ui/modal";
import FlyBooking from "./fly-booking";

interface FlyBookingModalProps {
  onClose: () => void;
}

// Wider/taller than the default modal, with minimal padding, so Cal.com's calendar
// can use as much of the modal as possible (day + time slots side by side).
export default function FlyBookingModal({ onClose }: FlyBookingModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("flyWithMeBookingLabel")}
      onClose={onClose}
      maxWidth="max-w-5xl"
      maxHeight="max-h-[92vh]"
      headerClassName="px-4 pt-4 pb-1 md:px-6 md:pt-6 md:pb-2"
      contentClassName="px-1 pb-1 md:px-2 md:pb-2"
    >
      <FlyBooking />
    </Modal>
  );
}
