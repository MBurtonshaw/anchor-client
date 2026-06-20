export default function handleError(err, setError, clearAuth) {
  if (!err) {
    setError("Something went wrong");
    return;
  }

  // normalize message FIRST
  const message =
    typeof err === "string"
      ? err
      : err?.response?.data?.message
      || err?.message
      || "Something went wrong";

  setError(message);

  // optional auth handling
  if (err?.status === 401 || err?.response?.status === 401) {
    clearAuth?.();
  }
}