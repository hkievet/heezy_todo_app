import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { database } from "../App";
import AppContext from "../AppContext";
import { wrapInLayout } from "../AppWrapper";
import Todo from "./Todo";
import TodoAppHeader from "./TodoAppHeader";
export interface ITodoAppProps {
  onLogoff: () => void;
}

export interface ITodoAppState {
  todos: ITodo[];
  localVerified: boolean;
  initialized: boolean;
}

const defaultTodoAppState = {
  todos: [],
  localVerified: false,
  initialized: false,
};

export interface ITodo {
  message: string;
  id?: string;
  isFinished?: boolean;
}

export const TodoApp: React.FC<ITodoAppProps> = (props) => {
  const [state, setState] = React.useState<ITodoAppState>(defaultTodoAppState);
  const { userId } = React.useContext(AppContext);
  const [currentInput, setCurrentInput] = React.useState("");

  /**
   * todo: investigate. I think this might be running more than it needs.
   */
  React.useEffect(() => {
    if (userId && !state.localVerified) {
      const ref = database.ref("todos/" + userId);
      ref.on("value", (values) => {
        const data = values.val();
        const newTodods = [];
        for (const todoKey in data) {
          const newTodo = { ...data[todoKey], id: todoKey };
          newTodods.push(newTodo);
        }
        setState({
          ...state,
          todos: newTodods,
          localVerified: true,
          initialized: true,
        });
      });
      return () => {
        ref.off();
      };
    }
  }, [userId, state]);

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
        isFinished: false,
      };
      saveNewTodo(newTodo);
      const newTodos = [...state.todos, newTodo];
      setState({ ...state, todos: newTodos, localVerified: false });
      setCurrentInput("");
    }
  };

  const completeTodo = (todo: ITodo) => {
    if (!todo.id) {
      console.error("no todo...");
      return;
    }
    let updates: any = {};
    updates["todos/" + userId + "/" + todo.id] = { ...todo, isFinished: true };
    database.ref().update(updates);
    setState({ ...state, localVerified: false });
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
    return (
      <Todo
        key={todo.id ?? i}
        todo={todo}
        onDelete={() => {
          deleteTodo(todo?.id);
        }}
        onToggleComplete={() => {
          completeTodo(todo);
        }}
      />
    );
  });

  return (
    <Box width="600px">
      <TodoAppHeader
        onLogin={() => {}}
        onLogoff={props.onLogoff}
        isLoggedIn={!!userId}
      />
      <Box bg="white" p={5} mb={"5"}>
        <Text as="h2" fontSize={"xl"} mb={"5"}>
          Add a Todo
        </Text>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodo();
          }}
        >
          <FormControl id="todo" mb={2}>
            <FormLabel>Todo Name</FormLabel>
            <Input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setCurrentInput(e.currentTarget.value);
              }}
              value={currentInput}
              placeholder={"Add Todos!"}
            ></Input>
          </FormControl>
          {currentInput.length ? (
            <Button onClick={addTodo} bg="blue.500" color={"white"}>
              Add
            </Button>
          ) : (
            <></>
          )}
        </form>
      </Box>
      {todoElements.length ? (
        <Box bg={"gray.50"} p={5} mb={"5"}>
          <Text as="h2" fontSize={"xl"} mb={"5"}>
            Active Todos
          </Text>
          {todoElements}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default wrapInLayout(TodoApp);
