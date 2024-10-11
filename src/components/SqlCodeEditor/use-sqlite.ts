import { useEffect, useState } from 'react';
import initSqlJs, { type SqlJsStatic } from 'sql.js';

export function useSqlite() {
  const [sql, setSql] = useState<SqlJsStatic | null>(null);

  useEffect(() => {
    (async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => {
          return `https://sql.js.org/dist/${file}`;
        },
      });

      setSql(SQL);
    })();
  }, []);

  return sql;
}
