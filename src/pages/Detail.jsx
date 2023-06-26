import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { commentTodoId } from "../redux/modules/reviews";
import todos from "../redux/modules/todos";

const Detail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((todo) => todo.id === id);

  const comments = useSelector((state) => commentTodoId(state, todo.id));

  const [review, setReview] = useState({
    content: "",
    reviewId: "",
    todoId: todo.id,
  });

  const onChange = useCallback((event) => {
    setReview((reviews) => ({
      ...reviews,
      content: event.target.value,
    }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const newReview = {
        content: review.content,
        reviewId: "",
        todoId: todo.id,
      };

      dispatch({ type: "ADD_REVIEW", payload: newReview });

      setReview({ content: "", reviewId: "", todoId: "" });
    },
    [dispatch, review.content, todo.id]
  );

  return (
    <div>
      {todo.id}
      <br />
      {todo.title}
      <br />
      {todo.body}
      <br />
      {todo.isDone.toString()}
      <br />
      <form onSubmit={onSubmit}>
        <input
          placeholder="review"
          value={review.content}
          onChange={onChange}
        ></input>
        <button type="submit">등록</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
    </div>
  );
};

export default Detail;
