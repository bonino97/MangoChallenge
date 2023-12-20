'use client';
import Link from 'next/link';
import Range from '@/components/Range/Range';
import useAxios from '@/hooks/useAxios';
import { API_NORMAL_RANGE_URL } from '@/utils/urls';

export default function ExcerciseOnePage() {
  const { data, loading, error } = useAxios(API_NORMAL_RANGE_URL);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data...</p>;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <p className='flex w-full justify-center text-center text-2xl uppercase font-bold'>
          Excercise One
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Range min={data.min} max={data.max} />
      </div>

      <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <Link
          href='/'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800/30'
        >
          <h2 className={`text-xl font-semibold`}>
            Home&nbsp;
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
