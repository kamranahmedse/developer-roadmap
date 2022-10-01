import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uid } from "uid";
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((d) => {
          setTodos((old) => [...old, d]);
        });
      }
    });
  }, []);

  const add = (e) => {
    e.preventDefault();
    const id = uid();
    set(ref(database, `/${id}`), {
      id,
      name: todo,
    });
    setTodo("");
  };

  const deleteTodo = (id) => {
    remove(ref(database, `/${id}`));
  };

  const updateTodo = (id) => {
    update(ref(database, `/${id}`), {
      name: todo,
      id,
    });
    setIsEdit(false);
    setTodo("");
  };
  return (
    <div className="App">
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <br />
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            {todo.id} - {todo.name}{" "}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            {updateId === todo.id && isEdit ? (
              <button onClick={() => updateTodo(todo.id)}>Update</button>
            ) : (
              <button
                onClick={() => {
                  setIsEdit(true);
                  setTodo(todo.name);
                  setUpdateId(todo.id);
                }}
              >
                Edit
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
