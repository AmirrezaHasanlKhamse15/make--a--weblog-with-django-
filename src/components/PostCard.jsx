// src/components/PostCard.jsx
import React from 'react';

function PostCard({ title, content, author, date }) {
  return (
    <div className="bg-white p-4 mb-4 shadow-md rounded">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{content}</p>
      <div className="text-right">
        <small>By {author} on {date}</small>
      </div>
    </div>
  );
}

export default PostCard;
