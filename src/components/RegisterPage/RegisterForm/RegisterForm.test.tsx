import { render, screen } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { useForm } from 'react-hook-form';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { describe, it, vi, expect, beforeEach, Mock, afterEach } from 'vitest';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('services/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
  createSession: vi.fn(),
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual: typeof import('next-intl') = await importOriginal();

  return {
    ...actual,
    useTranslations: vi.fn(),
  };
});

const customRender = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en">{ui}</NextIntlClientProvider>,
  );
};

describe('RegisterForm', () => {
  const tMock = vi.fn((key) => key);
  const mockHandleSubmit = vi.fn((fn) => fn);

  beforeEach(() => {
    (useTranslations as Mock).mockReturnValue(tMock);

    (useForm as Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {},
      },
      watch: vi.fn().mockReturnValue(''),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render all input fields', () => {
    customRender(<RegisterForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('ConfirmPassword')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should display validation errors when inputs are invalid', async () => {
    (useForm as Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {
          name: { message: 'Name is required' },
          email: { message: 'Email is invalid' },
          password: { message: 'Password is too short' },
          confirmPassword: { message: 'Passwords do not match' },
        },
      },
      watch: vi.fn().mockReturnValue(''),
    });

    customRender(<RegisterForm />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should disable submit button when there are validation errors', () => {
    (useForm as Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {
          name: { message: 'Name is required' },
        },
      },
      watch: vi.fn().mockReturnValue(''),
    });

    customRender(<RegisterForm />);

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
  });
});
