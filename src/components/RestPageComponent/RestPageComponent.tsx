'use client';
import { HttpMethod, httpMethodsList } from 'constants/methodTypes';
import { ChangeEvent, useState } from 'react';

import styles from './RestPageComponent.module.scss';

export default function RestPageComponent({
  params: { method },
}: {
  params: { method: HttpMethod | string };
}) {
  const [root, setRoot] = useState('');
  const [methodType, setMethodType] = useState(method);
  const [response, setResponse] = useState('');

  const onMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMethodType(e.target.value);
  };

  const onRootChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoot(e.target.value);
  };

  const onSubmit = async () => {
    const response = await fetch(root);
    const json = await response.json();
    setResponse(JSON.stringify(json));
  };

  return (
    <div className={styles.rest}>
      <div className={styles.rest__row}>
        <select
          className={styles.rest__method}
          onChange={onMethodChange}
          defaultValue={method}
        >
          {httpMethodsList.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={styles.rest__url}
          value={root}
          onChange={onRootChange}
          placeholder="Enter URL or paste the text"
        />
        <button onClick={onSubmit}>Send</button>
      </div>

      <textarea readOnly value={response} />
    </div>
  );
}
