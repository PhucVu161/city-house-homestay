import { Link } from "react-router"

export default function EditProfile() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="w-screen flex justify-center">
      <form className="" onSubmit={handleSubmit}>
        <div className="mt-4 space-x-10">
          <label htmlFor="">Tên người dùng</label><br />
          <input className="border-2" type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label><br />
          <input className="border-2" type="text" />
        </div>
        <div>
          <Link to={"/"}>Hủy</Link>
          <button>Lưu</button>
        </div>
      </form>
    </div>
  )
}
