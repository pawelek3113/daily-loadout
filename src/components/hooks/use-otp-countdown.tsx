import { clearOtpExpiry, getOtpExpiry, setOtpExpiry } from "@/lib/otp-timer";
import { useCallback, useEffect, useState } from "react";

const initExpiresAt = (durationSeconds: number) => {
  if (typeof window === "undefined") return null;

  const stored = getOtpExpiry();
  return stored ?? setOtpExpiry(durationSeconds);
};

export const useOtpCountdown = (durationSeconds: number) => {
  const [expiresAt, setExpiresAt] = useState<number | null>(() =>
    initExpiresAt(durationSeconds)
  );
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const tick = () => {
      const secondsLeft = Math.max(
        0,
        Math.round((expiresAt! - Date.now()) / 1000)
      );
      setRemaining(secondsLeft);

      if (secondsLeft === 0) {
        clearOtpExpiry();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const restart = useCallback((seconds: number) => {
    const newExpiresAt = setOtpExpiry(seconds);
    setExpiresAt(newExpiresAt);
  }, []);

  return { remaining, restart };
};
