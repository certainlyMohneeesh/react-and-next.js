import { useState } from "react";
import "./App.css";
import { QueueProvider } from './context/queue-context.jsx';
import QueueForm from "./components/queue-form.jsx";
import QueueDisplay from "./components/queue-display.jsx";
import GlobalShortcuts from './components/global-shortcuts.jsx';
import Dialog from './components/ui/Dialog.jsx';
import Button from './components/ui/Button.jsx';

export default function App() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <QueueProvider>
      <div className="app">
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <h1>Queue Management Service</h1>
              <p>Manage your queues efficiently</p>
            </div>
            <div>
              <Button onClick={() => setHelpOpen(true)}>Help</Button>
            </div>
          </div>
        </header>
        <main className="app-main">
          <QueueForm />
          <QueueDisplay />
          <GlobalShortcuts />
        </main>

        <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} title="Help & Shortcuts">
          <h4>Keyboard Shortcuts</h4>
          <ul>
            <li><strong>n</strong> — focus name input</li>
            <li><strong>/</strong> — focus search</li>
            <li><strong>Ctrl/Cmd + D</strong> — clear queue (confirm)</li>
          </ul>

          <h4>Features</h4>
          <ul>
            <li>Search, filter, and sort the queue</li>
            <li>Bulk select and mark completed</li>
            <li>CSV export & import</li>
            <li>Local persistence (localStorage)</li>
          </ul>
        </Dialog>
      </div>
    </QueueProvider>
  );
}
