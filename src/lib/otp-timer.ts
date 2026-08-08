const STORAGE_KEY = "otp-expires-at";

export const setOtpExpiry = (durationSeconds: number) => {
  const expiresAt = Date.now() + durationSeconds * 1000;
  localStorage.setItem(STORAGE_KEY, String(expiresAt));
  return expiresAt;
};

export const getOtpExpiry = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? Number(stored) : null;
};

export const clearOtpExpiry = () => {
  localStorage.removeItem(STORAGE_KEY);
};
