import { vi, describe, test, expect } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import type { ImageProps } from 'next/image';

import ButtonWithIcon from './ButtonWithIcon';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <img {...props} />;
  },
}));

describe('ButtonWithIcon component', () => {
  test('renders button with an icon', () => {
    render(<ButtonWithIcon icon="/icon.png" alt={'icon'} />);

    const button = screen.getByRole('button');
    const icon = screen.getByAltText('icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/icon.png');
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
