import { MessagePayload, NotificationPayload } from "firebase/messaging";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { fetchToken, onMessageListener } from "./firebase";

type Notification = NotificationPayload;

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    title: "",
    body: "",
  });
  const [isTokenFound, setTokenFound] = useState(false);

  onMessageListener()
    .then((payload: MessagePayload) => {
      setShow(true);
      setNotification({
        title: payload.notification?.title,
        body: payload.notification?.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      {/* <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast> */}
      <div className="App">
        <button onClick={() => fetchToken(setTokenFound)}>
          I want to receive notifications!
        </button>
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
        <h1 className="text-3xl font-bold underline">Vite + React</h1>
        <div className="card">
          <button onClick={() => setShow(true)}>Show Toast</button>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
