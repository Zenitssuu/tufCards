import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "All Cards",
      slug: "/all-posts",
    },
  ];
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-lg bg-[#f3e0cf]">
      <nav className="flex items-center w-full">
        <ul className="flex w-9/12 justify-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className=" text-gray-700 inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
