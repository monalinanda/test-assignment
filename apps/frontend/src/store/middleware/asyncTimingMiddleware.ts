import type { Middleware } from "@reduxjs/toolkit";

const startTimes = new Map<
  string,
  { endpointName: string; startTime: number }
>();

const asyncTimingMiddleware: Middleware = () => (next) => (action) => {
  const { type, meta } = action as {
    type: string;
    meta?: { requestId?: string; arg?: { endpointName?: string } };
  };

  const requestId = meta?.requestId;
  if (!requestId) return next(action);

  if (type.endsWith("/pending")) {
    startTimes.set(requestId, {
      endpointName: meta?.arg?.endpointName ?? "unknown",
      startTime: performance.now(),
    });
  } else if (type.endsWith("/fulfilled") || type.endsWith("/rejected")) {
    const entry = startTimes.get(requestId);
    if (entry) {
      const duration = performance.now() - entry.startTime;
      const status = type.endsWith("/fulfilled") ? "completed" : "failed";
      console.log(
        `[API Timing] ${entry.endpointName} ${status} in ${duration.toFixed(2)}ms`,
      );
      startTimes.delete(requestId);
    }
  }

  return next(action);
};

export default asyncTimingMiddleware;
