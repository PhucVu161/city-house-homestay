import { IoHourglassOutline } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import { WiDayCloudy } from "react-icons/wi";

export const BOOKING_TYPES = [
  {
    key: "byHour",
    name: "Theo giờ",
    icon: <IoHourglassOutline />,
  },
  {
    key: "halfDay",
    name: "Qua đêm",
    icon: <GiNightSleep />,
  },
  {
    key: "byDay",
    name: "Theo ngày",
    icon: <WiDayCloudy />
  },
];