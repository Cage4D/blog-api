import React from "react";

function Comment({ info }) {
  const formattedDate = new Date(info.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div>{info.name}</div>
      <div>{formattedDate}</div>
      <p>{info.content}</p>
    </div>
  );
}

export default Comment;