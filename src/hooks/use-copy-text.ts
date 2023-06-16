import { useEffect, useState } from 'preact/hooks';

export function useCopyText() {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then();
    setIsCopied(true);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return { isCopied, copyText };
}
