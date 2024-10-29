import { type FC } from 'react';
import {
  BubbleMenu,
  type BubbleMenuProps,
  isTextSelection,
} from '@tiptap/react';
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  Underline,
} from 'lucide-react';
import { cn } from '../../lib/classname';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon?: typeof BoldIcon;
}

export type NoteContentBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const NoteContentBubbleMenu: FC<NoteContentBubbleMenuProps> = (
  props,
) => {
  const { editor } = props;

  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor?.isActive('bold')!,
      command: () => editor?.chain().focus().toggleBold().run()!,
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => editor?.isActive('italic')!,
      command: () => editor?.chain().focus().toggleItalic().run()!,
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => editor?.isActive('underline')!,
      command: () => editor?.chain().focus().toggleUnderline().run()!,
      icon: Underline,
    },
    {
      name: 'strike',
      isActive: () => editor?.isActive('strike')!,
      command: () => editor?.chain().focus().toggleStrike().run()!,
      icon: StrikethroughIcon,
    },
  ];

  const bubbleMenuProps: NoteContentBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor, state, from, to }) => {
      const { doc, selection } = state;
      const { empty } = selection;

      // Sometime check for `empty` is not enough.
      // Doubleclick an empty paragraph returns a node size of 2.
      // So we check also for an empty text size.
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(state.selection);

      if (empty || isEmptyTextBlock || !editor.isEditable) {
        return false;
      }

      return true;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-0.5"
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.command}
          className={cn(
            'flex h-7 w-7 items-center justify-center gap-2 rounded-md hover:bg-zinc-700',
            item.isActive() && 'bg-zinc-700',
          )}
        >
          {item.icon && <item.icon size={18} />}
        </button>
      ))}
    </BubbleMenu>
  );
};
