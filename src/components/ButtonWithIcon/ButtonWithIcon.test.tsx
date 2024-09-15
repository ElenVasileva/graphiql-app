import { vi, describe, test, expect } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import ButtonWithIcon from './ButtonWithIcon';

describe('ButtonWithIcon component', () => {
  test('renders button with an icon', () => {
    render(<ButtonWithIcon icon="/icon.png" alt={'icon'} />);

    const button = screen.getByRole('button');
    const icon = screen.getByAltText('icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<ButtonWithIcon icon="/icon.png" alt={'icon'} onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when disabled prop is true', () => {
    render(<ButtonWithIcon icon="/icon.png" alt={'icon'} disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('button is not disabled by default', () => {
    render(<ButtonWithIcon icon="/icon.png" alt={'icon'} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});
