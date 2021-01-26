import React from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { setConstantValue } from "typescript";
import TodoApp from "./TodoApp";
import { AppContext, IAppContext } from "./AppContext";

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
    return <p>Loading</p>;
  }

  if (user) {
    // User is signed in.
    return (
      <>
        <AppContext.Provider value={state}>
          <TodoApp />
        </AppContext.Provider>
        <p>LOGGED IN {user.email}</p>
        <button
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                setUser(null);
              })
              .catch((e) => {
                alert("error loggin out.  Sorry no ideah why.");
              });
          }}
        >
          Log out
        </button>
      </>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            firebase
              .auth()
              .signInWithPopup(provider)
              .then((result) => {
                var credential = result.credential;
                // The signed-in user info.
                var user = result.user;
                setUser(user);
              })
              .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          }}
        >
          Login with GitHub
        </button>
      </div>
    );

    // No user is signed in.
  }
}

export default App;
