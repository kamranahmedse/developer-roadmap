import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { courseProgressOptions } from '../../queries/course-progress';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { CourseLoginPopup } from '../AuthenticationFlow/CourseLoginPopup';
import { BuyButton } from './BuyButton';

export function AccountButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: courseProgress, isLoading: isCourseProgressLoading } = useQuery(
    {
      ...courseProgressOptions('road-to-sql'),
      enabled: !!isLoggedIn(),
    },
    queryClient,
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const buttonClasses =
    'rounded-full px-5 py-2 text-base font-medium text-yellow-700 hover:text-yellow-500 transition-colors';

  const hasEnrolled = !!courseProgress?.enrolledAt;
  const loginModal = (
    <CourseLoginPopup
      checkoutAfterLogin={false}
      onClose={() => {
        setShowLoginModal(false);
      }}
    />
  );

  if (!isVisible || isCourseProgressLoading) {
    return <button className={`${buttonClasses} opacity-0`}>...</button>;
  }

  if (!isLoggedIn()) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className={`${buttonClasses} animate-fade-in`}
        >
          Login
        </button>
        {showLoginModal && loginModal}
      </>
    );
  }

  if (!hasEnrolled) {
    return <BuyButton variant="top-nav" />;
  }

  return (
    <a
      href={`${import.meta.env.PUBLIC_COURSE_APP_URL}/road-to-sql`}
      className={`${buttonClasses} animate-fade-in`}
    >
      Start Learning
    </a>
  );
}
