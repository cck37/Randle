import { createContext, type ReactNode } from "react";
import { useCountdownToMidnight } from "../hooks/useCountdownToMidnight";

export const CountdownContext = createContext({});

export type CountdownProps = {
  children: ReactNode;
};

export const CountdownProvider: React.FC<CountdownProps> = ({ children }) => {
  const timeUntilMidnight = useCountdownToMidnight();

  return (
    <CountdownContext.Provider value={timeUntilMidnight}>
      {children}
    </CountdownContext.Provider>
  );
};
