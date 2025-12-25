import { useEffect, useState } from 'react';
import Dialog from './ui/Dialog.jsx';
import Button from './ui/Button.jsx';
import { useQueue } from '../context/queue-context.jsx';

export default function GlobalShortcuts() {
  const [open, setOpen] = useState(false);
  const { clear } = useQueue();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        const el = document.getElementById('queue-name-input');
        if (el) el.focus();
      }

      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const el = document.getElementById('queue-search-input');
        if (el) el.focus();
      }

      if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey)) {
        // ctrl/cmd + d to clear queue
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} title="Clear queue?">
        <p>This will remove all items from the queue. Are you sure?</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { clear(); setOpen(false); }}>Clear</Button>
        </div>
      </Dialog>
    </>
  );
}
