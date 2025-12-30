import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers, deleteUser, changeUserRole } from "../../services/users"; // سرویس گرفتن لیست کاربران
import Header from "../../components/Hedaer";
import { SiSpinrilla } from "react-icons/si";

const Admin = () => {
  const [error, setError] = useState(null);
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  // const users = [
  //   { id: 1, username: "erfan2007", name: "erfan", role: "writer" },
  // ];

  useEffect(() => {
    if (
       !localStorage.getItem("user_role") &&
      localStorage.getItem("user_role") != "admin"
    ) {
      window.location.href = "/home.html";
    }
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <p className="p-6 flex justify-between items-center bg-blue-500 text-white/80 border-r-4 border-r-blue-900 rounded-lg animate-pulse">
          <span className="mx-5">در حال بارگذاری ...</span>
          <SiSpinrilla className="animate-spin" />
        </p>
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <p className="p-6 bg-red-500 text-white/80 border-r-4 border-r-red-900 rounded-lg animate-pulse">
          خطا در دریافت اطلاعات کاربران!
        </p>
      </div>
    );


  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      alert("نویسنده با موفقیت حذف شد!");
    } catch (err) {
      setError("خطا در حذف نویسنده!");
    }
  };

  const handleChangeRole = async (userId, Role) => {
    try {
      let newRole = null;
      if (Role === "writer") {
        newRole = "admin";
      } else {
        newRole = "writer";
      }
      await changeUserRole(userId, newRole);
      alert("نویسنده با موفقیت حذف شد!");
    } catch (err) {
      setError("خطا در تغییر نقش نویسنده!");
    }
  };

  return (
    <>
      <Header />
      <div className="mx-10 text-center mt-10 p-6 bg-[var(--bg)] text-[var(--text)] border-t-4 border-t-[var(--primary)] rounded-xl">
        <h1 className="text-2xl font-bold mb-4">مدیریت نویسنده‌ها</h1>
        <div className="w-full flex justify-center items-center">
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <table className="w-full text-center text-[var(--text)] table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">#</th>
              <th className="p-2">نام</th>
              <th className="p-2">نام کاربری</th>
              <th className="p-2">نقش</th>
              <th className="p-2">عملیات</th>
              <th className="p-2">تغییر نقش</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white rounded px-2 py-1 cursor-pointer"
                  >
                    حذف
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleChangeRole(user.id, user.role)}
                    className="bg-blue-600 text-white rounded px-2 py-1 cursor-pointer"
                  >
                    تغییر نقش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
