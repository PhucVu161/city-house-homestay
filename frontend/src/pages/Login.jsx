

export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[400px] h-[300px] rounded-md bg-gray-200 flex flex-col justify-center items-center gap-3">
        <div>
          <label htmlFor="">Username</label><br />
          <input className="border-2 border-gray-400" type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label><br />
          <input className="border-2 border-gray-400" type="text" />
        </div>
        <button className="bg-sky-500 w-46 active:bg-sky-300">Login</button>
      </div>
    </div>
  )
}
