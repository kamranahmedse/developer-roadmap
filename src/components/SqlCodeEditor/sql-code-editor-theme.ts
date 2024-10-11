import { HighlightStyle } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { tags as t } from '@lezer/highlight';

export const editorDarkTheme = EditorView.theme(
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
      color: '#757575', // Text color for line numbers
      paddingRight: '1em',
    },
    // Scrollbar styles
    '.cm-scroller': {
      paddingRight: '12px',
      paddingLeft: '12px',
    },
    '.cm-scroller::-webkit-scrollbar': {},
    // Highlight active line
    '.cm-activeLine': {
      backgroundColor: '#27272a', // Active line background color
    },
    // Cursor styles
    '.cm-cursor': {
      borderColor: '#f4f4f5',
    },
    // Code line styling for inserted and deleted lines
    '.code-line.inserted': {
      backgroundColor: 'rgba(72, 187, 120, 0.2)', // Green background for inserted lines
    },
    '.code-line.deleted': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red background for deleted lines
    },
    // Highlighted line
    '.highlight-line': {
      borderLeft: '2px solid #EC4899', // Pink border for highlighted line
      backgroundColor: 'rgba(229, 231, 235, 0.4)', // Light gray background for highlighted lines
    },
    '.cm-gutters': {
      backgroundColor: '#18181b',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#27272a',
    },
    '.cm-line': {
      color: '#a1a1aa',
    },
    '.cm-foldPlaceholder': {
      border: 'none',
      backgroundColor: 'transparent',
    },
  },
  {
    dark: true,
  },
);

export const editorDarkHightlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#3B82F6' },
  { tag: t.operator, color: '#F59E0B' },
  { tag: t.variableName, color: '#D946EF' },
  { tag: t.number, color: '#10B981' },
  { tag: t.string, color: '#A855F7' },
  { tag: t.punctuation, color: '#a1a1aa' },
  { tag: t.typeName, color: '#D946EF' },
  { tag: t.attributeName, color: '#A855F7' },
  { tag: t.name, color: '#f4f4f5' },
  { tag: t.comment, color: '#71717a' },
  { tag: t.paren, color: '#a1a1aa' },
]);
