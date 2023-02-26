import { pwaInfo } from "virtual:pwa-info";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "./App";

console.log(pwaInfo);

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + JSON.stringify(r));
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  return (
    <>
      {(offlineReady || needRefresh) && (
        <div className="bg-indigo-200 p-4 rounded-lg">
          <div className="mb-2">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
          )}
        </div>
      )}
    </>
  );
};
