import { MessagePayload, NotificationPayload } from "firebase/messaging";
import { PropsWithChildren, useState } from "react";
import { toast, ToastContainer, ToastContentProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchToken, onMessageListener } from "./firebase";
import { ReloadPrompt } from "./ReloadPrompt";

type NotificationProps = {
  notificationProps: NotificationPayload;
} & Partial<ToastContentProps>;

const Notification = ({
  notificationProps,
  toastProps,
  closeToast,
}: NotificationProps) => (
  <>
    <span className="font-bold mb-2">{notificationProps.title}</span>
    <p className="text-sm">{notificationProps.body}</p>
  </>
);
export const App = () => {
  const [isTokenFound, setTokenFound] = useState(false);

  onMessageListener()
    .then((payload: MessagePayload) => {
      toast(
        <Notification
          notificationProps={{
            title: payload.notification?.title,
            body: payload.notification?.body,
          }}
        />
      );
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="mx-auto max-w-lg px-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">React Firebase Messaging PWA</h1>
      <ToastContainer />
      <div className="bg-blue-200 p-4 rounded-lg">
        <Button onClick={() => fetchToken(setTokenFound)}>
          I want to receive notifications!
        </Button>
        <p>
          {isTokenFound
            ? "Notification permission enabled 👍🏻"
            : "Need notification permission ❗️"}
        </p>
      </div>
      <div className="my-4">
        <p>
          This is a small demo repo to get started with Firebase Cloud Messaging
          within a React application bootstrapped with Vite + TypeScript.
        </p>

        <p>Built with:</p>

        <ul className="my-2">
          <li>
            <a href="https://reactjs.org/">React</a>
          </li>
          <li>
            <a href="https://vitejs.dev/">Vite</a> +{" "}
            <a href="https://www.typescriptlang.org/">TypeScript</a>
          </li>
          <li>
            <a href="https://firebase.google.com/">Firebase</a>
          </li>
          <li>
            <a href="https://tailwindcss.com/">Tailwind</a>
          </li>
          <li>
            <a href="https://vite-pwa-org.netlify.app/">Vite PWA plugin</a>
          </li>
          <li>
            <a href="https://fkhadra.github.io/react-toastify/introduction">
              react-tostify
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ButtonSecondary
          onClick={() =>
            toast(
              <Notification
                notificationProps={{
                  title: "Hello I'm a toast! 🍞",
                  body: "Nothing much to say about it, is there?",
                }}
              />
            )
          }
        >
          Show an example toast
        </ButtonSecondary>
      </div>
      <p>Ch-ch-ch-ch-ch-change</p>
      <ReloadPrompt />
    </div>
  );
};

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    {children}
  </button>
);

const ButtonSecondary: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    {children}
  </button>
);
