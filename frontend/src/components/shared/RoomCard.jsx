import React from "react";

export default function RoomCard({ room }) {
  return (
    <div className="flex cursor-pointer hover:brightness-75">
      <img
        src={`http://localhost:4000/uploads/${room.images[0]}`}
        alt=""
        className="w-[360px] h-[220px] rounded-2xl"
      />
      <div className="ml-6 space-y-[4px] w-[630px] text-md">
        <div className="text-3xl">{room.roomCode}</div>
        <div>{`Hạng phòng: ${room.roomType.rank}`}</div>
        <div>{`Địa chỉ: ${room.house.address}`}</div>
        <div>
          <div>Tiện ích: </div>
          <div className="grid grid-cols-3 ml-3">
            {room.amenities.map((amenity) => (
              <div key={amenity}>• {amenity}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
