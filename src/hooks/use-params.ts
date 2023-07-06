import { useEffect, useState } from "preact/hooks";

export function useParams<T = Record<string, any>>(): T {
  const [params, setParams] = useState<T>({} as T);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj: Record<string, any> = {};
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }
    setParams(paramsObj as T);
  }, []);

  return params
}
