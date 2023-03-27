import clsx from "clsx";
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
  const [token, setToken] = useState<string | null>(null);

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
        <Button onClick={() => fetchToken(setToken)}>
          I want to receive notifications!
        </Button>
        <p className="mt-2">
          {token
            ? "Notification permission enabled 👍🏻"
            : "Need notification permission ❗️"}
        </p>

        {token && (
          <div className="flex mt-2 py-1 px-2 rounded bg-slate-100 items-center">
            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis mr-2">
              {token}
            </span>
            <Button
              // className="whitespace-nowrap bg-"
              size="small"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(token);
              }}
            >
              Copy token
            </Button>
          </div>
        )}
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
        <Button
          variant="secondary"
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
        </Button>
      </div>
      <ReloadPrompt />
    </div>
  );
};

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "default",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      size === "default" && "py-2.5 px-5",
      "text-sm font-medium focus:outline-none rounded-lg",
      size === "small" && "py-1 px-2 font-normal text-xs",
      variant === "primary" &&
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-800",
      variant === "secondary" &&
        "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
    )}
  >
    {children}
  </button>
);
