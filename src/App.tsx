import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { fetchToken } from "./firebase";

function App() {
  const [show, setShow] = useState(false);

  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Notification</strong>
          <small>12 mins ago</small>
        </Toast.Header>
        <Toast.Body>There are some new updates that you might love!</Toast.Body>
      </Toast>
      <div className="App">
        <div>
          {isTokenFound
            ? "Notification permission enabled 👍🏻"
            : "Need notification permission ❗️"}
        </div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setShow(true)}>Show Toast</Button>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
