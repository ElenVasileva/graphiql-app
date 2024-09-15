import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FunctionalEditor from './FunctionalEditor';
import FormGraphQl from './FormGraphQl/FormGraphQl';

vi.mock('./FormGraphQl/FormGraphQl', () => ({
  default: vi.fn(() => <div>Mock FormGraphQl</div>),
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('FunctionalEditor', () => {
  it('renders correctly', () => {
    render(<FunctionalEditor onSubmit={vi.fn()} />);

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Mock FormGraphQl')).toBeInTheDocument();
  });

  it('passes onSubmit prop to FormGraphQl', () => {
    const onSubmitMock = vi.fn();

    render(<FunctionalEditor onSubmit={onSubmitMock} />);

    expect(FormGraphQl).toHaveBeenCalledWith({ onSubmit: onSubmitMock }, {});
  });
});
