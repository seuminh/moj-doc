import React, { createContext, useReducer } from "react";
import { initialState, AuthReducer } from "reducers/AuthReducer";

export const AuthContext = createContext();

export const AuthDispatch = createContext();

export const AuthProvider = (props) => {
   const [state, dispatch] = useReducer(AuthReducer, initialState);

   return (
      <AuthContext.Provider value={state}>
         <AuthDispatch.Provider value={dispatch}>
            {props.children}
         </AuthDispatch.Provider>
      </AuthContext.Provider>
   );
};
