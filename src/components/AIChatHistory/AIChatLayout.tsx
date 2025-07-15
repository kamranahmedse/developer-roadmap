import { AITutorLayout } from '../AITutor/AITutorLayout';
import { CheckSubscriptionVerification } from '../Billing/CheckSubscriptionVerification';
import { Loader2Icon } from 'lucide-react';

type AIChatLayoutProps = {
  children: React.ReactNode;
};

export function AIChatLayout(props: AIChatLayoutProps) {
  const { children } = props;

  return (
    <AITutorLayout
      activeTab="chat"
      wrapperClassName="flex-row p-0 lg:p-0 overflow-hidden"
      containerClassName="h-[calc(100vh-49px)] overflow-hidden"
    >
      {children}
      <CheckSubscriptionVerification />
    </AITutorLayout>
  );
}
