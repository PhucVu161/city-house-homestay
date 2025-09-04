import { Header, Footer } from "../components";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="pt-18">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
