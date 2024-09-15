import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from './global-error';
import { vi, describe, it, expect } from 'vitest';

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
    render(<GlobalError error={new Error('Test error')} reset={vi.fn()} />);

    const titleElement = screen.getByText(/Something went wrong!/i);
    expect(titleElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /main page/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');

    const buttonElement = screen.getByRole('button', { name: /Try again/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the reset function when the "Try again" button is clicked', () => {
    const mockReset = vi.fn();
    render(<GlobalError error={new Error('Test error')} reset={mockReset} />);

    const tryAgainButton = screen.getByText(/Try again/i);
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('contains a link to the main page', () => {
    render(<GlobalError error={new Error('Test error')} reset={vi.fn()} />);

    const mainPageLink = screen.getByText(/main page/i);

    expect(mainPageLink.closest('a')).toHaveAttribute('href', '/');
  });
});
