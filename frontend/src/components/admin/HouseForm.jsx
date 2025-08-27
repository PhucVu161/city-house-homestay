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
<div className="flex flex-col rounded-xl w-[750px] h-[600px] z-10 bg-white p-6 space-y-6 shadow-lg overflow-y-auto">
  {(formData.type === "Thêm") && <div className="self-center text-2xl font-bold text-yellow-600">Thêm tòa nhà mới</div>}
  {(formData.type === "Sửa") && <div className="self-center text-2xl font-bold text-yellow-600">Sửa thông tin tòa nhà</div>}

  <div className="grow space-y-4 text-sm text-gray-700">
    {HOUSE_LABELS.map((label) => (
      <div key={label.key}>
        <label htmlFor={label.key} className="block font-medium mb-1">
          {label.name}
        </label>
        <input
          id={label.key}
          type="text"
          value={houseForm[label.key] || ""}
          onChange={(e) =>
            setHouseForm((pre) => ({
              ...pre,
              [label.key]: e.target.value,
            }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    ))}
  </div>

  <div className="flex justify-end gap-4 pt-2">
    <button
      onClick={() => setIsDisplayForm(false)}
      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
    >
      Hủy
    </button>
    <button
      onClick={handleClick}
      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
    >
      {formData.type}
    </button>
  </div>
</div>
  );
}
