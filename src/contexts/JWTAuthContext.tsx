import { USER_API_URL } from "apis/users-api";
import LoadingScreen from "components/LoadingScreen";
import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import axios from "utils/axios";

// All types
// =============================================
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

enum Types {
  Init = "INIT",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type JWTAuthPayload = {
  [Types.Init]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Login]: { user: AuthUser };
  [Types.Register]: { user: AuthUser };
};

type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];
// ================================================

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) return false;

  const decodedToken = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INIT": {
      return {
        isInitialized: true,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    case "REGISTER": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => {},
  register: (email: string, password: string, username: string) => Promise.resolve(),
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{
        data: { access_token: string; user: { username: string; full_name: string } };
      }>(`${USER_API_URL}/login`, {
        username,
        password,
      });

      const {
        data: { access_token, user },
      } = response.data;

      setSession(access_token);
      dispatch({
        type: Types.Login,
        payload: {
          user,
        },
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await axios.post(`${USER_API_URL}/register`, {
      email,
      username,
      password,
    });
    // @ts-ignore
    const { accessToken, user } = response.data;
    setSession(accessToken);

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("access_token");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`${USER_API_URL}/self`);
          //@ts-ignore
          const { data } = response.data;

          dispatch({
            type: Types.Init,
            payload: {
              user: data,
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: Types.Init,
            payload: {
              user: null,
              isAuthenticated: false,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Init,
          payload: {
            user: null,
            isAuthenticated: false,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
