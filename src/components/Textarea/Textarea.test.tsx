import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Textarea from './Textarea';

describe('Textarea Component', () => {
  it('should render with initial value and className', () => {
    const { getByRole } = render(
      <Textarea value="Initial Value" className="custom-class" />,
    );
    const textarea = getByRole('textbox');
    expect(textarea).toHaveValue('Initial Value');
    expect(textarea).toHaveClass('custom-class');
  });

  it('should handle text changes', () => {
    const { getByRole } = render(<Textarea value="Initial Value" />);
    const textarea = getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Updated Value' } });
    expect(textarea).toHaveValue('Updated Value');
  });

  it('should call handlerBlur on blur event', () => {
    const handlerBlur = vi.fn();
    const { getByRole } = render(
      <Textarea value="Initial Value" handlerBlur={handlerBlur} />,
    );
    const textarea = getByRole('textbox');
    fireEvent.blur(textarea);
    expect(handlerBlur).toHaveBeenCalledWith('Initial Value');
  });

  it('should not call handlerBlur if not provided', () => {
    const { getByRole } = render(<Textarea value="Initial Value" />);
    const textarea = getByRole('textbox');
    fireEvent.blur(textarea);
  });
});
