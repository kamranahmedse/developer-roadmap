import { HighlightStyle } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { tags as t } from '@lezer/highlight';

export const editorLightTheme = EditorView.theme(
  {
    // Styling for the editor background and text
    '&': {},
    // Styling for the editor when focused
    '&.cm-focused': {
      outline: 'none',
    },
    // Styling for code blocks
    '.cm-content': {},
    // Line number styles
    '.cm-lineNumbers .cm-gutterElement': {
      color: '#6b7280',
      minWidth: '24px',
    },
    // Scrollbar styles
    '.cm-scroller': {
    },
    '.cm-scroller::-webkit-scrollbar': {},
    // Highlight active line
    '.cm-activeLine': {
      backgroundColor: '#f3f4f6',
    },
    // Cursor styles
    '.cm-cursor': {
      borderColor: '#18181b',
    },
    // Code line styling for inserted and deleted lines
    '.code-line.inserted': {
      backgroundColor: 'rgba(72, 187, 120, 0.1)', // Lighter green background for inserted lines
    },
    '.code-line.deleted': {
      backgroundColor: 'rgba(239, 68, 68, 0.05)', // Lighter red background for deleted lines
    },
    // Highlighted line
    '.highlight-line': {
      borderLeft: '2px solid #EC4899', // Keep pink border for highlighted line
      backgroundColor: 'rgba(243, 244, 246, 0.6)', // Very light gray background for highlighted lines
    },
    '.cm-gutters': {
      backgroundColor: '#f9fafb',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#f3f4f6',
    },
    '.cm-line': {
      color: '#374151',
    },
    '.cm-foldPlaceholder': {
      border: 'none',
      backgroundColor: 'transparent',
    },
    '& .cm-foldGutter .cm-gutterElement': {
      paddingLeft: '4px',
    },
  },
  {
    dark: false,
  },
);

export const editorLightHightlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#2563eb' },     // Slightly darker blue
  { tag: t.operator, color: '#d97706' },    // Slightly darker amber
  { tag: t.variableName, color: '#c026d3' }, // Slightly darker fuchsia
  { tag: t.number, color: '#059669' },      // Slightly darker emerald
  { tag: t.string, color: '#7c3aed' },      // Slightly darker violet
  { tag: t.punctuation, color: '#6b7280' }, // Gray-500
  { tag: t.typeName, color: '#c026d3' },    // Slightly darker fuchsia
  { tag: t.attributeName, color: '#7c3aed' }, // Slightly darker violet
  { tag: t.name, color: '#18181b' },        // Dark gray for better contrast
  { tag: t.comment, color: '#9ca3af' },     // Gray-400
  { tag: t.paren, color: '#6b7280' },       // Gray-500
]);
