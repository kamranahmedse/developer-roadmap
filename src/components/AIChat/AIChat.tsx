import { FileUpIcon, PersonStandingIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import AutogrowTextarea from 'react-textarea-autosize';
import { QuickHelpPrompts } from './QuickHelpPrompts';
import { QuickActionButton } from './QuickActionButton';

export function AIChat() {
  const [message, setMessage] = useState('');

  const shouldShowQuickHelpPrompts = message.length === 0;

  return (
    <div className="mx-auto flex h-screen w-full max-w-xl flex-col gap-2">
      <div className="grow">
        {shouldShowQuickHelpPrompts && <QuickHelpPrompts />}
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <QuickActionButton
            icon={PersonStandingIcon}
            label="Personalized Response"
            onClick={() => {}}
          />
          <QuickActionButton
            icon={FileUpIcon}
            label="Upload Resume"
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col gap-2 rounded-lg rounded-b-none border border-b-0 border-gray-200 p-2.5">
          <AutogrowTextarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-10 w-full resize-none bg-transparent text-sm focus:outline-none"
            placeholder="Ask me anything..."
          />
          <div className="flex justify-end">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-gray-200">
              <SendIcon className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
