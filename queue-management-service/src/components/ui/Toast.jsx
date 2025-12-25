import { useEffect } from 'react';

export default function Toast({ toasts = [] }) {
  useEffect(() => { /* placeholder for auto-dismiss */ }, [toasts]);
  return (
    <div className="ui-toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`ui-toast ui-toast-${t.type || 'info'}`}>{t.message}</div>
      ))}
    </div>
  );
}
