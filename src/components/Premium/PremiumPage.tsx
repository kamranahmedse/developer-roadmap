import {
  Book,
  Bot,
  CheckCircle,
  Clock,
  MousePointerClick,
  PartyPopper,
  Users2,
  Wand2,
  Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '../../hooks/use-toast';
import { httpPost } from '../../lib/query-http';
import {
  USER_SUBSCRIPTION_PLAN_PRICES,
  billingDetailsOptions,
  type AllowedSubscriptionInterval,
} from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { VideoModal } from '../VideoModal';
import { CredibilityStats } from './CredibilityStats';
import { FeatureCard } from './FeatureCard';
import { StatsItem } from './StatsItem';
import { features, paidFeaturesList } from './constants';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UpdatePlanConfirmation } from '../Billing/UpdatePlanConfirmation';

export function PremiumPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] =
    useState<AllowedSubscriptionInterval | null>(null);

  // State for plan switching confirmation modal
  const [switchPlanDetails, setSwitchPlanDetails] =
    useState<(typeof USER_SUBSCRIPTION_PLAN_PRICES)[number] | null>(null);

  const toast = useToast();

  useEffect(() => {
    window?.fireEvent?.({
      action: 'tutor_pricing',
      category: 'ai_tutor',
      label: 'Clicked Upgrade to Pro',
    });
  }, []);

  const {
    mutate: createCheckoutSession,
    isPending: isCreatingCheckoutSession,
  } = useMutation(
    {
      mutationFn: (body: {
        priceId: string;
        success?: string;
        cancel?: string;
      }) => {
        return httpPost<{ checkoutUrl: string }>(
          '/v1-create-subscription-checkout-session',
          body,
        );
      },
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error?.message || 'Failed to create checkout session');
      },
    },
    queryClient,
  );

  const monthlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === 'month',
  );
  const yearlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === 'year',
  );

  const { data: billingDetails } = useQuery(
    billingDetailsOptions(),
    queryClient,
  );

  const isSubscriptionCanceled = ['canceled', 'incomplete_expired'].includes(
    billingDetails?.status || '',
  );
  const currentPriceId = isSubscriptionCanceled ? null : billingDetails?.priceId;

  const currentPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === currentPriceId,
  );

  const activeVideoStartTime =
    features.find((feature) => feature.videoId === activeVideoId)?.startTime ||
    '0';

  function handleUpgrade(plan: (typeof USER_SUBSCRIPTION_PLAN_PRICES)[number]) {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (!plan) {
      return;
    }

    setSelectedPlan(plan.interval);

    // If user already has an active subscription and is selecting a different plan, initiate switch flow
    if (currentPriceId && plan.priceId !== currentPriceId) {
      setSwitchPlanDetails(plan);
      return;
    }

    const currentUrlPath = window.location.pathname;
    const encodedCurrentUrlPath = encodeURIComponent(currentUrlPath);
    const successPage = `/thank-you?next=${encodedCurrentUrlPath}&s=1`;

    window?.fireEvent?.({
      action: 'tutor_checkout',
      category: 'ai_tutor',
      label: 'Checkout Started',
    });

    createCheckoutSession(
      {
        priceId: plan.priceId,
        success: successPage,
        cancel: `${currentUrlPath}?s=0`,
      },
      {
        onSuccess: () => {
          window?.fireEvent?.({
            action: `tutor_checkout_${plan.interval === 'month' ? 'mo' : 'an'}`,
            category: 'ai_tutor',
            label: `${plan.interval} Plan Checkout Started`,
          });
        },
      },
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="mx-auto mb-10 max-w-4xl lg:mb-20">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                Unlock All Premium Features
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-balance text-white md:text-5xl">
              Learn Faster with AI
            </h1>
            <p className="mb-8 text-lg text-balance text-slate-400 md:text-xl">
              Generate unlimited courses about any topic, get career guidance
              and instant answers from AI, test your skills and more
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="group block rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-8 py-4 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-3 text-lg text-white sm:hidden">
                  Upgrade now
                </span>
                <span className="hidden items-center justify-center gap-3 text-lg sm:flex">
                  <span className="font-medium text-indigo-100">
                    Upgrade for just
                  </span>
                  <span className="font-bold text-white">$10/month</span>
                  <span className="text-white transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <button
                data-demo-button="true"
                onClick={() => {
                  if (isLoggedIn()) {
                    window.location.href = '/ai';
                  } else {
                    showLoginPopup();
                  }
                }}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-purple-500/30 bg-transparent px-6 py-4 text-base font-medium text-purple-500 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-300/30 focus:outline-none active:ring-0"
              >
                <MousePointerClick className="h-5 w-5" aria-hidden="true" />
                <span className="lg:hidden">Try Demo</span>
                <span className="hidden lg:inline">Try for Free</span>
              </button>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-indigo-200">
                2 months free with yearly plan
              </span>
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:mb-20">
          <StatsItem icon={Users2} text="+2.1M Learners" />
          <StatsItem icon={Bot} text="+160K Roadmaps" />
          <StatsItem icon={Book} text="+150K Courses" />
          <StatsItem icon={Wand2} text="+1M AI Chats" />
        </div>

        <div className="mb-10 lg:mb-20">
          <p className="mb-8 text-center text-sm text-slate-400">
            <PartyPopper className="relative -top-0.5 mr-2 inline-block h-4 w-4 text-blue-400" />
            Paid users{' '}
            <span className="font-bold text-blue-400">
              get unlimited access
            </span>{' '}
            to all the features below.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.videoId || `coming-soon-${index}`}
                title={feature.title}
                description={feature.description}
                videoId={feature.videoId}
                thumbnail={feature.thumbnail}
                duration={feature.duration}
                isComingSoon={feature.isComingSoon}
                onClick={
                  feature.videoId
                    ? () => setActiveVideoId(feature.videoId)
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <CredibilityStats />

        <div className="mb-20 pt-10" id="pricing">
          <h2 className="mb-6 text-center text-3xl font-bold text-white lg:mb-12">
            Choose Your Plan
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">Monthly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$10</span>
                  <span className="text-slate-400">/ month</span>
                </div>
                <p className="mt-2 text-slate-400">
                  Perfect for continuous learning
                </p>
              </div>
              <button
                onClick={() => handleUpgrade(monthlyPlan!)}
                disabled={
                  isCreatingCheckoutSession || currentPlan?.interval === 'month'
                }
                className={`mb-8 w-full rounded-lg px-6 py-3 font-medium transition-colors disabled:opacity-50  ${
                  currentPlan?.interval === 'month'
                    ? 'bg-gray-800 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCreatingCheckoutSession && selectedPlan === 'month' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Processing...
                  </span>
                ) : currentPlan?.interval === 'month' ? (
                  'Current Plan'
                ) : currentPlan ? (
                  'Switch to Monthly Plan'
                ) : (
                  'Start Monthly Plan'
                )}
              </button>
              <ul className="space-y-4 text-slate-300">
                {paidFeaturesList.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl border-2 border-blue-400 bg-slate-800/50 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Yearly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$100</span>
                  <span className="text-slate-400">/ year</span>
                </div>
                <p className="mt-2 font-medium text-blue-400">
                  Save $20 (2 months free)
                </p>
              </div>
              <button
                onClick={() => handleUpgrade(yearlyPlan!)}
                disabled={
                  isCreatingCheckoutSession || currentPlan?.interval === 'year'
                }
                className={`mb-8 w-full rounded-lg px-6 py-3 font-medium transition-colors disabled:opacity-50  ${
                  currentPlan?.interval === 'year'
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCreatingCheckoutSession && selectedPlan === 'year' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Processing...
                  </span>
                ) : currentPlan?.interval === 'year' ? (
                  'Current Plan'
                ) : currentPlan ? (
                  'Switch to Yearly Plan'
                ) : (
                  'Start Yearly Plan'
                )}
              </button>
              <ul className="space-y-4 text-slate-300">
                {paidFeaturesList.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {activeVideoId && (
        <VideoModal
          videoId={activeVideoId}
          startTime={activeVideoStartTime}
          onClose={() => setActiveVideoId(null)}
        />
      )}

      {switchPlanDetails && (
        <UpdatePlanConfirmation
          planDetails={switchPlanDetails}
          onClose={() => setSwitchPlanDetails(null)}
          onCancel={() => setSwitchPlanDetails(null)}
        />
      )}
    </div>
  );
}
