import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHouse, fetchHouses } from "../../redux/slices/houseSlice";
import { HouseForm } from "../../components";

export default function House() {
  const houses = useSelector((state) => state.house.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHouses());
  }, []);

  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [formData, setFormData] = useState({ type: "", house: {} });
  const handleAdd = () => {
    setIsDisplayForm(true);
    setFormData(() => ({ type: "Thêm", house: {} }));
  };
  const handleUpdate = (house) => {
    setIsDisplayForm(true);
    setFormData({ type: "Sửa", house });
  };

  return (
    <div className="flex flex-col h-full p-4 relative">
      <div>House</div>
      <div className="grow">
        {houses.map((house) => (
          <div className="flex justify-between" key={house._id}>
            <div>{house.code}</div>
            <div>{house.address}</div>
            <div className="space-x-4">
              <button onClick={()=>handleUpdate(house)}>Sửa</button>
              <button onClick={()=>{dispatch(deleteHouse(house._id))}}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <button className="flex justify-center" onClick={handleAdd}>
        Thêm
      </button>

      {isDisplayForm && (
        <HouseForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
      )}
    </div>
  );
}
