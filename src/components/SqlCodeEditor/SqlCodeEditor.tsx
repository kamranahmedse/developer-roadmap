import { useRef, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../Resizable';
import { SqlTableResult } from './SqlTableResult';
import { type QueryExecResult } from 'sql.js';
import { useSqlEditor } from './use-sql-editor';
import { sql } from '@codemirror/lang-sql';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { Check, type LucideIcon, Play, WandSparkles, X } from 'lucide-react';
import { useSqlite } from './use-sqlite';
import { cn } from '../../lib/classname';
import { currentLesson } from '../../stores/course';
import { useStore } from '@nanostores/react';

export type SqlCodeEditorProps = {
  defaultValue?: string;

  initSteps?: string[];
  expectedResults?: QueryExecResult[];
};

export function SqlCodeEditor(props: SqlCodeEditorProps) {
  const { defaultValue, initSteps = [], expectedResults } = props;

  const $currentLesson = useStore(currentLesson);
  const editorRef = useRef<HTMLDivElement>(null);
  const [queryResults, setQueryResults] = useState<QueryExecResult[] | null>(
    null,
  );
  const [queryError, setQueryError] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const formatQuery = async (query: string) => {
    const { format } = await import('sql-formatter');
    const formatted = format(query, {
      expressionWidth: 40,
      language: 'sql',
      keywordCase: 'upper',
    });
    return formatted;
  };

  const sqlite = useSqlite();

  const editor = useSqlEditor({
    container: editorRef,
    value: defaultValue,
    extensions: [
      sql({
        upperCaseKeywords: true,
        schemas: [],
      }),
      Prec.highest(
        keymap.of([
          {
            key: 'Mod-s',
            run: (view) => {
              const query = view.state.doc.toString();
              formatQuery(query).then((formatted) => {
                view.dispatch({
                  changes: {
                    from: 0,
                    to: view.state.doc.length,
                    insert: formatted,
                  },
                });
              });

              return true;
            },
          },
        ]),
      ),
    ],
  });

  const handleQuery = (query: string) => {
    try {
      if (!sqlite) {
        throw new Error('SQLite is not initialized');
      }

      const db = new sqlite.Database();
      initSteps.forEach((step) => {
        db.exec(step);
      });

      const results = db.exec(query);
      db.close();
      return {
        results,
        error: undefined,
      };
    } catch (error) {
      const err = error as Error;
      return {
        results: null,
        error: err.message,
      };
    }
  };

  const isCorrectAnswer =
    queryResults &&
    expectedResults &&
    queryResults.every((result, index) => {
      const expected = expectedResults[index];
      return (
        result.columns.length === expected.columns.length &&
        result.values.length === expected.values.length &&
        result.columns.every((column, i) => column === expected.columns[i]) &&
        result.values.every((row, i) =>
          row.every((cell, j) => cell === expected.values[i][j]),
        )
      );
    });

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={65} className="flex flex-col">
        <div className="relative grow">
          <div
            id="editor"
            ref={editorRef}
            data-enable-grammarly={false}
            className="absolute inset-x-0 inset-y-2 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;] [&>div]:h-full"
          ></div>
        </div>

        <div
          className={cn(
            'flex items-center justify-end gap-1 border-t border-zinc-800 p-2',
            isSubmitted && 'justify-between',
          )}
        >
          {isSubmitted && isCorrectAnswer && (
            <div className="flex items-center gap-1 text-sm text-green-500">
              <Check className="h-4 w-4" />
              <span>Correct</span>
            </div>
          )}

          {isSubmitted && !isCorrectAnswer && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <X className="h-4 w-4" />
              <span>Incorrect</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <DatabaseActionButton
              icon={WandSparkles}
              onClick={async () => {
                const query = editor?.state?.doc.toString();
                if (!query) {
                  return;
                }

                const formatted = await formatQuery(query);
                editor?.dispatch({
                  changes: {
                    from: 0,
                    to: editor?.state?.doc.length,
                    insert: formatted,
                  },
                });
              }}
            />

            <DatabaseActionButton
              icon={Play}
              onClick={() => {
                const query = editor?.state?.doc.toString();
                if (!query) {
                  return;
                }

                const { results, error } = handleQuery(query);
                setQueryResults(results);
                setQueryError(error);
                setIsSubmitted(true);

                if (!$currentLesson) {
                  console.error('FIX: update current lesson');
                  return;
                }

                currentLesson.set({
                  ...$currentLesson,
                  challengeStatus: error ? 'wrong' : 'correct',
                });
              }}
            />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle={true} />

      <ResizablePanel defaultSize={35}>
        <SqlTableResult results={queryResults} error={queryError} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

type DatabaseActionButtonProps = {
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  className?: string;
};

function DatabaseActionButton(props: DatabaseActionButtonProps) {
  const { icon: Icon, label, onClick, className } = props;

  return (
    <button
      className={cn(
        'flex h-[30px] min-w-[30px] items-center justify-center gap-1.5 rounded-md p-1 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white focus:outline-none',
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label && <span>{label}</span>}
    </button>
  );
}
