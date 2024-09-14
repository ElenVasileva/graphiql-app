import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import FormGraphQl from './FormGraphQl';

import generateUrlGraphQl from 'utils/generateUrlGraphQl';
import useUrl from 'hooks/useUrl';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('utils/generateUrlGraphQl', () => ({
  default: vi.fn(),
}));
vi.mock('hooks/useUrl', () => ({
  default: vi.fn(),
}));
vi.mock('./Documentation/Documentation', () => ({
  default: () => <div data-testid="documentation">Mocked Documentation</div>,
}));

const mockOnSubmit = vi.fn();
const mockPush = vi.fn();

const mockRouter = {
  push: mockPush,
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
} as unknown as ReturnType<typeof useRouter>;

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useRouter).mockReturnValue(mockRouter);
  vi.mocked(generateUrlGraphQl).mockReturnValue('mocked-url');
  vi.mocked(useUrl).mockReturnValue({
    type: 'GRAPHQL',
    endpoint: '',
    query: '',
    variables: {},
    headers: {},
  });
});

describe('FormGraphQl', () => {
  it('renders correctly', () => {
    render(<FormGraphQl onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Endpoint URL:/)).toBeInTheDocument();
    expect(screen.getByText(/Send/)).toBeInTheDocument();
  });

  it('calls onSubmit with correct parameters when button is clicked', () => {
    render(<FormGraphQl onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText(/Send/));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      '',
      '',
      {},
      { 'Content-Type': 'application/json' },
    );
  });

  it('passes form data correctly to ParameterSection and Documentation components', () => {
    render(<FormGraphQl onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Endpoint URL:/)).toBeInTheDocument();
    expect(screen.getByText(/Send/)).toBeInTheDocument();

    expect(screen.getByTestId('parameter-section')).toBeInTheDocument();
    expect(screen.getByTestId('documentation')).toBeInTheDocument();
  });
});
