import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const QueueContext = createContext(null);

export function useQueue() { return useContext(QueueContext); }

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState(() => {
    try {
      const raw = localStorage.getItem('queue');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try { localStorage.setItem('queue', JSON.stringify(queue)); } catch (e) {}
  }, [queue]);

  const pushToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  const add = useCallback((item) => {
    setQueue(q => [...q, { ...item, id: Date.now(), status: 'waiting' }]);
    pushToast('Added to queue', 'success');
  }, [pushToast]);

  const remove = useCallback((id) => {
    setQueue(q => q.filter(i => i.id !== id));
    pushToast('Removed from queue', 'info');
  }, [pushToast]);

  const updateStatus = useCallback((id, status) => {
    setQueue(q => q.map(i => i.id === id ? { ...i, status } : i));
    pushToast('Status updated', 'success');
  }, [pushToast]);

  const clear = useCallback(() => { setQueue([]); pushToast('Queue cleared', 'error'); }, [pushToast]);

  const bulkUpdate = useCallback((ids, status) => {
    setQueue(q => q.map(i => ids.includes(i.id) ? { ...i, status } : i));
    pushToast('Bulk update complete', 'success');
  }, [pushToast]);

  const exportCsv = useCallback(() => {
    const csv = ['id,name,service,status', ...queue.map(i => `${i.id},"${i.name}","${i.service || ''}",${i.status}`)].join('\n');
    return csv;
  }, [queue]);

  const importCsv = useCallback((csvText) => {
    const lines = csvText.split('\n').slice(1);
    const parsed = lines.map(l => {
      const cols = l.split(',');
      return { id: Number(cols[0]), name: cols[1].replace(/\"/g, ''), service: cols[2].replace(/\"/g, ''), status: cols[3] };
    }).filter(Boolean);
    setQueue(q => [...q, ...parsed]);
    pushToast('Imported CSV', 'success');
  }, [pushToast]);

  return (
    <QueueContext.Provider value={{ queue, add, remove, updateStatus, clear, bulkUpdate, exportCsv, importCsv, toasts }}>
      {children}
    </QueueContext.Provider>
  );
}
