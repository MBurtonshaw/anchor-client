import { useError } from '../../contexts/ErrorContext';

function ErrorBanner() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="error-banner">
      <p>{error}</p>
      <button onClick={clearError}>X</button>
    </div>
  );
}

export default ErrorBanner;