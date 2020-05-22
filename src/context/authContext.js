import React, { useReducer } from "react";
import { AsyncStorage } from "react-native";

const initialState = {
  user: null,
};

export const AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED";

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_STATE_CHANGED:
      return {
        user: action.payload,
      };
  }
  return state;
};

const AuthContext = React.createContext(undefined);

const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const actions = {
    authStateChanged: async (user) => {
      if (user) {
        dispatch({ type: AUTH_STATE_CHANGED, payload: user });
      } else {
        let user = await AsyncStorage.getItem("@user");
        user = JSON.parse(user);
        if (user && user.accessToken) {
          dispatch({ type: AUTH_STATE_CHANGED, payload: user });
        }
      }
    },
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        authActions: actions,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
