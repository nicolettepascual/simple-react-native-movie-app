import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import {
  SESSION_ID_STORAGE_KEY,
  getLocalData,
  removeFromLocalData,
  storeToLocalData,
} from "../../utils/storage";

enum AuthActionType {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  GET_ACCOUNT_DETAILS = "GET_ACCOUNT_DETAILS",
}

type AuthContextAction = {
  type: AuthActionType;
  token: string | null;
  sessionId: string | null;
  account: Account | undefined;
};

interface AuthContextValues {
  userToken: string | null;
  sessionId: string | null;
  account: Account | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
}

interface AuthContextState extends AuthContextValues {
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  getAccountDetails: () => Promise<Account | undefined | void>;
}

const initialAuthState = {
  userToken: null,
  sessionId: null,
  account: undefined,
  isLoading: false,
  isLoggedIn: false,
  login: async (data: any) => {},
  logout: async () => {},
  getAccountDetails: async () => {},
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
        isLoggedIn: true,
        userToken: action.token,
        sessionId: action.sessionId,
        isLoading: false,
      };
    case AuthActionType.GET_ACCOUNT_DETAILS:
      return {
        ...state,
        account: action.account,
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
      const resForReqToken: LoginApiResponse = await request({
        url: endpoints.authentication.tokenNew,
      });

      // Step 2: Ask the user for permission
      // validate fetched request token
      const resForSessionId: LoginApiResponse = await request({
        url: endpoints.authentication.tokenValidateWithLogin,
        content: {
          username: data.username,
          password: data.password,
          request_token: resForReqToken.request_token,
        },
        method: "POST",
      });

      // Step 3: Create a session ID
      const resSessionId: SessionApiResponse = await request({
        url: endpoints.authentication.sessionNew,
        content: {
          request_token: resForSessionId.request_token,
        },
        method: "POST",
      });

      if (resSessionId.session_id)
        await storeToLocalData(SESSION_ID_STORAGE_KEY, resSessionId.session_id);

      const account = await getAccountDetails();

      console.log("====== ", account);

      dispatch({
        type: AuthActionType.LOGIN,
        token: `${resForReqToken.request_token}`,
        sessionId: `${resSessionId.session_id}`,
        account: account,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      const sessionId = await getLocalData(SESSION_ID_STORAGE_KEY);
      const res: BaseApiResponse = await request({
        url: endpoints.authentication.logout,
        content: {
          session_id: sessionId,
        },
        method: "DELETE",
      });
      await removeFromLocalData(SESSION_ID_STORAGE_KEY);
      console.log("logout", { res });
      dispatch({
        type: AuthActionType.LOGOUT,
        token: null,
        sessionId: null,
        account: undefined,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getAccountDetails = async () => {
    try {
      const sessionId = await getLocalData(SESSION_ID_STORAGE_KEY);
      const response: AccountApiResponse = await request({
        url: endpoints.account.details,
        sessionId: sessionId,
        apiUrlWithSessionId: true,
      });

      const account: Account = {
        avatarPath:
          response.avatar.tmdb.avatar_path ?? response.avatar.gravatar.hash,
        accountId: response.id,
        name: response.name,
        username: response.username,
      };

      console.log(account);

      dispatch({
        type: AuthActionType.GET_ACCOUNT_DETAILS,
        token: state.userToken,
        sessionId: sessionId,
        account,
      });

      return account;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const onStorageChange = async () => {
      const sessionId = await getLocalData(SESSION_ID_STORAGE_KEY);
      if (sessionId && sessionId !== state.sessionId) {
        dispatch({
          type: AuthActionType.RESTORE_TOKEN,
          token: state.userToken,
          sessionId: sessionId,
          account: state.account,
        });
      }
    };
    onStorageChange();
  }, [state.sessionId, state.userToken]);

  const authContextProviderValues = {
    userToken: state.userToken,
    sessionId: state.sessionId,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    account: state.account,
    login,
    logout,
    getAccountDetails,
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
