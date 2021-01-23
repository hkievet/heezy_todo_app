import * as React from "react";

export interface ITodoAppProps {}

export const TodoApp: React.FC<ITodoAppProps> = (props) => {
  const [todos, setTodos] = React.useState<string[]>([]);
  const [currentInput, setCurrentInput] = React.useState("");

  const addTodo = () => {
    if (currentInput) {
      setTodos([...todos, currentInput]);
      setCurrentInput("");
    }
  };

  const todoElements = todos.map((todo, i) => {
    return <p key={i}>{todo}</p>;
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
