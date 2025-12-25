import { useState } from "react";
import "./App.css";
import QueueForm from "./components/queue-form.jsx";

export default function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (item) => {
    setQueue([...queue, { ...item, id: Date.now(), status: "waiting" }]);
  };
  
  const removeFromQueue = (index) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const updateStatus = (index, newStatus) => {
    const newQueue = [...queue];
    if (newQueue[index]) {
      newQueue[index].status = newStatus;
      setQueue(newQueue);
    }
  };

  return(
    <div className="app">
      <header className="app-header">
        <h1>Queue Management Service</h1>
        <p>Manage your queues efficiently</p>
      </header>
        <main className="app-main">
          <QueueForm onAdd={addToQueue} />
          <h2>Current Queue</h2>
        </main>
    </div>
  )
}