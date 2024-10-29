import TextStyle from '@tiptap/extension-text-style';
import {
  Editor as TiptapEditor,
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { useEffect } from 'react';
import Underline from '@tiptap/extension-underline';
import { NoteContentBubbleMenu } from './NoteContentBubbleMenu';

type NoteContentEditorProps = {
  onMount?: (editor: TiptapEditor) => void;
  onUpdate?: (editor: TiptapEditor) => void;
  defaultContent?: string;
};

export function NoteContentEditor(props: NoteContentEditorProps) {
  const { onMount, defaultContent, onUpdate } = props;

  const editor = useEditor({
    extensions: [
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Markdown,
      Underline,
    ],
    content: defaultContent || '',
    editorProps: {
      attributes: {
        class:
          'note-content-editor course-content p-4 focus:outline-none prose prose-sm prose-invert h-full',
      },
    },
    onCreate(props) {
      onMount?.(props?.editor as TiptapEditor);
    },
    onUpdate(props) {
      onUpdate?.(props?.editor as TiptapEditor);
    },
  });

  useEffect(() => {
    if (!editor || !defaultContent) {
      return;
    }

    editor?.commands.setContent(defaultContent);
  }, [defaultContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <NoteContentBubbleMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="relative"
        onKeyDown={(e) => {
          // Prevent backspace from deleting the node
          if (e.key === 'Backspace') {
            e.stopPropagation();
            // CMD + A prevent default
          } else if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
            e.stopPropagation();
          } else if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
            e.stopPropagation();
          } else if (e.key === 'z' && e.shiftKey && e.metaKey) {
            e.stopPropagation();
          }
        }}
        onCopy={(e) => {
          e.stopPropagation();
        }}
        onCut={(e) => {
          e.stopPropagation();
        }}
        onPaste={(e) => {
          e.stopPropagation();
        }}
      />
    </>
  );
}
