import { useState } from "react";
import { login } from "../../services/auth";
import Header from "../../components/Hedaer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // هندل ارسال فرم
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);

      // ذخیره کردن توکن JWT در localStorage
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user_role", response.data.role); // ذخیره نقش

      // هدایت به صفحه اصلی
      window.location.href("/home");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-wrap justify-center items-start bg-[var(--bg)]/50 text-[var(--text)]">
        <div className="w-full">
          <Header />
        </div>
        <div className="max-w-xl p-6 flex justify-center flex-wrap bg-[var(--bgbg)]/20 shadow-2xl rounded-xl">
          <h1 className="w-full text-3xl text-center text-[var(--bgbg)] font-bold my-5">
            ورود به سیستم
          </h1>
          {error && (
            <p className="w-full mx-6 my-2 p-3 bg-red-500/20 text-red-900 border border-r-4  border-red-700 rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleLogin} className="w-full p-6 space-y-4">
            <div className="w-full justify-center flex-wrap">
              <label htmlFor="email" className="w-full text-sm text-white/80">
                نام کاربری
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full my-3 p-2 rounded border"
                required
              />
            </div>
            <div className="w-full flex justify-center flex-wrap">
              <label
                htmlFor="password"
                className="w-full text-sm text-white/80"
              >
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full my-3 p-2 rounded border"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 p-3 bg-[var(--primary)] text-white rounded cursor-pointer hover:bg-[var(--primary)]/80"
            >
              ورود
            </button>
            <div className="my-2 mx-2 flex justify-between items-center text-sm text-[var(--primary)]">
              <span>حساب کاربری دارید؟</span>
              <a href="/register.html" className="hover:text-[var(--primary)]/80">ثبت نام</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
