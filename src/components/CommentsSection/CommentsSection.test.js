import React from "react";
import { render, screen } from "@testing-library/react";
import CommentsSection from "./CommentsSection";

describe("评论区块组件测试", () => {
  test("当没有评论的时候，渲染'No Comments'", () => {
    render(<CommentsSection comments={[]} />);
    expect(screen.getByText("No Comments")).toBeInTheDocument();
  });

  test("当有评论的时候，渲染评论", () => {
    const comments = [
      { id: 1, comment: "this is a commnent." },
      { id: 2, comment: "this is another commnent." },
    ];
    render(<CommentsSection comments={comments} />);
    expect(screen.getByText("this is a commnent.")).toBeInTheDocument();
    expect(screen.getByText("this is another commnent.")).toBeInTheDocument();
  });
});
