import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import { AppProviderContextType } from './AppProvider.types';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isUserAuthorized, setUserAuthorized] = useState(false);

  const value: AppProviderContextType = {
    isUserAuthorized,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
