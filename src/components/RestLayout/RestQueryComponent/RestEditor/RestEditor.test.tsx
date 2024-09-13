import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RestEditor from '@/components/RestLayout/RestQueryComponent/RestEditor/RestEditor';

describe('RestEditor', () => {
  it('RestEditor format the json', async () => {
    const onChange = vi.fn();
    const { getByAltText } = render(
      <RestEditor
        text={'{    "a": 90,    "b": "37"}'}
        language={'json'}
        onChange={onChange}
      />,
    );

    const user = userEvent.setup();
    await user.click(getByAltText('Prettify'));
    expect(onChange).toHaveBeenCalledWith(`{
    "a": 90,
    "b": "37"
}`);
  });

  it('RestEditor format do nothing with empty string', async () => {
    const onChange = vi.fn();
    const { getByAltText } = render(
      <RestEditor text={''} language={'json'} onChange={onChange} />,
    );

    const user = userEvent.setup();
    await user.click(getByAltText('Prettify'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('RestEditor format do nothing with not JSON string', async () => {
    const onChange = vi.fn();
    const { getByAltText } = render(
      <RestEditor text={'78{:"test"'} language={'json'} onChange={onChange} />,
    );

    const user = userEvent.setup();
    await user.click(getByAltText('Prettify'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
