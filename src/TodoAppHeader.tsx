import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";

export interface ITodoAppHeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogoff: () => void;
}

export const TodoAppHeader: React.FC<ITodoAppHeaderProps> = (props) => {
  return (
    <Box bg={"white"} mb="2" p="4">
      <Flex>
        <Text>Heezy List App</Text>
        <Spacer />
        <Button onClick={props.onLogoff}>Log Out</Button>
      </Flex>
    </Box>
  );
};

export default TodoAppHeader;
