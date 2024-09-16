import { render, screen } from '@testing-library/react';
import { PasswordStrength } from './PasswordStrength';
import { describe, it, expect } from 'vitest';
import { evaluatePasswordStrength } from './PasswordStrength';

describe('PasswordStrength', () => {
  it('renders correctly', () => {
    render(<PasswordStrength password="" />);
    const svgElement = screen.getByTestId('password-strength-svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('evaluates password strength correctly', () => {
    expect(evaluatePasswordStrength('')).toBe(0);
    expect(evaluatePasswordStrength('short')).toBe(20);
    expect(evaluatePasswordStrength('longerpassword')).toBe(40);
    expect(evaluatePasswordStrength('LongPassword')).toBe(60);
    expect(evaluatePasswordStrength('LongPassword1')).toBe(80);
    expect(evaluatePasswordStrength('LongPassword1!')).toBe(100);
  });

  it('updates strength when password changes', () => {
    const { getByTestId, rerender } = render(<PasswordStrength password="" />);
    const circle = getByTestId('strength-circle');

    expect(circle).toHaveAttribute('stroke-dashoffset', '56.52');

    rerender(<PasswordStrength password="weak" />);
    expect(circle).toHaveAttribute('stroke-dashoffset', '45.216');

    rerender(<PasswordStrength password="LongPassword1!" />);
    expect(circle).toHaveAttribute('stroke-dashoffset', '0');
  });
});
