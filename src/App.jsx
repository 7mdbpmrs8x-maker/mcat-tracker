import { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      text: "Test entry"
    };
    setEntries([newEntry, ...entries]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MCAT Tracker</h1>

      <button onClick={addEntry}>Add Test Entry</button>

      {entries.map((e) => (
        <div key={e.id} style={{ marginTop: 10 }}>
          {e.text}
        </div>
      ))}
    </div>
  );
}
