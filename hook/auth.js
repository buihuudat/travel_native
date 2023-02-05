import axios from "axios";
import { createContext, useEffect, useMemo, useReducer } from "react";
import { Alert } from "react-native";
import { authApi } from "../api/auth";
const AuthContext = createContext();

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            user: action.user,
            isLoaing: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            user: null,
            isSignout: true,
          };
      }
    },
    {
      isLoaing: true,
      isSignout: false,
      userToken: null,
    }
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {}

      dispatch({ type: "RESTORE_TOKEN", user: userToken });
    };

    bootstrapAsync();
  }, []);

  const handlers = useMemo(
    () => ({
      signIn: async (dataSignin) => {
        try {
          const data = await authApi.login(dataSignin);
          dispatch({ type: "SIGN_IN", user: data });
        } catch (e) {
          Alert.alert(e.message);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (dataSignup) => {
        try {
          const data = await authApi.register(dataSignup);
          dispatch({ type: "SIGN_IN", user: data });
        } catch (e) {
          Alert.alert(e.message);
        }
      },
    }),
    []
  );

  const auth = {
    handlers,
    state,
  };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext, ContextProvider };
