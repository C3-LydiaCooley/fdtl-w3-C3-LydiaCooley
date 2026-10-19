import React, { useEffect, useState } from 'react';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { Book, ReadingStatusCount } from '@/Interfaces';
import { fetchBooks, fetchReadingStatusCounts } from '../../shared/api';

const columns: ColumnDef<Book, unknown>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'readingStatus', header: 'Reading Status' },
  { accessorKey: 'shelfOutcome', header: 'Shelf Outcome' },
];

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [counts, setCounts] = useState<ReadingStatusCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setError(null);
        setBooks(await fetchBooks());
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load books';
        setError(errorMessage);
      }
    };

    const loadCounts = async () => {
      try {
        setCounts(await fetchReadingStatusCounts());
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load reading status counts';
        setError(errorMessage);
      }
    };

    loadBooks();
    loadCounts();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Reading List</h1>
      {error && <p role="alert">{error}</p>}
      <DataTable data={books} columns={columns} />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={counts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="readingStatus" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="Books" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
