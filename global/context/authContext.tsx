import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";

enum AuthActionType {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthContextAction = {
  type: AuthActionType;
  token: string | null;
  sessionId: string | null;
};

interface AuthContextValues {
  userToken: string | null;
  sessionId: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

interface AuthContextState extends AuthContextValues {
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
}

const initialAuthState = {
  userToken: null,
  sessionId: null,
  isLoading: false,
  isLoggedIn: false,
  login: async (data: any) => {},
  logout: async () => {},
  signUp: async (data: any) => {},
};

export const AuthContext = createContext<AuthContextState>(initialAuthState);

function authContextReducer(
  state: AuthContextState,
  action: AuthContextAction
): AuthContextState {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.token,
        sessionId: action.sessionId,
      };
    case AuthActionType.LOGOUT:
      return { ...state, isLoggedIn: false, userToken: null, sessionId: null };
    case AuthActionType.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    default:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        userToken: null,
      };
  }
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authContextReducer, initialAuthState);

  const login = async (data: any) => {
    try {
      // Step 1: Create a request token
      const resForReqToken: LoginApiResponse = await request(
        endpoints.authentication.tokenNew
      );

      // Step 2: Ask the user for permission
      // validate fetched request token
      const resForSessionId: LoginApiResponse = await request(
        endpoints.authentication.tokenValidateWithLogin,
        {
          username: data.username,
          password: data.password,
          request_token: resForReqToken.request_token,
        },
        "POST"
      );

      // Step 3: Create a session ID
      const resSessionId: SessionApiResponse = await request(
        endpoints.authentication.sessionNew,
        {
          request_token: resForSessionId.request_token,
        },
        "POST"
      );
      dispatch({
        type: AuthActionType.LOGIN,
        token: `${resForReqToken.request_token}`,
        sessionId: `${resSessionId.session_id}`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const signUp = async (data: any) => {
    // TODO: Sign Up API call
    dispatch({
      type: AuthActionType.LOGIN,
      token: `${data}-dummy-auth-token`,
      sessionId: null,
    });
  };

  const logout = async () => {
    try {
      const res: BaseApiResponse = await request(
        endpoints.authentication.logout,
        {
          session_id: state.sessionId,
        },
        "DELETE"
      );
      console.log("logout", { res });
      dispatch({ type: AuthActionType.LOGOUT, token: null, sessionId: null });
    } catch (e) {
      console.error(e);
    }
  };

  const authContextProviderValues = {
    userToken: state.userToken,
    sessionId: state.sessionId,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    login,
    logout,
    signUp,
  };

  return (
    <AuthContext.Provider value={authContextProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextState => {
  const choreAuthContext = useContext(AuthContext);
  if (!choreAuthContext) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return choreAuthContext;
};

export { AuthContextProvider, useAuthContext };
