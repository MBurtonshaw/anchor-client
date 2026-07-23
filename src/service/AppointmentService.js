import { api } from "../api";

export function getAppointments() {
  return api(`/appointments`);
}

export function getAppointmentById(appointmentId) {
  return api(`/appointments/${appointmentId}`);
}

export function createAppointment(appointment) {
  return api(`/appointments`, "POST", appointment);
}

export function updateAppointment(appointment, appointmentId) {
  return api(`/appointments/${appointmentId}`, "PUT", appointment);
}

export function completeAppointment(appointmentId) {
  return api(`/appointments/${appointmentId}/complete`, "PATCH");
}

export function deleteAppointment(appointmentId) {
  return api(`/appointments/${appointmentId}`, "DELETE");
}
