import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { LoginForm } from './LoginForm';
import { logInWithEmailAndPassword, createSession } from 'services/firebase';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('services/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
  createSession: vi.fn(),
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual: typeof import('next-intl') = await importOriginal();

  return {
    ...actual,
    useTranslations: () => (key: string) => key,
  };
});

const customRender = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en">{ui}</NextIntlClientProvider>,
  );
};

describe('LoginForm', () => {
  const mockUserUid = '123456';

  beforeEach(() => {
    (logInWithEmailAndPassword as Mock).mockReset();
    (createSession as Mock).mockReset();
  });

  it('renders form inputs and submit button', () => {
    customRender(<LoginForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('calls logInWithEmailAndPassword and createSession on successful form submission', async () => {
    (logInWithEmailAndPassword as Mock).mockResolvedValue(mockUserUid);

    customRender(<LoginForm />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password123!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'Password123!',
      );
      expect(createSession).toHaveBeenCalledWith(mockUserUid);
    });
  });
});
