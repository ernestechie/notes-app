import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../firebase.config';
import { UserDataType } from '../types';

interface AuthContextType {
  checkingStatus: boolean;
  isAuthenticated: boolean;
  userData: null | UserDataType;
}

const initialState = {
  checkingStatus: true,
  isAuthenticated: false,
  userData: null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const getUserData = useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        const docRef = doc(db, 'users', user.uid);

        await getDoc(docRef)
          .then((snapshot) => {
            setUserData(() => snapshot.data() as UserDataType);
          })
          .catch(() => {});
      }
      setCheckingStatus(false);
    });
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <AuthContext.Provider value={{ checkingStatus, isAuthenticated, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth() {
  const context = useContext<AuthContextType>(AuthContext);

  return context;
}
