import { ReactRenderer } from '@tiptap/react';
import type { SuggestionOptions } from '@tiptap/suggestion';
import tippy, { type GetReferenceClientRect } from 'tippy.js';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '../../../lib/classname';
import type { VariableStorage, VariableType } from './VariableExtension';

export type VariableListProps = {
  command: (variable: VariableType) => void;
  items: VariableType[];
} & SuggestionOptions;

export const VariableList = forwardRef((props: VariableListProps, ref) => {
  const { items, command } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (!item) {
      return;
    }

    command(item);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % items.length);
        return true;
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  return (
    <div
      id="variable-suggestion-list"
      className="flex max-w-[260px] flex-col gap-0.5 overflow-auto rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
    >
      {items.length ? (
        items.map((item, index) => (
          <button
            className={cn(
              'truncate rounded-md p-1 px-1.5 text-left text-sm hover:bg-gray-100',
              index === selectedIndex && 'bg-gray-100',
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item?.label}
          </button>
        ))
      ) : (
        <div className="rounded-md p-1 px-1.5 text-left text-sm">No result</div>
      )}
    </div>
  );
});

VariableList.displayName = 'VariableList';

export function variableSuggestion(): Omit<SuggestionOptions, 'editor'> {
  return {
    items: ({ editor, query }) => {
      const storage = editor.storage.variable as VariableStorage;

      return storage.variables
        .filter((variable) =>
          variable?.label?.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer<any>;
      let popup: InstanceType<any> | null = null;

      return {
        onStart: (props) => {
          component = new ReactRenderer(VariableList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect as GetReferenceClientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'top-start',
          });
        },

        onUpdate(props) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  };
}
