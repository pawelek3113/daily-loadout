import "server-only";

interface StoredEmailData {
  to: string;
  sentAt: number;
  otp?: string;
  resetPasswordUrl?: string;
}

const store = new Map<string, StoredEmailData>();

export const storeTestOTP = (to: string, otp: string) => {
  store.set(to, { to, otp, sentAt: Date.now() });
};

export const getTestOTP = (to: string) => {
  return store.get(to) ?? null;
};

export const storeTestResetUrl = (to: string, url: string) => {
  store.set(to, { to, resetPasswordUrl: url, sentAt: Date.now() });
};

export const getTestResetUrl = (to: string) => {
  return store.get(to) ?? null;
};
