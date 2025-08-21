import {  useState } from "react";
import { SearchByHour, SearchHalfDay, SearchByDay } from "../../components";

const TYPE_SEARCH = [
  {
    key: "byHour",
    name: "Theo giờ",
  },
  {
    key: "halfDay",
    name: "Qua đêm",
  },
  {
    key: "byDay",
    name: "Theo ngày",
  },
];

export default function Search() {
  const [typeSelected, setTypeSelected] = useState("byHour");
  return (
    <div className="flex justify-center">
      <div className="w-400 h-30 bg-amber-50 rounded-xl">
        <div className="flex justify-center gap-4">
          {TYPE_SEARCH.map((type) => (
            <div
              className={`my-2 cursor-pointer hover:text-orange-500 ${
                type.key === typeSelected ? "border-b-2 border-brand-main" : ""
              }`}
              key={type.key}
              onClick={() => setTypeSelected(type.key)}
            >
              {type.name}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
        {typeSelected === "byHour" && <SearchByHour />}
        {typeSelected === "halfDay" && <SearchHalfDay />}
        {typeSelected === "byDay" && <SearchByDay />}  
          <button className="hover:bg-brand-main hover:text-brand-light w-30 rounded-full border-2 border-brand-accent">
            Tìm kiếm
          </button>        
        </div>
      </div>
    </div>
  );
}