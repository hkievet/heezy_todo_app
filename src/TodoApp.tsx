import { networkInterfaces } from "os";
import * as React from "react";
import { database } from "./App";
import AppContext from "./AppContext";

export interface ITodoAppState {
  todos: ITodo[];
  localVerified: boolean;
}

const defaultTodoAppState = {
  todos: [],
  localVerified: false,
  initialized: false,
};

export interface ITodoAppProps {}

interface ITodo {
  message: string;
  id?: string;
}

export const TodoApp: React.FC<ITodoAppProps> = (props) => {
  const [state, setState] = React.useState<ITodoAppState>(defaultTodoAppState);
  const { userId } = React.useContext(AppContext);
  const [currentInput, setCurrentInput] = React.useState("");

  React.useEffect(() => {
    console.log("getting todooos");
    if (!state.localVerified) {
      // take whatever the todos are on the server.
      database
        .ref("todos/" + userId)
        .once("value")
        .then((values) => {
          const data = values.val();
          const newTodods = [];
          for (const todoKey in data) {
            const newTodo = { ...data[todoKey], id: todoKey };
            newTodods.push(newTodo);
          }
          setState({ ...state, todos: newTodods, localVerified: true });
        })
        .catch((e) => {
          console.log("Failed to get todos");
          console.error(e);
        });
    }
  }, [state, userId]);

  const saveNewTodo = (todo: ITodo) => {
    const newRef = database.ref("todos/" + userId).push();
    newRef.set(todo);
    const newTodos = [...state.todos, todo];
    setState({ ...state, todos: newTodos, localVerified: false });
  };

  const addTodo = () => {
    if (currentInput) {
      const newTodo = {
        message: currentInput,
      };
      saveNewTodo(newTodo);
      const newTodos = [...state.todos, newTodo];
      setState({ ...state, todos: newTodos, localVerified: false });
      setCurrentInput("");
    }
  };

  const deleteTodo = (todoId?: string) => {
    if (todoId) {
      database.ref("todos/" + userId + "/" + todoId).remove();
      const newTodos = state.todos.filter((todo) => {
        return todo.id !== todoId;
      });
      setState({ ...state, todos: newTodos, localVerified: false });
    }
  };

  const todoElements = state.todos.map((todo, i) => {
    let deleteButton: JSX.Element = <></>;
    if (todo.id) {
      deleteButton = (
        <button
          onClick={() => {
            deleteTodo(todo?.id);
          }}
        >
          Delete
        </button>
      );
    }
    return (
      <div key={todo.id ?? i}>
        <p>{todo.message}</p>
        {deleteButton}
      </div>
    );
  });

  return (
    <>
      {todoElements}
      <input
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setCurrentInput(e.currentTarget.value);
        }}
        value={currentInput}
      ></input>
      <button onClick={addTodo}>Add</button>
    </>
  );
};

export default TodoApp;
