import './ChatEditor.css';

import { EditorContent, useEditor } from '@tiptap/react';
import DocumentExtension from '@tiptap/extension-document';
import ParagraphExtension from '@tiptap/extension-paragraph';
import TextExtension from '@tiptap/extension-text';
import Placeholder from '@tiptap/extension-placeholder';
import { VariableExtension } from './VariableExtension/VariableExtension';
import { variableSuggestion } from './VariableExtension/VariableSuggestion';

const extensions = [
  DocumentExtension,
  ParagraphExtension,
  TextExtension,
  Placeholder.configure({
    placeholder: 'Ask AI anything about the roadmap...',
  }),
  VariableExtension.configure({
    suggestion: variableSuggestion(),
  }),
];

const content = '<p></p>';

export function ChatEditor() {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none w-full p-2',
      },
      handleKeyDown(_, event) {
        if (!editor) {
          return false;
        }

        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          return true;
        }

        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          editor.commands.insertContent('<p></p>');
          return true;
        }

        return false;
      },
    },
  });

  return (
    <div className="chat-editor w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
