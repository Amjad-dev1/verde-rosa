import { useEffect, useState } from "react";

export default function AppLoader({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function preload() {
      console.log("Preloading...");
      await new Promise(r => setTimeout(r, 1500)); // example
      setReady(true);
    }

    preload();
  }, []);

  if (!ready) {
    return <div className="loading-screen">Loading...</div>;
  }

  return children;
}
