import { Link } from "react-router"
import { useDispatch } from "react-redux"
import { changePassword } from "../../redux/slices/authSlice";

export default function EditPassword() {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    }
    try {
      const result = await dispatch(
        changePassword(updateData)
      ).unwrap();//unwrap để đợi thực hiện xong

      alert(result); // ví dụ: "Password updated successfully"
    } catch (error) {
      alert(error); // ví dụ: "Old password is incorrect"
    }
  }

  return (
    <div className="w-screen flex justify-center">
      <form className="" onSubmit={handleSubmit}>
        <div className="mt-4 space-x-10">
          <label htmlFor="">Mật khẩu cũ</label><br />
          <input className="border-2" type="text" name="oldPassword" required/>
        </div>
        <div>
          <label htmlFor="">Mật khẩu mới</label><br />
          <input className="border-2" type="text" name="newPassword" required />
        </div>
        <div className="flex justify-evenly">
          <Link to={"/"}>Hủy</Link>
          <button type="submit">Lưu</button>
        </div>
      </form>
    </div>
  )
}
