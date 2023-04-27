import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

enum AuthActionType {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthContextAction = {
  type: AuthActionType;
  token: string | null;
};

interface AuthContextValues {
  userToken: string | null;
  isLoading: boolean;
  isLogout: boolean;
}

interface AuthContextState extends AuthContextValues {
  login: (data: any) => Promise<void>;
  logout: () => void;
  signUp: (data: any) => Promise<void>;
}

const initialAuthState = {
  userToken: null,
  isLoading: false,
  isLogout: false,
  login: async (data: any) => {},
  logout: () => {},
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
        isLogout: false,
        userToken: action.token,
      };
    case AuthActionType.LOGOUT:
      return { ...state, isLogout: true, userToken: null };
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
        isLogout: false,
        userToken: null,
      };
  }
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authContextReducer, initialAuthState);

  const authContextProviderValues = {
    userToken: state.userToken,
    isLoading: false,
    isLogout: false,
    login: async (data: any) => {
      // TODO: Login API call
      dispatch({ type: AuthActionType.LOGIN, token: "login-dummy-auth-token" });
    },
    logout: () => dispatch({ type: AuthActionType.LOGOUT, token: null }),
    signUp: async (data: any) => {
      // TODO: Sign Up API call
      dispatch({
        type: AuthActionType.LOGIN,
        token: "signup-dummy-auth-token",
      });
    },
  };

  return (
    <AuthContext.Provider value={authContextProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextState => {
  const choreMiniGameContext = useContext(AuthContext);
  if (!choreMiniGameContext) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return choreMiniGameContext;
};

export { AuthContextProvider, useAuthContext };
