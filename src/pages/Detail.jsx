import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const comments = useSelector((state) => state.comments);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {}, []);

  const todo = todos.filter((todo) => todo.id === id)[0];
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
      <div>
        <h3>댓글</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            dispatch({
              type: "ADD_COMMENT",
              payload: {
                id: shortid.generate(),
                writer: name,
                content,
                todoId: todo.id,
              },
            });
          }}
        >
          <input
            name="이름"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            name="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button type="submit">작성</button>
        </form>
      </div>
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p> 작성자 :{comment.writer}</p>
              <p> 내용 : {comment.contents}</p>
              <button
                onClick={() => {
                  dispatch({
                    type: "DELETE_COMMENT",
                    payload: comment.id,
                  });
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
    </div>
  );
};

export default Detail;
