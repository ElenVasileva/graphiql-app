import { vi, describe, it, expect, afterEach } from 'vitest';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  onAuthStateChanged,
  logout,
  firebaseAuth,
  firebaseDb,
} from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

// Mock Firebase Auth and Firestore
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(() => ({
    /* mock auth object */
  })),
}));

vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  getFirestore: vi.fn(),
}));

describe('Firebase Auth Functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logInWithEmailAndPassword', () => {
    it('should return user UID on successful login', async () => {
      const mockUser = { uid: 'mock-uid' };
      (signInWithEmailAndPassword as any).mockResolvedValueOnce({
        user: mockUser,
      });

      const uid = await logInWithEmailAndPassword(
        'test@example.com',
        'password123',
      );
      expect(uid).toBe('mock-uid');
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        firebaseAuth,
        'test@example.com',
        'password123',
      );
    });

    it('should throw an error if login fails', async () => {
      (signInWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Invalid credentials'),
      );

      await expect(
        logInWithEmailAndPassword('test@example.com', 'wrong-password'),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('registerWithEmailAndPassword', () => {
    it('should register a new user and return the user UID', async () => {
      const mockUser = { uid: 'mock-uid' };
      (createUserWithEmailAndPassword as any).mockResolvedValueOnce({
        user: mockUser,
      });
      (addDoc as any).mockResolvedValueOnce({});

      const uid = await registerWithEmailAndPassword(
        'Test User',
        'test@example.com',
        'password123',
      );
      expect(uid).toBe('mock-uid');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        firebaseAuth,
        'test@example.com',
        'password123',
      );
      expect(addDoc).toHaveBeenCalledWith(collection(firebaseDb, 'users'), {
        uid: 'mock-uid',
        name: 'Test User',
        authProvider: 'local',
        email: 'test@example.com',
      });
    });

    it('should throw an error if registration fails', async () => {
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Invalid credentials'),
      );

      await expect(
        registerWithEmailAndPassword(
          'Test User',
          'test@example.com',
          'password123',
        ),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('onAuthStateChanged', () => {
    it('should call the callback with the current user on auth state change', () => {
      const mockUser = { uid: 'mock-uid' };
      const callback = vi.fn();

      (_onAuthStateChanged as any).mockImplementationOnce(
        (_: string, cb: (user: { uid: string } | null) => void) => {
          cb(mockUser);
        },
      );

      onAuthStateChanged(callback);

      expect(_onAuthStateChanged).toHaveBeenCalledWith(
        firebaseAuth,
        expect.any(Function),
      );
      expect(callback).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('logout', () => {
    it('should call Firebase signOut method', () => {
      logout();
      expect(signOut).toHaveBeenCalledWith(firebaseAuth);
    });
  });
});
