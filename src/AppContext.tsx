import * as React from "react";

export interface IAppContext {
  userId: string | undefined;
}

export const AppContext = React.createContext<IAppContext>({ userId: "" });

export default AppContext;
