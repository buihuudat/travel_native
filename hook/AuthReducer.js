import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";

export const AuthReducer : function(){
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoaing: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userToken: null,
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

  return { state, dispatch };
};
