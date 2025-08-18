import {  useState } from "react";
import SearchByHour from "../components/SearchByHour";
import SearchByNight from "../components/SearchByNight";
import SearchByDay from "../components/SearchByDay";

const TYPE_SEARCH = [
  {
    key: "byHour",
    name: "Theo giờ",
  },
  {
    key: "byNight",
    name: "Qua đêm",
  },
  {
    key: "byDay",
    name: "Theo ngày",
  },
];

export default function SearchRoom() {
  const [typeSelected, setTypeSelected] = useState("byHour");
  return (
    <div className="flex justify-center">
      <div className="w-400 h-30 bg-amber-50 rounded-xl">
        <div className="flex justify-center gap-4">
          {TYPE_SEARCH.map((type) => (
            <div
              className={`my-2 cursor-pointer hover:text-orange-500 ${
                type.key === typeSelected ? "border-b-2 border-orange-400" : ""
              }`}
              key={type.key}
              onClick={() => setTypeSelected(type.key)}
            >
              {type.name}
            </div>
          ))}
        </div>
        {typeSelected === "byHour" && <SearchByHour />}
        {typeSelected === "byNight" && <SearchByNight />}
        {typeSelected === "byDay" && <SearchByDay />}
      </div>
    </div>
  );
}
