import './ChatEditor.css';

import {
  Editor,
  EditorContent,
  useEditor,
  type JSONContent,
} from '@tiptap/react';
import DocumentExtension from '@tiptap/extension-document';
import ParagraphExtension from '@tiptap/extension-paragraph';
import TextExtension from '@tiptap/extension-text';
import Placeholder from '@tiptap/extension-placeholder';
import { VariableExtension } from './VariableExtension/VariableExtension';
import { variableSuggestion } from './VariableExtension/VariableSuggestion';
import { queryClient } from '../../stores/query-client';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { useQuery } from '@tanstack/react-query';
import { useEffect, type RefObject } from 'react';
import { roadmapDetailsOptions } from '../../queries/roadmap';

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

type ChatEditorProps = {
  editorRef: RefObject<Editor | null>;
  roadmapId: string;
  onSubmit: (content: JSONContent) => void;
};

export function ChatEditor(props: ChatEditorProps) {
  const { roadmapId, onSubmit, editorRef } = props;

  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );
  const { data: roadmapDetailsData } = useQuery(
    roadmapDetailsOptions(roadmapId),
    queryClient,
  );

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
          // check if the variable suggestion list is focused
          // if it is, return false so the default behavior is not triggered
          const variableSuggestionList = document.getElementById(
            'variable-suggestion-list',
          );
          if (variableSuggestionList) {
            return false;
          }

          event.preventDefault();
          onSubmit(editor.getJSON());
          return true;
        }

        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          editor.commands.insertContent([
            { type: 'text', text: ' ' },
            { type: 'paragraph' },
          ]);
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      editorRef.current = editor;
    },
    onDestroy: () => {
      editorRef.current = null;
    },
  });

  useEffect(() => {
    if (!editor || !roadmapTreeData || !roadmapDetailsData) {
      return;
    }

    editor.storage.variable.variables = roadmapTreeData.map((mapping) => {
      return {
        id: mapping.nodeId,
        // to remove the title of the roadmap
        // and only keep the path
        // e.g. "Roadmap > Topic > Subtopic" -> "Topic > Subtopic"
        label: mapping.text.split(' > ').slice(1).join(' > '),
      };
    });
  }, [editor, roadmapTreeData, roadmapDetailsData]);

  return (
    <div className="chat-editor w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
