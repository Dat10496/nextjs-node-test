import Link from "next/link";
import React from "react";

const MENU_BAR = [
  {
    title: "HOME PAGE",
    path: "/",
  },
  {
    title: "CREATE LEAD",
    path: "/create",
  },
];
function LeftSide() {
  return (
    <section className="border w-[20vw] flex flex-col justify-start gap-2 min-h-[100vh] py-2">
      <div className="flex justify-center items-center text-2xl font-semibold h-14 text-blue-400">
        Lead Management
      </div>
      {MENU_BAR.map((menu) => (
        <Link key={menu.title} href={menu.path}>
          <div className="border rounded flex justify-center items-center text-base h-12 font-semibold hover:cursor-pointer hover:shadow mb-2">
            {menu.title}
          </div>
        </Link>
      ))}
    </section>
  );
}

export default LeftSide;
