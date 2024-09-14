import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavigationRequest from './NavigationRequest';
import styles from './NavigationRequest.module.scss';

const navigationList = [
  { key: 'headers', value: 'Headers' },
  { key: 'query', value: 'Query' },
  { key: 'variables', value: 'Variables' },
];

describe('NavigationRequest', () => {
  it('renders navigation buttons correctly', () => {
    render(<NavigationRequest visibleSection="headers" onClick={() => {}} />);

    navigationList.forEach((item) => {
      const button = screen.getByRole('button', { name: item.value });
      expect(button).toBeInTheDocument();

      if (item.key === 'headers') {
        expect(button).toHaveClass(styles.button);
        expect(button).toHaveClass(styles.active);
      } else {
        expect(button).toHaveClass(styles.button);
        expect(button).not.toHaveClass(styles.active);
      }
    });
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = vi.fn();
    render(<NavigationRequest visibleSection="query" onClick={handleClick} />);

    const queryButton = screen.getByRole('button', { name: 'Query' });
    fireEvent.click(queryButton);

    expect(handleClick).toHaveBeenCalled();
  });
});
