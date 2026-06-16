import { useError } from "../../contexts/ErrorContext";

function ErrorBanner() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="error-banner-container">
      <div className="error-banner text-end">
        <button className="danger_button" onClick={clearError}>
          X
        </button>
        <h4 className="mt-4 text-center">{error}</h4>
      </div>
    </div>
  );
}

export default ErrorBanner;
