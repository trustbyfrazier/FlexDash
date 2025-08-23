"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchHealth } from "../../lib/api";

export default function HealthPage() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err) => setHealth({ error: err.message }));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Backend Health</h1>

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
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

