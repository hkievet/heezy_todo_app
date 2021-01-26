import * as React from "react";
import { Box, Center } from "@chakra-ui/react";

export interface IAppWrapperProps {}

export const AppWrapper: React.FC<IAppWrapperProps> = (props) => {
  return (
    <Center>
      <Box
        mt="5"
        bgGradient="linear(to-r, green.200, pink.500)"
        padding={"5"}
        borderRadius={5}
      >
        {props.children}
      </Box>
    </Center>
  );
};

export default AppWrapper;

export const wrapInLayout = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ loading, ...props }: any) => {
  return (
    <AppWrapper>
      <Component {...(props as P)}></Component>
    </AppWrapper>
  );
};
