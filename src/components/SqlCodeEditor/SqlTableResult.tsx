import { ServerCrash } from 'lucide-react';
import type { QueryExecResult } from 'sql.js';

type SqlTableResultProps = {
  results: QueryExecResult[] | null;
  error?: string;

  onTryAgain?: () => void;

  matchAnswers?: boolean;
  expectedResults?: QueryExecResult[] | null;
};

export function SqlTableResult(props: SqlTableResultProps) {
  const {
    results,
    error,
    onTryAgain,
    expectedResults,
    matchAnswers = false,
  } = props;

  const isCorrectAnswer =
    results &&
    expectedResults &&
    results.length === expectedResults.length &&
    results.every((result, index) => {
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
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        {!isCorrectAnswer && results && expectedResults && matchAnswers && (
          <div className="border-b border-zinc-800 p-1 py-8 text-sm">
            <p className="text-balance text-center">
              Wrong answer! Do you want to try again?
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                className="rounded-md bg-zinc-800 px-2 py-0.5 outline-none focus:outline-none"
                onClick={onTryAgain}
              >
                Yes, I want to try again
              </button>
            </div>
          </div>
        )}

        {error && !results && (
          <div className="mt-4 flex flex-col items-center justify-center p-2 text-center text-red-500">
            <ServerCrash className="h-8 w-8" />
            <span className="mt-4">{error}</span>
          </div>
        )}

        {results && (
          <>
            {results.length === 0 && (
              <p className="p-2 text-sm uppercase text-zinc-200">Ok</p>
            )}
            {results.map((result, index) => {
              return (
                <table key={index} className="m-px text-left font-mono">
                  <thead>
                    <tr>
                      {result.columns.map((column, i) => (
                        <th
                          key={i}
                          className="border border-zinc-800 p-1 px-2 font-normal text-white"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.values.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, index) => (
                          <td
                            key={index}
                            className="border border-zinc-800 p-1 px-2 font-normal text-white"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
