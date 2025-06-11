import { CheckIcon, CopyIcon, XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';

export const sqlCouponCode = 'SQL30';

export function CourseDiscountBanner() {
  const { copyText, isCopied } = useCopyText();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-coupon-alert
      className={cn(
        'sticky top-0 z-[999] flex w-full items-center justify-center overflow-hidden bg-yellow-500 text-center text-sm font-medium transition-[height] duration-300',
        isVisible ? 'h-[34px] sm:h-[35px]' : 'h-0',
      )}
    >
      <span className="mr-1 hidden font-bold sm:block">
        🎁 Limited time offer :
      </span>
      Get 30% off using{' '}
      <button
        onClick={() => {
          copyText(sqlCouponCode);
        }}
        className={cn(
          'animate-wiggle ml-1 inline-block cursor-pointer rounded-md border border-dashed border-black bg-gray-900 px-1.5 py-[3px] text-xs text-white [animation-delay:0.25s]',
          isCopied && 'bg-gray-900 text-white',
        )}
      >
        <span className="mr-1">Coupon code :</span>
        {sqlCouponCode}
        {isCopied && (
          <CheckIcon
            className="relative -top-[2px] ml-1.5 inline-block size-3"
            strokeWidth={2.5}
          />
        )}
        {!isCopied && (
          <CopyIcon
            className="relative -top-[2px] ml-1.5 inline-block size-3"
            strokeWidth={2.5}
          />
        )}
      </button>
      <button
        onClick={() => {
          setIsVisible(false);
        }}
        className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-md px-1.5 py-1.5 hover:bg-yellow-600 hover:text-black sm:block"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
}
