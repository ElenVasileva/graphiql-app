import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from './error';
import { vi, describe, it, expect } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: { [key: string]: string } = {
      'Return to': 'Return to',
      'or': 'or',
      'Try again': 'Try again',
    };
    return (key: string) => translations[key] || key;
  },
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('GlobalError component', () => {
  it('renders the error message and buttons', () => {
    const mockReset = vi.fn();
    render(<ErrorPage error={new Error('Test error')} reset={mockReset} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Return to')).toBeInTheDocument();
    expect(screen.getByText('main page')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls the reset function when the "Try again" button is clicked', () => {
    const mockReset = vi.fn();
    render(<ErrorPage error={new Error('Test error')} reset={mockReset} />);

    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('contains a link to the main page', () => {
    render(<ErrorPage error={new Error('Test error')} reset={vi.fn()} />);

    const mainPageLink = screen.getByText('main page');

    expect(mainPageLink.closest('a')).toHaveAttribute('href', '/');
  });
});
