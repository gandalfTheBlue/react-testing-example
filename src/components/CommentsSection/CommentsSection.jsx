import React from "react";

const CommentsSection = ({ comments }) => {
  if (comments.length === 0) {
    return <h2>No Comments</h2>;
  }
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.comment}</div>
      ))}
    </div>
  );
};

export default CommentsSection;
