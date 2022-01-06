import React, { createContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setauthState] = useState({});

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return (
      new Date().getTime() / 1000 < authState.expiresAt && !!authState.userInfo
    );
  };

  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    setauthState({ token, expiresAt, userInfo });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    const userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    setauthState({ token, expiresAt });
  }, []);

  return (
    <AuthContext.Provider value={(isAuthenticated, setAuthInfo, authState)}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
