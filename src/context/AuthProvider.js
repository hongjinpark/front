import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storageUser = JSON.parse(localStorage.getItem('user')) || null;
  const [auth, setAuth] = useState(storageUser);
  const getNickName = () => {
    if (auth != null) {
      if (auth.userInfo) {
        return auth.userInfo.usrNickName;
      }
      return auth.nickname;
    } else {
      return null;
    }
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, getNickName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
