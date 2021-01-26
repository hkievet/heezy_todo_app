# View a demo:

[https://todo.h11y.com/](https://todo.h11y.com/)

I made a simple todo app that uses Firebase Auth with Github OAUTH and Firebase Realtime DB.

# SDLC

## Planning

I made this to learn about Google Firebase. I think Google Firebase is really easy to use and a great technology for rapidly prototyping app ideas.

I wanted to make a piece of work for my portfolio. A lot of the stuff I've made is small and experimental. This is a complete work.

## Design

1. Commit to Google's Firebase
2. Setup Github Authentication with Firebase
3. Choose between Realtime Database and Cloud Firestore
4. Learn about schemas in Realtime Database
5. Plan out the Todo Data Schema
6. Create CRUD actions with the Realtime Database sdk
7. Stream changes

## App Structure

- Login through Github OAUTH
- Logged-in view, logged-out view
  - Login/logout buttons.
- Data persistence with Realtime Database
  - Add a todo
  - Complete a todo
  - Remove a todo
- State management with context and useState
