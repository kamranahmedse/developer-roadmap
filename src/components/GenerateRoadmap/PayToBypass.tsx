import { useId } from 'react';

export function PayToBypass() {
  const amountId = `py:${useId()}`;
  const roadmapCountId = `rc:${useId()}`;
  const usageId = `us:${useId()}`;
  const feedbackId = `fb:${useId()}`;

  return (
    <>
      <p className="text-gray-700">
        This feature is still in beta. Are you interested in paying to bypass
        the limit? Let us know.
      </p>

      <form className="mt-4 flex flex-col gap-3">
        <div>
          <label htmlFor={amountId} className="mb-2 block text-sm">
            How much are you willing to pay for this?
          </label>
          <input
            id={amountId}
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
            required
            className="placeholder-text-gray-400 block min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="How many roadmaps you will be generating (daily, or monthly)?"
          />
        </div>
        <div>
          <label htmlFor={usageId} className="mb-2 block text-sm">
            How will you be using this
          </label>
          <textarea
            id={usageId}
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
            required
            className="placeholder-text-gray-400 block min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Do you have any feedback?"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-300 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-2 text-white hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
