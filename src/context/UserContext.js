import { createContext, useState } from "react";

const UserContext = createContext({
  id: "",
  email: "",
  isAuthenticated: false,
  hasCreatedAccount: false,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    isAuthenticated: false,
    hasCreatedAccount: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
