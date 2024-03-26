import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';

type PayToBypassProps = {
  onBack: () => void;
};

export function PayToBypass(props: PayToBypassProps) {
  const { onBack } = props;
  const user = useAuth();

  const userId = 'entry.1665642993';
  const nameId = 'entry.527005328';
  const emailId = 'entry.982906376';
  const amountId = 'entry.1826002937';
  const roadmapCountId = 'entry.1161404075';
  const usageId = 'entry.535914744';
  const feedbackId = 'entry.1024388959';

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-sm leading-none hover:opacity-70 focus:outline-none"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      <h2 className="text-xl font-medium text-gray-800">Pay to Bypass</h2>
      <p className="mt-2 text-sm text-gray-700">
        This feature is still in beta. Are you interested in paying to bypass
        the limit? Let us know.
      </p>

      <form
        className="mt-4 flex flex-col gap-3"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeec1oboTc9vCWHxmoKsC5NIbACpQEk7erp8wBKJMz-nzC7LQ/formResponse"
        target="_blank"
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={userId} className="sr-only">
            User Id
          </label>
          <input
            id={userId}
            name={userId}
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How much are you willing to pay for this?"
            value={user?.id}
            readOnly
          />
        </div>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            name={nameId}
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How much are you willing to pay for this?"
            value={user?.name}
            readOnly
          />
        </div>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={emailId} className="sr-only">
            Email
          </label>
          <input
            id={emailId}
            name={emailId}
            type="email"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How much are you willing to pay for this?"
            value={user?.email}
            readOnly
          />
        </div>

        <div>
          <label htmlFor={amountId} className="mb-2 block text-sm">
            How much are you willing to pay for this?
          </label>
          <input
            id={amountId}
            name={amountId}
            type="text"
            required
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How much are you willing to pay for this?"
          />
        </div>
        <div>
          <label htmlFor={roadmapCountId} className="mb-2 block text-sm">
            How many roadmaps you will be generating (daily, or monthly)?
          </label>
          <textarea
            id={roadmapCountId}
            name={roadmapCountId}
            required
            className="placeholder-text-gray-400 block min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How many roadmaps you will be generating (daily, or monthly)?"
          />
        </div>
        <div>
          <label htmlFor={usageId} className="mb-2 block text-sm">
            How will you be using this?
          </label>
          <textarea
            id={usageId}
            name={usageId}
            required
            className="placeholder-text-gray-400 block min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How will you be using this"
          />
        </div>
        <div>
          <label htmlFor={feedbackId} className="mb-2 block text-sm">
            Do you have any feedback?
          </label>
          <textarea
            id={feedbackId}
            name={feedbackId}
            className="placeholder-text-gray-400 block min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Do you have any feedback?"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="disbaled:opacity-60 w-full rounded-lg border border-gray-300 py-2 hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="disbaled:opacity-60 w-full rounded-lg bg-gray-900 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
