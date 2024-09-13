import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KeyValueEditor from './KeyValueEditor';
import userEvent from '@testing-library/user-event';
describe('KeyValueEditor', () => {
  const initialValue = { search: 'sk' };
  const onChange = (): void => {};

  it('rendered with empty default values', async () => {
    render(<KeyValueEditor defaultValues={{}} onChange={onChange} />);
    const keyInput = screen.getByPlaceholderText('Key');
    expect(keyInput).toBeDefined();
    const valueInput = screen.getByPlaceholderText('Value');
    expect(valueInput).toBeDefined();
  });

  it('rendered with default values', async () => {
    render(<KeyValueEditor defaultValues={initialValue} onChange={onChange} />);
    const firstKeyInput = screen.getByDisplayValue('search');
    expect(firstKeyInput).toBeDefined();
    const firstValueInput = screen.getByDisplayValue('sk');
    expect(firstValueInput).toBeDefined();

    const user = userEvent.setup();

    await user.type(screen.getAllByDisplayValue('')[0], 'page');
    await user.type(screen.getAllByDisplayValue('')[0], '2');
    expect(screen.getByDisplayValue('page')).toBeDefined();
    expect(screen.getByDisplayValue('2')).toBeDefined();

    const rowsCount = screen.getAllByRole('button').length;
    await user.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('button').length).toBe(rowsCount - 1);
  });
});
