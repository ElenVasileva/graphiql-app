import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';

import SimpleInput from './SimpleInput';

describe('SimpleInput Component', () => {
  test('renders the component correctly', () => {
    render(
      <SimpleInput
        label="Test Label"
        value="Initial Value"
        onBlur={() => {}}
      />,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Initial Value');
  });

  test('initializes with the correct value from props', () => {
    render(
      <SimpleInput
        label="Test Label"
        value="Initial Value"
        onBlur={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('Initial Value');
  });

  test('calls onBlur with the correct value when input loses focus', () => {
    const handleBlur = vi.fn();
    render(
      <SimpleInput
        label="Test Label"
        value="Initial Value"
        onBlur={handleBlur}
      />,
    );

    fireEvent.blur(screen.getByRole('textbox'));

    expect(handleBlur).toHaveBeenCalledWith('Initial Value');
  });

  test('updates value when input changes', () => {
    render(
      <SimpleInput
        label="Test Label"
        value="Initial Value"
        onBlur={() => {}}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New Value' },
    });

    expect(screen.getByRole('textbox')).toHaveValue('New Value');
  });

  test('updates value when props.value changes', () => {
    const { rerender } = render(
      <SimpleInput
        label="Test Label"
        value="Initial Value"
        onBlur={() => {}}
      />,
    );

    rerender(
      <SimpleInput
        label="Test Label"
        value="Updated Value"
        onBlur={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('Updated Value');
  });
});
