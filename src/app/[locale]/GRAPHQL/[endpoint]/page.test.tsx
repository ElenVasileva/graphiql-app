import { render } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Page from './page';

describe('Page component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />);

    expect(container.firstChild).toBeNull();
  });
});
