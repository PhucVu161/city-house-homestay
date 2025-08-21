import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHouse, updateHouse } from "../../redux/slices/houseSlice.js";
import { HOUSE_LABELS } from "../../constants/houseLabel.js";

export default function HouseForm({ setIsDisplayForm, formData }) {
  //houseLabel giống house trong formData nhưng chỉ có trường giống key trong HOUSE_LABELS đã định nghĩa
  const houseLabel = HOUSE_LABELS.reduce((form, label) => {
    form[label.key] = formData.house[label.key];
    return form;
  }, {});
  //lưu trạng thái form đang nhập với giá trị khởi tạo houseLabel
  const [houseForm, setHouseForm] = useState(houseLabel);
  //xử lý thêm và sửa
  const dispatch = useDispatch();
  const handleClick = () => {
    if (formData.type === "Thêm") {
      dispatch(addHouse(houseForm));
    }
    if (formData.type === "Sửa") {
      dispatch(updateHouse({ id: formData.house._id, updatedData: houseForm }));
    }
    setIsDisplayForm(false);
  };

  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl w-[700px] h-[400px] z-10 bg-white">
      <div>House Form</div>
      <div className="grow">
        {HOUSE_LABELS.map((label) => (
          <div key={label.key}>
            <label htmlFor={label.key}>{label.name}</label>
            <input
              id={label.key}
              type="text"
              value={houseForm[label.key] || ""}
              onChange={(e) => {
                setHouseForm((pre) => ({
                  ...pre,
                  [label.key]: e.target.value,
                }));
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        <button onClick={() => setIsDisplayForm(false)}>Hủy</button>
        <button onClick={handleClick}>{formData.type}</button>
      </div>
    </div>
  );
}
