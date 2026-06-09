import { useError } from "../../contexts/ErrorContext";

function ErrorBanner() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="error-banner text-center">
      <div>
        <button className="danger_button" onClick={clearError}>
          X
        </button>
      </div>

      <h4 className="mt-4">{error}</h4>
    </div>
  );
}

export default ErrorBanner;
