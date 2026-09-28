import Medusa from "@medusajs/js-sdk";

const configuredBackendUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.trim();

export const MEDUSA_BACKEND_URL = (
  configuredBackendUrl ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:9000"
    : "")
).replace(/\/+$/, "");

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim();

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
});