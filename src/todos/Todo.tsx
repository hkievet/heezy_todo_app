import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { ITodo } from "./TodoApp";

export interface ITodoProps {
  onDelete: () => void;
  todo: ITodo;
}

export const Todo: React.FC<ITodoProps> = (props) => {
  const deleteButton = (
    <Button
      onClick={() => {
        props.onDelete();
      }}
      bg={"red.200"}
    >
      Delete
    </Button>
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
        <Text textAlign={"left"}>{props.todo.message}</Text>
      </Box>
      <Spacer />
      <Box>{deleteButton}</Box>
    </Flex>
  );
};

export default Todo;
