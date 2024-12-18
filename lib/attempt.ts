// TODO: Produced by Claude. Haven't tried or tested.

import { useState, useCallback } from "react";

export type AttemptResult<T> = Awaited<ReturnType<typeof attempt<T>>>;

export async function attempt<T, E = Error>(
  promise: Promise<T>,
): Promise<[E | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

export async function attemptAll<T>(
  promises: Promise<T>[],
): Promise<[Error | null, T[]]> {
  try {
    const results = await Promise.all(promises);
    return [null, results];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), []];
  }
}

export async function attemptAllSettled<T>(
  promises: Promise<T>[],
): Promise<[Error | null, T | null][]> {
  const results = await Promise.allSettled(promises);
  return results.map((result) =>
    result.status === "fulfilled"
      ? [null, result.value]
      : [new Error(result.reason), null],
  );
}

export function useAttempt<T, E extends Error = Error>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (promise: Promise<T>) => {
    setLoading(true);
    try {
      const [err, result] = await attempt<T, E>(promise);
      setError(err);
      setData(result);
      return [err, result] as const;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, execute };
}
