import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import useUserSession from './useUserSession';
import { onAuthStateChanged } from '@/services/firebase';

vi.mock('@/services/firebase', () => ({
  onAuthStateChanged: vi.fn(),
}));

describe('useUserSession', () => {
  it('should set userUid when authUser is provided', async () => {
    const mockUid = '12345';
    const mockOnAuthStateChanged = vi.fn((callback) => {
      callback({ uid: mockUid });
      return () => {};
    });

    (onAuthStateChanged as unknown as typeof mockOnAuthStateChanged) =
      mockOnAuthStateChanged;

    const TestComponent = () => {
      const userUid = useUserSession(null);
      return <div>{userUid}</div>;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(mockUid)).toBeInTheDocument();
    });
  });

  it('should set userUid to null when authUser is not provided', async () => {
    const mockOnAuthStateChanged = vi.fn((callback) => {
      callback(null);
      return () => {};
    });

    (onAuthStateChanged as unknown as typeof mockOnAuthStateChanged) =
      mockOnAuthStateChanged;

    const TestComponent = () => {
      const userUid = useUserSession(null);
      return <div>{userUid === null ? 'No user UID' : userUid}</div>;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('No user UID')).toBeInTheDocument();
    });
  });
});
