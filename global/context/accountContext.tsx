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
import { useAuthContext } from "./authContext";

enum AccountActionType {
  GET_ACCOUNT_DETAILS = "GET_ACCOUNT_DETAILS",
}

type AccountContextAction = {
  type: AccountActionType;
  account: Account;
};

interface AccountContextValues {
  account: Account | undefined;
}

interface AccountContextState extends AccountContextValues {
  getAccountDetails: () => Promise<void>;
}

const initialAccountState = {
  account: undefined,
  getAccountDetails: async () => {},
};

export const AccountContext =
  createContext<AccountContextState>(initialAccountState);

function AccountContextReducer(
  state: AccountContextState,
  action: AccountContextAction
): AccountContextState {
  switch (action.type) {
    case AccountActionType.GET_ACCOUNT_DETAILS:
      return {
        ...state,
        account: action.account,
      };
    default:
      return {
        ...state,
      };
  }
}

const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    AccountContextReducer,
    initialAccountState
  );

  const { sessionId } = useAuthContext();

  const getAccountDetails = async () => {
    try {
      const response: AccountApiResponse = await request({
        url: endpoints.account.details,
        sessionId,
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
        type: AccountActionType.GET_ACCOUNT_DETAILS,
        account,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const AccountContextProviderValues = {
    account: state.account,
    getAccountDetails,
  };

  return (
    <AccountContext.Provider value={AccountContextProviderValues}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = (): AccountContextState => {
  const choreAccountContext = useContext(AccountContext);
  if (!choreAccountContext) {
    throw new Error(
      "AccountContext must be used within a AccountContextProvider"
    );
  }
  return choreAccountContext;
};

export { AccountContextProvider, useAccountContext };
