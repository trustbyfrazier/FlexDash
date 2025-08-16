import { useEffect, useState } from "react";
import { fetchHealth } from "../lib/api";

export default function Home() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err) => setHealth({ error: err.message }));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Demo App</h1>

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold mb-2">Backend Health</h2>
        {health ? (
          <pre className="bg-gray-100 p-3 rounded">
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

