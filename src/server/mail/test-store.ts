import "server-only";

interface StoredEmailData {
  to: string;
  otp: string;
  sentAt: number;
}

const store = new Map<string, StoredEmailData>();

export const storeTestOTP = (to: string, otp: string) => {
  store.set(to, { to, otp, sentAt: Date.now() });
};

export const getTestOTP = (to: string) => {
  return store.get(to) ?? null;
};
