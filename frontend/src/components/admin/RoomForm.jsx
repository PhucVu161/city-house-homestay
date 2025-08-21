import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, updateRoom } from "../../redux/slices/roomSlice";
import { fetchHouses } from "../../redux/slices/houseSlice";
import { fetchRoomTypes } from "../../redux/slices/roomTypeSlice";
import { AMENITIES } from "../../constants/amenities";
import axios from "axios";

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
    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl w-[1200px] h-[630px] z-10 bg-white">
      <div>Room Form</div>
      {/* form các thuộc tính cơ bản của roomLabel */}
      <div className="grow">
        {/* Nhập tên phòng */}
        <div>
          <label htmlFor="roomCodeTxt">Tên phòng</label>
          <input
            id="roomCodeTxt"
            type="text"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
            }}
          />
        </div>
        {/* Nhập tòa nhà của phòng */}
        <div>
          <label htmlFor="houseSelector">Tòa nhà</label>
          <select
            name="houseSelector"
            id="houseSelector"
            value={house}
            onChange={(e) => {
              setHouse(e.target.value);
            }}
          >
            <option value="">--Chọn tòa nhà--</option>
            {houses.map((house) => (
              <option key={house._id} value={house._id}>
                {house.code}
              </option>
            ))}
          </select>
        </div>
        {/* Nhập hạng phòng */}
        <div>
          <label htmlFor="roomTypeSelector">Hạng phòng</label>
          <select
            name="roomTypeSelector"
            id="roomTypeSelector"
            value={roomType}
            onChange={(e) => {
              setRoomType(e.target.value);
            }}
          >
            <option value="">--Chọn hạng phòng--</option>
            {roomTypes.map((roomType) => (
              <option key={roomType._id} value={roomType._id}>
                {roomType.rank}
              </option>
            ))}
          </select>
        </div>
        {/* Nhập mô tả về phòng */}
        <div>
          <label htmlFor="descriptionTxt">Mô tả</label>
          <input
            className="w-[460px]"
            id="descriptionTxt"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        {/* Nhập thông tin wifi */}
        <div>Wifi</div>
        <div>
          <label htmlFor="wifiNameTxt">Tên wifi</label>
          <input
            className="w-[460px]"
            id="wifiNameTxt"
            type="text"
            value={wifi.name || ""}
            onChange={(e) => {
              setWifi((pre) => ({ ...pre, name: e.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="wifiPassTxt">Mật khẩu</label>
          <input
            className="w-[460px]"
            id="wifiPassTxt"
            type="text"
            value={wifi.pass || ""}
            onChange={(e) => {
              setWifi((pre) => ({ ...pre, pass: e.target.value }));
            }}
          />
        </div>
        {/* Chọn các tiện ích của phòng */}
        <div className="grid grid-cols-5 gap-4 text-sm">
          {AMENITIES.map(({ label, icon }) => (
            <label
              key={label}
              className={`flex items-center gap-3 p-2 border rounded-lg cursor-pointer ${
                amenities.includes(label)
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white"
              }`}
              onClick={() => toggleAmenity(label)}
            >
              <input
                type="checkbox"
                id={`amenity-${label}`}
                name="amenities"
                checked={amenities.includes(label)}
                onChange={() => toggleAmenity(label)}
                className=""
              />
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </label>
          ))}
        </div>
        {/* Chọn các ảnh về phòng để đăng lên */}
        <div>
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img.preview || "http://localhost:4000/uploads/" + img} // nếu là URL từ server
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded"
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
          <label htmlFor="imageUpload">Chọn thêm ảnh</label>
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
      <div className="flex justify-around">
        <button onClick={() => setIsDisplayForm(false)}>Hủy</button>
        <button onClick={handleClick}>{formData.type}</button>
      </div>
    </div>
  );
}
