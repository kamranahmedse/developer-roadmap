import type { ReactNode } from 'react';
import { Spinner } from '../ReactIcons/Spinner.tsx';

type HeroTitleProps = {
  icon: any;
  isLoading?: boolean;
  title: string | ReactNode;
  rightContent?: ReactNode;
};

export function HeroTitle(props: HeroTitleProps) {
  const { isLoading = false, title, icon, rightContent } = props;

  return (
    <div className="flex items-center justify-between">
      <p className="flex items-center text-sm text-gray-400">
        {!isLoading && icon}
        {isLoading && (
          <span className="mr-1.5">
            <Spinner />
          </span>
        )}
        {title}
      </p>
      <div>{rightContent}</div>
    </div>
  );
} 