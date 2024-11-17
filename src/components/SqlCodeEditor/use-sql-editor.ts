import { type RefObject, useEffect, useState } from 'react';
import { Annotation, type Extension } from '@codemirror/state';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { syntaxHighlighting } from '@codemirror/language';
import {
  editorLightHightlightStyle,
  editorLightTheme,
} from './sql-code-editor-theme';

const External = Annotation.define<boolean>();

export interface UseSqlEditorProps {
  value?: string;
  autoFocus?: boolean;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
  onUpdate?: (viewUpdate: ViewUpdate) => void;
  onCreateEditor?: (view: EditorView) => void;

  extensions?: Extension[];
  container?: RefObject<HTMLDivElement>;
}

export function useSqlEditor(props: UseSqlEditorProps) {
  const {
    value: initialValue,
    onChange,
    onCreateEditor,
    onUpdate,
    container,

    extensions = [],
  } = props;

  const [editor, setEditor] = useState<EditorView | null>(null);

  const updateListener = EditorView.updateListener.of((vu) => {
    if (
      vu.docChanged &&
      typeof onChange === 'function' &&
      // Fix echoing of the remote changes:
      // If transaction is market as remote we don't have to call `onChange` handler again
      !vu.transactions.some((tr) => tr.annotation(External))
    ) {
      const doc = vu.state.doc;
      const value = doc.toString();
      onChange(value, vu);
    }

    onUpdate?.(vu);
  });

  useEffect(() => {
    if (!container?.current) {
      return;
    }

    let editorInstance = new EditorView({
      doc: initialValue,
      extensions: [
        basicSetup,
        history(),
        keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
        updateListener,
        editorLightTheme,
        syntaxHighlighting(editorLightHightlightStyle),
        EditorView.contentAttributes.of({
          'data-enable-grammarly': 'false',
        }),
      ].concat(extensions),
      parent: container.current,
    });

    onCreateEditor?.(editorInstance);
    setEditor(editorInstance);

    return () => {
      editorInstance.destroy();
      setEditor(null);
    };
  }, [container]);

  return editor;
}
