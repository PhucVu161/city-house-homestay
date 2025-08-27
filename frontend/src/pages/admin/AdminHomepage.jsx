

export default function AdminHomepage() {
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl font-bold text-brand-warm mb-10">Tổng quan</div>
      {/* Thanh tìm kiếm, thêm và sắp xếp danh sách */}
      <div className="flex items-center gap-6">
        <div className="grow border-2 border-gray-300 rounded-md p-2">
          Tìm kiếm
        </div>
        <button
          className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md"
        >
          <span>Thêm người dùng</span>
        </button>
        <div>
          <span>Sắp xếp: </span>
          <span className="p-2 bg-gray-200 rounded-md">Gần đây nhất</span>
        </div>
      </div>
      <div>
        <div>Số đơn chờ xác nhận</div>
        <div>Số đơn đã xác nhận</div>
        <div>Số đơn đã hủy</div>
        <div>Tổng số đơn đặt phòng</div>
        <div>Số lượng phòng phòng</div>
        <div>Số lượng người dùng</div>
      </div>
    </div>
  )
}
