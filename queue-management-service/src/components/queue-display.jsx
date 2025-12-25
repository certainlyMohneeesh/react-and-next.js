import { useMemo, useState } from 'react';
import Input from './ui/Input.jsx';
import Select from './ui/Select.jsx';
import Button from './ui/Button.jsx';
import Dialog from './ui/Dialog.jsx';
import Toast from './ui/Toast.jsx';
import { useQueue } from '../context/queue-context.jsx';

function QueueDisplay() {
  const { queue, remove, updateStatus, bulkUpdate, exportCsv, importCsv, toasts } = useQueue();
  const [filterInput, setFilterInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'var(--warning)';
      case 'serving': return 'var(--success)';
      case 'completed': return 'var(--info)';        
      default:
        return 'var(--text)';
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const confirmRemove = (id) => { setConfirmTarget(id); setConfirmOpen(true); };

  const exportCSV = () => {
    const csv = exportCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'queue.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const visible = useMemo(() => {
    let v = queue;
    if (filterInput.trim()) {
      const q = filterInput.toLowerCase();
      v = v.filter(i => i.name.toLowerCase().includes(q) || (i.service || '').toLowerCase().includes(q));
    }
    if (filterStatus) v = v.filter(i => i.status === filterStatus);
    // sorting
    switch (sortBy) {
      case 'newest':
        v = v.slice().sort((a,b) => b.id - a.id);
        break;
      case 'oldest':
        v = v.slice().sort((a,b) => a.id - b.id);
        break;
      case 'name-asc':
        v = v.slice().sort((a,b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        v = v.slice().sort((a,b) => b.name.localeCompare(a.name));
        break;
      case 'status':
        const order = { waiting: 0, serving: 1, completed: 2 };
        v = v.slice().sort((a,b) => (order[a.status]||0) - (order[b.status]||0));
        break;
      default:
    }

    return v;
  }, [queue, filterInput, filterStatus, sortBy]);

  // Safe empty state
  if (!Array.isArray(queue) || queue.length === 0) {
    return (
      <div className="queue-display">
        <h2>Current Queue</h2>
        <p className="empty-queue">No items in the queue</p>
      </div>
    );
  }

  return (
    <div className="queue-display">
      <div className="queue-header">
        <h2>Current Queue</h2>
        <p className="queue-count">There {queue.length === 1 ? 'is' : 'are'} <strong>{queue.length}</strong> {queue.length === 1 ? 'item' : 'items'} in the queue</p>
      </div>

      <div className="queue-controls-top" style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Input id="queue-search-input" placeholder="Search by name or service" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="waiting">Waiting</option>
          <option value="serving">Serving</option>
          <option value="completed">Completed</option>
        </Select>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="status">Status</option>
        </Select>
        <Button onClick={exportCSV}>Export CSV</Button>
        <Button onClick={() => setImportOpen(true)}>Import CSV</Button>
        <Button onClick={() => setSelectedIds(queue.map(i => i.id))}>Select all</Button>
        <Button onClick={() => { bulkUpdate(selectedIds, 'completed'); setSelectedIds([]); }}>Mark completed</Button>
      </div>

      <ul className="queue-list">
        {visible.map((item) => (
          <li key={item.id} className="queue-item">
            <div className="queue-left">
              <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={(e) => toggleSelect(item.id)} />
              <div className="queue-meta">
                <h3 className="name">{item.name}</h3>
                {item.service && <div className="service">Calling — {item.service}</div>}
              </div>
            </div>

            <div className="queue-center">
              <div className="queue-status" style={{ color: getStatusColor(item.status) }}>{item.status}</div>
            </div>

            <div className="queue-controls">
              <select
                className="status-select"
                value={item.status}
                onChange={(e) => updateStatus(item.id, e.target.value)}
                aria-label={`Change status for ${item.name}`}
                style={{ color: getStatusColor(item.status) }}
              >
                <option value="waiting">Waiting</option>
                <option value="serving">Serving</option>
                <option value="completed">Completed</option>
              </select>

              <Button className="btn remove" onClick={() => confirmRemove(item.id)}>Remove</Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm Remove">
        <p>Are you sure you want to remove this item?</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => { remove(confirmTarget); setConfirmOpen(false); }}>Remove</Button>
        </div>
      </Dialog>

      <Dialog open={importOpen} onClose={() => setImportOpen(false)} title="Import CSV">
        <textarea rows={8} className="ui-input" value={importText} onChange={(e) => setImportText(e.target.value)} />
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button onClick={() => { importCsv(importText); setImportOpen(false); setImportText(''); }}>Import</Button>
          <Button onClick={() => setImportOpen(false)}>Cancel</Button>
        </div>
      </Dialog>

      <Toast toasts={toasts} />
    </div>
  );
}

export default QueueDisplay