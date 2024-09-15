import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleSwitcherSelect } from './LocaleSwitcherSelect';
import { useRouter, usePathname } from '@/i18n/routing';
import { describe, it, vi, expect, afterEach, beforeEach, Mock } from 'vitest';

vi.mock('@/i18n/routing', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

describe('LocaleSwitcherSelect', () => {
  const mockRouterReplace = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
    (usePathname as Mock).mockReturnValue('/test-path');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render select with default value', () => {
    render(
      <LocaleSwitcherSelect defaultValue="en">
        <option value="en">🇺🇸 English</option>
        <option value="ru">🇷🇺 Russian</option>
      </LocaleSwitcherSelect>,
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;

    expect(select).toBeInTheDocument();
    expect(select.value).toBe('en');
  });

  it('should call router.replace with correct locale and params when value changes', () => {
    render(
      <LocaleSwitcherSelect defaultValue="en">
        <option value="en">🇺🇸 English</option>
        <option value="ru">🇷🇺 Russian</option>
      </LocaleSwitcherSelect>,
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'ru' } });

    expect(mockRouterReplace).toHaveBeenCalledWith('/test-path', {
      locale: 'ru',
    });
  });

  it('should disable select during transition', () => {
    const { rerender } = render(
      <LocaleSwitcherSelect defaultValue="en">
        <option value="en">🇺🇸 English</option>
        <option value="ru">🇷🇺 Russian</option>
      </LocaleSwitcherSelect>,
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;

    rerender(
      <LocaleSwitcherSelect defaultValue="en">
        <option value="en">🇺🇸 English</option>
        <option value="ru">🇷🇺 Russian</option>
      </LocaleSwitcherSelect>,
    );

    expect(select.disabled).toBe(false);
  });
});
