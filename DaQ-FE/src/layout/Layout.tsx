import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="bg-gray-950">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet />
        <div className=" bg-gray-950 text-white">
          footer
          <h1>ABC</h1>
          <h1>ABC</h1>
          <h1>ABC</h1>
          <h1>ABC</h1>
          <h1>ABC</h1>
          <h1>ABC</h1>
          <h1>ABC</h1>
        </div>
      </div>
    </div>
  );
}
