import React, { useCallback, useContext, useState } from 'react';
import { createContext } from 'react';
import api from '../services/api';


interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signInChecked(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>(() => {
   let token;
   let user;

   user = sessionStorage.getItem('@Proffy:user');
   token = sessionStorage.getItem('@Proffy:token');

   user = localStorage.getItem('@Proffy:user');
   token = localStorage.getItem('@Proffy:token');

   if (user && token ){
     return {token , user:JSON.parse(user)};
   }

   return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password })=> {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    sessionStorage.setItem('@Proffy:token', token);
    sessionStorage.setItem('@Proffy:user', JSON.stringify(user));

    setData({ token, user });
  }, []);


  const signInChecked = useCallback(async ({ email, password })=> {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@Proffy:token', token);
    localStorage.setItem('@Proffy:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@Proffy:token');
    sessionStorage.removeItem('@Proffy:user');

    localStorage.removeItem('@Proffy:token');
    localStorage.removeItem('@Proffy:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: data.user,
      token: data.token,
      signIn,
      signInChecked,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
