import { useEffect } from "react";
import { Search, RoomCard, Filter } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/slices/roomSlice";

export default function SearchRoom() {
  const rooms = useSelector((state) => state.room.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRooms());
  }, []);
  return (
    <div className="flex flex-col">
      <Search />
      <div className="flex mx-10 mt-4 gap-4">
        <div className="w-70 bg-brand-light rounded-2xl">
          <Filter />
        </div>
        <div className="grow bg-brand-light rounded-2xl">
          {rooms.map((room) => (
            <div key={room._id} className="flex m-6">
              <RoomCard room={room} />
              <div className="flex flex-col grow text-right justify-between">
                <div className="">
                  <div className="text-2xl">300.000đ</div>
                  <div>Giá cho 1 giờ</div>
                </div>
                <button className="border-2 border-brand-accent rounded-4xl px-6 py-3 self-end hover:text-brand-light hover:bg-brand-accent transition duration-200">
                  Đặt phòng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
