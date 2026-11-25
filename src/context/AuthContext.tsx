import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  getAccessToken,
  getFirebaseIdToken,
  googleSignIn,
  initAuth,
  logout,
} from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
  isSigningIn: boolean;
  authError: string | null;
  signIn: () => Promise<{ user: User; accessToken: string } | null>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken()
  );
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return unsubscribe;
  }, []);

  const signIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
      return result;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to sign in with Google.';
      setAuthError(message);
      return null;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        needsAuth,
        isSigningIn,
        authError,
        signIn,
        signOut,
        getIdToken: getFirebaseIdToken,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
