import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomById } from "../redux/slices/roomSlice";
import { GiPositionMarker } from "react-icons/gi";
import { MdStar } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { InfoBooking } from "../components";

export default function RoomDetail() {
  //lấy thông tin phòng lưu trong redux
  const { id } = useParams();
  const room = useSelector((state) => state.room.currentRoom);
  //state cho hiển thị ảnh
  const [mainImage, setMainImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);

  //lấy thông tin phòng lưu vào redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomById(id));
  }, [id]);
  //set các ảnh hiển thị
  useEffect(() => {
    if (room && room.images && room.images.length > 0) {
      setMainImage(room.images[0]);
      setVisibleImages(room.images.slice(0, 3));
    }
  }, [room]);
  //loading khi call api
  if (!room) {
    return <div className="px-36 pt-16">Đang tải thông tin phòng...</div>;
  }
  //chuyển các hình hiển thị trong sidebar ảnh
  const handlePrev = () => {
    if (startIndex > 0) {
      const newStart = startIndex - 1;
      setStartIndex(newStart);
      setVisibleImages(room.images.slice(newStart, newStart + 3));
    }
  };
  const handleNext = () => {
    if (startIndex + 3 < room.images.length) {
      const newStart = startIndex + 1;
      setStartIndex(newStart);
      setVisibleImages(room.images.slice(newStart, newStart + 3));
    }
  };

  return (
    <div className="flex flex-col bg-brand-light px-36 pt-16">
      {/* Tiêu đề */}
      <div>
        <h1 className="text-5xl">Phòng {room.roomCode}</h1>
        <div>
          <div className="flex items-center my-2 gap-1">
            <GiPositionMarker />
            <span className="">{room.house.district}</span>
            <span className="mx-3 text-gray-500">|</span>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <MdStar key={index} className="text-amber-400" />
              ))}
            </div>
            <span>(336 reviews)</span>
          </div>
        </div>
      </div>
      {/* Phần thân */}
      <div className="flex gap-16">
        <div className="grow">
          {/* Ảnh phòng */}
          <div>
            {/* Ảnh chính hiển thị */}
            <img
              src={`http://localhost:4000/uploads/${mainImage}`}
              alt=""
              className="w-full h-[500px] rounded-md"
            />
            {/* Sidebar ảnh nhỏ */}
            <div className="flex items-center gap-4 relative justify-center w-full my-4">
              <button
                onClick={handlePrev}
                className="bg-white rounded-full shadow p-1 hover:bg-gray-100"
              >
                <MdChevronLeft size={24} />
              </button>

              {visibleImages.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/uploads/${img}`}
                  alt={`preview-${index}`}
                  className="w-59 h-33 object-cover rounded cursor-pointer border hover:border-blue-500"
                  onMouseEnter={() => setMainImage(img)}
                />
              ))}
              <button
                onClick={handleNext}
                className="bg-white rounded-full shadow p-1 hover:bg-gray-100"
              >
                <MdChevronRight size={24} />
              </button>
            </div>
          </div>
          {/* Tiện ích phòng */}
          <div className="text-brand-accent mt-8 border-2 border-brand-accent">
            <h1 className="my-4 font-bold text-brand-dark text-3xl">Tiện ích</h1>
            <div></div>
          </div>
          {/* Mô tả phòng */}
          <div className="text-brand-accent mt-8">
            <h1 className="my-4 font-bold text-brand-dark text-3xl">Mô tả</h1>
            <span>{`Căn homestay này thuộc hàng phòng ${room.roomType.rank} của chúng tôi, và nằm ở vị trí ${room.house.address}. `}</span>
            <span>{room.description}</span>
          </div>
          {/* Mức giá phòng */}
          <div className="text-brand-accent mt-8 border-t-2 border-brand-accent/30">
            <h1 className="my-4 font-bold text-brand-dark text-3xl">Mức giá</h1>
          </div>
          {/* Đánh giá phòng */}
          <div className="text-brand-accent mt-8 border-t-2 border-brand-accent/30">
            <h1 className="my-4 font-bold text-brand-dark text-3xl">Đánh giá</h1>
          </div>
        </div>
        {/* Form thông tin đặt phòng */}
              <InfoBooking />
      </div>
    </div>
  );
}
