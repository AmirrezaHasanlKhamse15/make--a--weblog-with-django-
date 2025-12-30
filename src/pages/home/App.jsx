import { usePosts } from "../../hooks/usePosts"; // برای گرفتن پست‌ها از API
import { deletePost } from "../../services/post"; // سرویس حذف پست
import { useState } from "react";
import Header from "./../../components/Hedaer";
import { SiSpinrilla } from "react-icons/si";

const Home = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("user_role");
  // const posts = [
  //   {
  //     id: 1,
  //     title: "برنامه نویسی",
  //     body: "خوب میشد تلفیق AI با جهان",
  //     publishedAt: 2021,
  //   },
  //   {
  //     id: 1,
  //     title: "برنامه نویسی",
  //     body: "خوب میشد تلفیق AI با جهان",
  //     publishedAt: 2021,
  //   },
  //   {
  //     id: 1,
  //     title: "برنامه نویسی",
  //     body: "خوب میشد تلفیق AI با جهان",
  //     publishedAt: 2021,
  //   },
  //   {
  //     id: 1,
  //     title: "برنامه نویسی",
  //     body: "خوب میشد تلفیق AI با جهان",
  //     publishedAt: 2021,
  //   },
  // ];

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
        <p className="p-6 flex justify-between items-center bg-red-500 text-white/80 border-r-4 border-r-red-900 rounded-lg animate-pulse">
          <span className="mx-5">خطا در دریافت پست ها!</span>
        </p>
      </div>
    );

  // حذف پست
  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      // آپدیت لیست پست‌ها بعد از حذف
      alert("پست با موفقیت حذف شد!");
    } catch (err) {
      setError("خطا در حذف پست!");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--bg)]/70 min-h-screen py-5 px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--bgbg)] text-center mb-8">
            آخرین پست‌ها
          </h1>

          {/* دکمه افزودن پست برای نویسندگان */}
          <div className="text-center mb-6">
            {userRole === "writer" && (
              <a
                href="/create-post"
                className="px-6 py-3 bg-[#00A9A6] text-white font-semibold rounded-lg shadow-md hover:bg-[#009E9B] transition duration-300"
              >
                افزودن پست جدید
              </a>
            )}
          </div>

          {/* لیست پست‌ها */}
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/70 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-[#003B5C]">
                  {post.title}
                </h2>
                <p className="mt-4 text-gray-600">
                  {post.body.slice(0, 150)}...
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    تاریخ انتشار: {post.publishedAt}
                  </span>
                  <div className="">
                    <a
                      href={`/post.html?id=${post.id}`}
                      className="mx-2 text-[#00A9A6] font-medium hover:text-[#009E9B]"
                    >
                      مشاهده کامل
                    </a>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="mx-2 mt-2 p-2 bg-red-600 text-white rounded cursor-pointer"
                    >
                      حذف پست
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
