import api from "./axios";

// get posts
export const getPosts = async () => {
  const res = await api.get("/posts/");
  return res.data;
};

// حذف پست// delete post
export const deletePost = async (postId) => {
  await api.delete(`/posts/${postId}`);
};

// ارسال پست جدید // create post
export const createPost = async (postData) => {
  await api.post("/posts", postData);
};
