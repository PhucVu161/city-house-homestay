import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, updateRoom } from "../../redux/slices/roomSlice";
import { fetchHouses } from "../../redux/slices/houseSlice";
import { fetchRoomTypes } from "../../redux/slices/roomTypeSlice";
import { AMENITIES } from "../../constants/amenities";
import axios from "axios";
import { TbLibraryPhoto } from "react-icons/tb";

export default function RoomForm({ setIsDisplayForm, formData }) {
  //gọi api lấy danh sách house và roomType lưu vào redux để gắn vào option trong selector
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.house.list);
  const roomTypes = useSelector((state) => state.roomType.list);
  useEffect(() => {
    dispatch(fetchHouses());
    dispatch(fetchRoomTypes());
  }, []);

  //Khởi tạo các state của các trường của form
  const room = formData.room;
  const [roomCode, setRoomCode] = useState(room.roomCode);
  const [style, setStyle] = useState(room.style);
  const [house, setHouse] = useState(room.house._id || "");
  const [roomType, setRoomType] = useState(room.roomType._id || "");
  const [description, setDescription] = useState(room.description);
  const [wifi, setWifi] = useState(room.wifi);
  const [amenities, setAmenities] = useState(room.amenities);
  const [images, setImages] = useState(room.images || []);
  //xử lý chọn hay không chọn tiện ích amenity
  const toggleAmenity = (label) => {
    setAmenities((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  //Xử lý chọn ảnh
  const selectImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };
  //xử lý xóa ảnh
  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview); // cleanup
      updated.splice(index, 1);
      return updated;
    });
  };
  //xử lý upload ảnh lên server
  const uploadImages = async (files) => {
    if (!files || files.length === 0) return []; //kiểm trả ảnh có ảnh nào thêm mới không nếu không trả về rỗng

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.files.map((item) => item.filename);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      throw error;
    }
  };
  //xử lý thêm và sửa
  const handleClick = async () => {
    const oldImages = images.filter((img) => !img.file); //lọc các ảnh cũ không có file hay preview chỉ có tên ảnh đã lưu ở server
    const newImageFiles = images
      .filter((img) => img.file)
      .map((img) => img.file); //lọc các ảnh mới thêm vào lấy file ảnh
    const newImages = await uploadImages(newImageFiles); // upload ảnh
    const roomForm = {
      roomCode,
      style,
      house,
      roomType,
      description,
      wifi,
      amenities,
      images: [...oldImages, ...newImages],
    };
    if (formData.type === "Thêm") {
      dispatch(addRoom(roomForm));
    }
    if (formData.type === "Sửa") {
      console.log("Room update payload:", {
        id: formData.room._id,
        updatedData: roomForm,
      });
      dispatch(updateRoom({ id: formData.room._id, updatedData: roomForm }));
    }
    setIsDisplayForm(false);
  };

  return (
    <div className="flex flex-col rounded-xl w-[930px] h-[660px] overflow-y-auto z-10 bg-white p-8 space-y-6">
      {(formData.type === "Thêm") && <div className="self-center text-3xl font-bold text-yellow-600">Thêm phòng mới</div>}
      {(formData.type === "Sửa") && <div className="self-center text-3xl font-bold text-yellow-600">Sửa thông tin phòng</div>}

      <div className="grow space-y-6 text-sm text-gray-700">
        {/* Tên & Phong cách */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="roomCodeTxt" className="block font-medium mb-1">Tên phòng</label>
            <input
              id="roomCodeTxt"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="styleTxt" className="block font-medium mb-1">Phong cách</label>
            <input
              id="styleTxt"
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Tòa nhà & Hạng phòng */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="houseSelector" className="block font-medium mb-1">Tòa nhà</label>
            <select
              id="houseSelector"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">--Chọn tòa nhà--</option>
              {houses.map((h) => (
                <option key={h._id} value={h._id}>{h.code}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roomTypeSelector" className="block font-medium mb-1">Hạng phòng</label>
            <select
              id="roomTypeSelector"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">--Chọn hạng phòng--</option>
              {roomTypes.map((rt) => (
                <option key={rt._id} value={rt._id}>{rt.rank}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label htmlFor="descriptionTxt" className="block font-medium mb-1">Mô tả</label>
          <textarea
            id="descriptionTxt"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Wifi */}
        <div className="space-y-2">
          <div className="font-semibold text-gray-800">Thông tin Wifi</div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="wifiNameTxt" className="block mb-1">Tên Wifi</label>
              <input
                id="wifiNameTxt"
                type="text"
                value={wifi.name || ""}
                onChange={(e) => setWifi((pre) => ({ ...pre, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="wifiPassTxt" className="block mb-1">Mật khẩu</label>
              <input
                id="wifiPassTxt"
                type="text"
                value={wifi.pass || ""}
                onChange={(e) => setWifi((pre) => ({ ...pre, pass: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Tiện ích */}
        <div>
          <div className="font-semibold mb-2">Tiện ích</div>
          <div className="grid grid-cols-4 gap-4">
            {AMENITIES.map(({ label, icon }) => (
              <label
                key={label}
                className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition ${
                  amenities.includes(label)
                    ? "bg-yellow-100 border-yellow-400"
                    : "bg-white border-gray-300"
                }`}
                onClick={() => toggleAmenity(label)}
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(label)}
                  onChange={() => toggleAmenity(label)}
                  className="hidden"
                />
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ảnh */}
        <div>
          <div className="font-semibold mb-2">Ảnh phòng</div>
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img.preview || "http://localhost:4000/uploads/" + img}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <label
            htmlFor="imageUpload"
            className="flex w-36 items-center gap-2 mt-3 hover:text-brand-warm cursor-pointer transition"
          >
            <TbLibraryPhoto size={24} />
            <span>Chọn thêm ảnh</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            multiple
            accept="image/*"
            onChange={selectImage}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-end gap-4 pt-4">
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
