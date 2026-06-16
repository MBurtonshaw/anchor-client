import { ApiError } from "./ApiError";

export function getErrorMessage(err) {
  if (!err) return "Something went wrong";

  if (typeof err === "string") {
    return err;
  }

  if (err instanceof ApiError) {
    const serverMessage = err.message;

    switch (err.status) {
      case 400:
        return serverMessage || "Invalid request";

      case 401:
        return serverMessage || "Unauthorized";

      case 403:
        return serverMessage || "You don't have permission";

      case 404:
        return serverMessage || "Not found";

      case 500:
        return "Server error. Try again later";

      default:
        return serverMessage || "Something went wrong";
    }
  }

  if (err instanceof Error) {
    return err.message || "Something went wrong";
  }

  return "Something went wrong";
}