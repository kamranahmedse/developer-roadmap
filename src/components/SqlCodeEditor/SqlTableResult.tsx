import { ServerCrash } from 'lucide-react';
import type { QueryExecResult } from 'sql.js';

type SqlTableResultProps = {
  results: QueryExecResult[] | null;
  error?: string;
};

export function SqlTableResult(props: SqlTableResultProps) {
  const { results, error } = props;

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
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
