import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: Date.now(),
      todo: "리액트 공부하기",
      list: "리액트 기초를 공부해봅시다.",
      completed: false, // 추가: 완료 여부 플래그
    },
  ]);

  const [todo, setTodo] = useState("");
  const [list, setList] = useState("");

  const addTodo = (event) => {
    setTodo(event.target.value);
  };
  const addList = (event) => {
    setList(event.target.value);
  };

  const clickButton = (event) => {
    event.preventDefault();
    if (todo && list) {
      const addTodoList = {
        id: Date.now() + Math.random(),
        todo,
        list,
        completed: false, // 추가: 새로운 항목은 완료되지 않음
      };
      setTodoList((prevTodoList) => [...prevTodoList, addTodoList]);
      setTodo("");
      setList("");
    }
  };

  const deleteClick = (id) => {
    const newTodoList = todoList.filter((td) => td.id !== id);
    setTodoList(newTodoList);
  };

  const completeClick = (id) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }; // 완료 상태를 토글
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div className="App">
      <div id="root">
        <div className="layout">
          <div className="container">
            <div>My Todo List</div>
          </div>
          <div className="add-form">
            <div className="input-group">
              <label className="form-label">제목</label>
              <input className="add-input" value={todo} onChange={addTodo} />
              <label className="form-label">내용</label>
              <input className="add-input" value={list} onChange={addList} />
            </div>
            <button className="add-button" onClick={clickButton}>
              추가하기
            </button>
          </div>
          <div className="list-container">
            <h2 className="list-title">Working.. 🔥</h2>
            <div className="list-wrapper">
              {todoList.map(function (item) {
                if (!item.completed) {
                  return (
                    <TodoList
                      key={item.id}
                      item={item}
                      deleteClick={deleteClick}
                      completeClick={completeClick}
                    />
                  );
                }
                return null;
              })}
            </div>
            <h2 className="list-title">Done..! 🎉</h2>
            <div className="list-wrapper">
              {todoList.map(function (item) {
                if (item.completed) {
                  return (
                    <TodoList
                      key={item.id}
                      item={item}
                      deleteClick={deleteClick}
                      completeClick={completeClick}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TodoList = ({ item, deleteClick, completeClick }) => {
  return (
    <div className="todo-container" key={item.id}>
      <div>
        <h2 className="todo-title">{item.todo}</h2>
        <div>{item.list}</div>
      </div>
      <div className="button-set">
        <button
          className="todo-delete-button button"
          onClick={() => deleteClick(item.id)}
        >
          삭제하기
        </button>
        <button
          className="todo-complete-button button"
          onClick={() => completeClick(item.id)}
        >
          {item.completed ? "취소" : "완료"}{" "}
          {/* 완료 여부에 따라 버튼 텍스트 변경 */}
        </button>
      </div>
    </div>
  );
};

export default App;
