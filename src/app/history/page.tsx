import dynamic from 'next/dynamic';

const NoSSRHistoryTable = dynamic(
  () => import('components/HistoryTable/HistoryTable'),
  { ssr: false },
);

export default function Page() {
  return <NoSSRHistoryTable />;
}
