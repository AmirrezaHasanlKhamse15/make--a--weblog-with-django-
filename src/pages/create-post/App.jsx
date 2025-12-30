import { useState, useEffect } from "react";
import { createPost } from "../../services/post"; // سرویس افزودن پست
import Header from "../../components/Hedaer";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !localStorage.getItem("user_role") &&
      localStorage.getItem("user_role") != "writer"
    ) {
      window.location.href = "/home.html";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, body });
      alert("پست جدید با موفقیت اضافه شد!");
      // ریدایرکت به صفحه خانه یا لیست پست‌ها
      window.location.href = "/home";
    } catch (err) {
      setError("خطا در ارسال پست!");
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] bg-[var(--bg)]/50 flex flex-wrap justify-center items-start">
        <div className="w-full">
          <Header />
        </div>

        <div className="w-xl p-10 flex flex-wrap justify-center bg-[var(--bgbg)]/20 shadow-2xl rounded-xl">
          <h1 className="text-center text-[var(--bgbg)] text-3xl font-bold mb-4">
            افزودن پست جدید
          </h1>
          {error && (
            <p className="w-full mx- my-2 p-3 bg-red-500/20 text-red-900 border border-r-4  border-red-700 rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="w-full flex flex-wrap items-center">
              <label htmlFor="title" className="w-full text-white/80">
                عنوان پست
              </label>
              <input
                placeholder="عنوان پست را وراد کنید ..."
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full my-3 p-2 rounded border"
                required
              />
            </div>
            <div className="w-full flex flex-wrap items-center">
              <label htmlFor="body" className="w-full text-white/80">
                متن پست
              </label>
              <textarea
                placeholder="متن پست را وراد کنید ..."
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full my-3 p-2 rounded border"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[var(--primary)] text-white rounded-sm cursor-pointer hover:bg-[var(--primary)]/80"
            >
              ارسال پست
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
