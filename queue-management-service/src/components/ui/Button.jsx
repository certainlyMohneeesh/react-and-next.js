export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`ui-btn ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
