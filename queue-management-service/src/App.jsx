import { useState } from "react";
import "./App.css";
import QueueForm from "./components/queue-form.jsx";

export default function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (item) => {
    setQueue([...queue, { ...item, id: Date.now(), status: "waiting" }]);
  };
  
  const removeFromQueue = (id) => {
    setQueue(queue.filter(item => item.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
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