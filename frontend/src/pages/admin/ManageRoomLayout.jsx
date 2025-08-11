import { Outlet, Link } from "react-router";

export default function ManageRoomLayout() {
  return (
    <div className="space-y-6">
      <div>ManageRoomLayout</div>
      <div className="flex gap-6">
        <Link to={""}>Manage Room</Link>
        <Link to={"house"}>Manage House</Link>
        <Link to={"type"}>Manage Room Type</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
