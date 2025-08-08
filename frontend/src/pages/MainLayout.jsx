import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="pt-16 h-[900px]">
        <Outlet />        
      </div>
      <Footer />
    </div>
  );
}
