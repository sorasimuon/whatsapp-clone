import react, { createContext, useContext, useReducer } from "react";

// Prepare the dataLayer ( also named store)
// Equivalent to createStore in Redux
export const StateContext = createContext();

//Wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
