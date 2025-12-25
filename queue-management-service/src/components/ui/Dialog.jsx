export default function Dialog({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="ui-dialog-backdrop" role="dialog" aria-modal="true">
      <div className="ui-dialog">
        <header className="ui-dialog-header">
          <h3>{title}</h3>
          <button className="ui-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="ui-dialog-body">{children}</div>
      </div>
    </div>
  );
}
