'use client';

import Link from 'next/link';

import useLocalStorage from 'hooks/useLocalStorage';
import timeToString from 'utils/timeToString';

import LSName from 'constants/LSName';

import styles from './HistoryTable.module.scss';
import parseUrl from '@/utils/parseUrl';

function trimString(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export default function Table() {
  const [items] = useLocalStorage<{
    time: number;
    url: string;
    type: string;
  }>(LSName);

  if (!items)
    return (
      <div>
        <span>
          You haven&apos;t executed any requests yet. Try those options:&#x20;
        </span>
        <Link className={styles.link} href="/RESTFUL">
          RestFul
        </Link>
        <span>&#x20;and&#x20;</span>
        <Link className={styles.link} href="/GRAPHQL">
          GraphQL
        </Link>
      </div>
    );

  return (
    <div className={styles.table}>
      <div className={styles.header}>Time</div>
      <div className={styles.header}>Type</div>
      <div className={styles.header}>Endpoint</div>
      <div className={styles.header}>Query</div>
      <div className={styles.header}>Url</div>
      {items &&
        items.map((el) =>
          [
            <div key={`cell_${el.time}_time`}>{timeToString(el.time)}</div>,
            <div key={`cell_${el.time}_type`}>{el.type}</div>,
            <div key={`cell_${el.time}_type`}>
              {
                parseUrl(
                  `domain/${el.type}${el.url}`,
                  new URL(`https://domain/${el.type}${el.url}`).searchParams,
                ).endpoint
              }
            </div>,
            <div key={`cell_${el.time}_type`}>
              {
                parseUrl(
                  `domain/${el.type}${el.url}`,
                  new URL(`https://domain/${el.type}${el.url}`).searchParams,
                ).query
              }
            </div>,
            <div key={`cell_${el.time}_url`}>
              <Link
                className={styles.link}
                key={`${el.time}_url`}
                href={`${el.type}/${el.url}`}
              >
                {trimString(el.url, 20)}
              </Link>
            </div>,
          ].flat(),
        )}
    </div>
  );
}
