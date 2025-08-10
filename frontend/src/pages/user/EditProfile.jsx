import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateCurrentUser } from "../../redux/slices/authSlice";

export default function EditProfile() {
  const profile = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(profile);
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateCurrentUser(user))
  }

  return (
    <div className="w-screen flex justify-center">
      <form className="">
        <div className="mt-4 space-x-10">
          <label htmlFor="">Tên người dùng</label><br />
          <input className="border-2" type="text" name="username" value={user.username} onChange={(e)=> {setUser(pre=>({...pre,"username": e.target.value,}))}}/>
        </div>
        <div>
          <label htmlFor="">Email</label><br />
          <input className="border-2" type="text" name="email" value={user.email} onChange={(e)=> {setUser(pre=>({...pre,"email": e.target.value,}))}} />
        </div>
        <div className="flex justify-evenly">
          <Link to={"/"}>Hủy</Link>
          <button onClick={handleSave}>Lưu</button>
        </div>
      </form>
    </div>
  )
}
