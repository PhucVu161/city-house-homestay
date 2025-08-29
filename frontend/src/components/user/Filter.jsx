import axios from "axios";
import { useEffect, useState } from "react";
import { AMENITIES } from "../../constants/amenities";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAmenities, setSelectedDistricts, setSelectedRanks } from "../../redux/slices/roomSlice";

export default function Filter() {
  const [ranks, setRanks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { selectedRanks, selectedDistricts, selectedAmenities } = useSelector((state) => state.room.filterRoom);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ranksRes, districtsRes] = await Promise.all([
          axios.get("http://localhost:4000/room-type/ranks"),
          axios.get("http://localhost:4000/house/districts"),
        ]);
        const ranksData = ranksRes.data;
        const districtsData = districtsRes.data;
        setRanks(ranksData);
        setDistricts(districtsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);
  const handleSelectRank = (value) =>{
    dispatch(setSelectedRanks(selectedRanks.includes(value) ? selectedRanks.filter(selectedRank=>selectedRank!==value) : [...selectedRanks, value]));
  }
  const handleSelectDistrict = (value) =>{
    dispatch(setSelectedDistricts(selectedDistricts.includes(value) ? selectedDistricts.filter(selectedDistrict=>selectedDistrict!==value) : [...selectedDistricts, value]));
  }
  const handleSelectAmenity = (value) =>{
    dispatch(setSelectedAmenities(selectedAmenities.includes(value) ? selectedAmenities.filter(selectedAmenty=>selectedAmenty!==value) : [...selectedAmenities, value]));
  }
  return (
    <div className="space-y-4 p-6">
      <div>Bộ lọc kết quả</div>
      <div>
        <div>Hạng phòng</div>
        <div className="grid grid-cols-2">
          {ranks.map((rank) => (
            <label key={rank}>
              <input type="checkbox" value={rank} name="rank" checked={selectedRanks.includes(rank)} onChange={()=>handleSelectRank(rank)} />
              {rank}
            </label>
          ))}          
        </div>
      </div>
      <div>
        <div>Khu vực</div>
        <div className="grid grid-cols-2">
          {districts.map((district) => (
            <label key={district}>
              <input type="checkbox" value={district} name="district" checked={selectedDistricts.includes(district)} onChange={()=>handleSelectDistrict(district)} />
              {district}
            </label>
          ))}          
        </div>
      </div>
      <div>
        <label htmlFor="">Tiện ích</label>
        <div className="grid grid-cols-2">
          {AMENITIES.map((amenity) => (
            <label key={amenity.label}>
              <input type="checkbox" value={amenity.label} name="amenity" checked={selectedAmenities.includes(amenity.label)} onChange={()=>handleSelectAmenity(amenity.label)} />
              <span className="text-3xl text-center">{amenity.icon}</span>
              <span className="text-sm">{amenity.label}</span>
            </label>
          ))}          
        </div>
      </div>
    </div>
  );
}
