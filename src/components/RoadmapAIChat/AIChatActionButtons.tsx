import { SettingsIcon, Trash2, type LucideIcon } from 'lucide-react';

type AIChatActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

function AIChatActionButton(props: AIChatActionButtonProps) {
  const { icon: Icon, label, onClick } = props;

  return (
    <button
      className="flex hover:bg-gray-100 items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs"
      onClick={onClick}
    >
      <Icon className="size-3" />
      <span>{label}</span>
    </button>
  );
}

type AIChatActionButtonsProps = {
  onTellUsAboutYourSelf: () => void;
  onClearChat: () => void;
};

export function AIChatActionButtons(props: AIChatActionButtonsProps) {
  const { onTellUsAboutYourSelf, onClearChat } = props;

  return (
    <div className="flex gap-2 px-4 pt-2">
      <AIChatActionButton
        icon={SettingsIcon}
        label="Tell us about your self"
        onClick={onTellUsAboutYourSelf}
      />
      <AIChatActionButton
        icon={Trash2}
        label="Clear chat"
        onClick={onClearChat}
      />
    </div>
  );
}
