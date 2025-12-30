// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { CiLight } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";

function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (localStorage.setItem("theme", "light") && "light")
  );
  useEffect(() => {
    if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") == "dark"
    ) {
      document.body.classList.remove("dark");
    } else if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") == "light"
    ) {
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  const isLogin = !!localStorage.getItem("access-token");
  return (
    <header className="my-5 mx-5 bg-[var(--bg)] text-[var(--text)] p-4 rounded-xl">
      <div className="w-full px-5 flex justify-between items-center">
        <div>
          <button
            onClick={() => {
              if (theme == "light") {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
                document.body.classList.toggle("dark");
              } else {
                setTheme("light");
                localStorage.setItem("theme", "light");
                document.body.classList.toggle("dark");
              }
            }}
          >
            {theme === "light" ? (
              <IoMoon className="p-1 size-9 rounded-full cursor-pointer hover:bg-[var(--primary)]/20" />
            ) : (
              <CiLight className="p-1 size-9 rounded-full cursor-pointer hover:bg-[var(--primary)]/20" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="mx-5 md:text-lg font-bold text-[var(--text)] hover:text-[var(--text)]/50">
            <a href="/home.html">خانه</a>
          </h1>
          <h1 className="mx-5 md:text-lg font-bold text-[var(--text)] hover:text-[var(--text)]/50">
            <a href="/admin.html">پنل مدیریت</a>
          </h1>
          <h1 className="mx-5 md:text-lg font-bold text-[var(--text)] hover:text-[var(--text)]/50">
            <a href="/create-post.html">ایجاد پست</a>
          </h1>
        </div>

        <div
          className={`px-4 py-2 text-white/70 rounded-md cursor-pointer transition-all duration-500 ${
            isLogin
              ? "bg-red-600 hover:bg-red-500"
              : "bg-[var(--primary)]/70 hover:bg-[var(--primary)]/40"
          }`}
        >
          {isLogin ? "خروج" : <a href="/login.html">ورود</a>}
        </div>
      </div>
    </header>
  );
}

export default Header;
