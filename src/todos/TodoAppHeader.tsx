import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";

export interface ITodoAppHeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogoff: () => void;
}

export const TodoAppHeader: React.FC<ITodoAppHeaderProps> = (props) => {
  return (
    <Box bg={"blue.50"} mb="5" p="4">
      <Flex>
        <Text alignSelf={"center"} fontSize={"xl"}>
          Heezy Todo App, made with Firebase
        </Text>
        <Spacer />
        <Button onClick={props.onLogoff} bg={"green.200"}>
          Log Out
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoAppHeader;
