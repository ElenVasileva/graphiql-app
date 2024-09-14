import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Layout from './layout';

vi.mock('@/components/GraphQL/GraphQl', () => ({
  default: () => <div>Mocked GraphQL Component</div>,
}));

describe('Layout component', () => {
  it('renders the heading and content container', () => {
    render(<Layout />);

    expect(
      screen.getByRole('heading', { level: 1, name: /GraphQL Client/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('Mocked GraphQL Component')).toBeInTheDocument();
  });
});
