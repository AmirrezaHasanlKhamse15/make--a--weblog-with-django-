import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/post";
import Header from "./../../components/Hedaer";
import { SiSpinrilla } from "react-icons/si";

const PostDetail = () => {
  const querySearch = new URLSearchParams(window.location.search); // گرفتن id از URL
  const id = querySearch.get("id");

  // const post = { id: 1, title: "554", body: "dsfds", publishedAt: 2021 };

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["post", id], queryFn: () => getPosts(id) });

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
          <span className="mx-5">خطا در دریافت پست !</span>
        </p>
      </div>
    );

  return (
    <>
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--bg)]/70 min-h-screen py-5 px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="max-w-full mx-5">
          <h1 className="text-4xl font-bold text-[var(--bgbg)] text-center mb-6">
            {post.title}
          </h1>
          <div className="bg-white/70 p-8 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500">
              تاریخ انتشار: {post.publishedAt}
            </p>
            <div className="mt-6 text-lg text-gray-800">{post.body}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
