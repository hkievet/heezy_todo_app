import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { ITodo } from "./TodoApp";

export interface ITodoProps {
  onDelete: () => void;
  onToggleComplete: () => void;
  todo: ITodo;
}

export const Todo: React.FC<ITodoProps> = (props) => {
  const deleteButton = (
    <Button
      onClick={() => {
        props.onDelete();
      }}
      bg={"red.200"}
      ml="3"
    >
      Delete
    </Button>
  );

  const updateButton = !props.todo?.isFinished ? (
    <Button
      onClick={() => {
        props.onToggleComplete();
      }}
    >
      Mark Finish
    </Button>
  ) : (
    <></>
  );

  const isComplete = props.todo?.isFinished ? (
    <Text alignSelf="center" mr="5">
      Completed
    </Text>
  ) : (
    <></>
  );

  return (
    <Flex
      p={5}
      bgColor={"white"}
      mb={2}
      borderRadius={5}
      shadow="base"
      maxWidth={"600px"}
      justify="center"
    >
      <Box mr={5} width={"480px"} alignSelf="center">
        <Text textAlign={"left"}>
          {props.todo.message} ({props.todo.id}
        </Text>
      </Box>
      <Spacer />
      <Box>{updateButton}</Box>
      {isComplete}
      <Box>{deleteButton}</Box>
    </Flex>
  );
};

export default Todo;
