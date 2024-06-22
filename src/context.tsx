import React, { useContext } from "react";

// Context Creation

const AppContext = React.createContext();

// Provider Function

const AppProvider = ({ children }) => {
  return <AppContext.Provider value="">{children}</AppContext.Provider>;
};

// Custome hook creation

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };



// To use the global context

    // import { useGlobalContext } from "../../context";

    // const data = useGlobalContext()  // use global context

    // <span>{data}</span>
