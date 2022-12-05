export const memo = <T>(fn: (url: string) => Promise<T>) => {
  const memoMap = new Map();
  return async (url: string): Promise<T> => {
    const key = JSON.stringify(url);
    if (!memoMap.has(key)) {
      memoMap.set(key, await fn(url));
    }
    return memoMap.get(key);
  };
};
