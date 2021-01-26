import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import TodoApp from "./todos/TodoApp";
import { AppContext, IAppContext } from "./AppContext";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  CircularProgress,
  Text,
} from "@chakra-ui/react";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// I guess this is just a global variable that should be expected...
const firebaseConfig = {
  apiKey: "AIzaSyAUWOwDMPIHIrk1LTFHCCT1Wl5GP5ypyhw",
  authDomain: "todo-d3b49.firebaseapp.com",
  projectId: "todo-d3b49",
  storageBucket: "todo-d3b49.appspot.com",
  messagingSenderId: "1048297251395",
  appId: "1:1048297251395:web:358458129485ac43f82af6",
  measurementId: "G-9RYB2WLCSS",
  databaseURL: "https://todo-d3b49-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
const provider = new firebase.auth.GithubAuthProvider();

// get the firebase database object, requires the databaseURL in the config.
export const database = firebase.database();

const defaultState: IAppContext = {
  userId: "",
};

function App() {
  const [state, setState] = React.useState(defaultState);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | null>();
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // detaching the listener
      if (user) {
        // ...your code to handle authenticated users.
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
  }, []);

  React.useEffect(() => {
    if (state.userId !== user?.uid) {
      setState({ ...state, userId: user?.uid });
    }
  }, [user, state]);

  if (loading) {
    return (
      <Box>
        <Center mt={7}>
          <CircularProgress isIndeterminate />
        </Center>

        <Center>
          <Text>This app was made by Hunter Kievet.</Text>
        </Center>
      </Box>
    );
  }

  const login = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        alert("An error happened logging in.  Sorry this app is pretty alpha.");
      });
  };
  const logoff = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert("error loggin out.  Sorry no ideah why.");
      });
  };

  if (user) {
    // User is signed in.
    return (
      <>
        <ChakraProvider>
          <AppContext.Provider value={state}>
            <TodoApp onLogoff={logoff} />
          </AppContext.Provider>
        </ChakraProvider>
      </>
    );
  } else {
    return (
      <ChakraProvider>
        <Center mt="5">
          <Box>
            <Button onClick={login}>Login with GitHub</Button>
          </Box>
        </Center>
      </ChakraProvider>
    );

    // No user is signed in.
  }
}

export default App;
