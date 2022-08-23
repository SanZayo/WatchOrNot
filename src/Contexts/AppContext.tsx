import { useReducer, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AppProviderProps = { children: React.ReactNode };

// type AppProviderState = {
//   activeMediaType: string;
//   languages: any[];
// };

const initialState = {
  activeMediaType: "movie",
  languages: [],
};

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

const AppContext = createContext<any>({});

const AppProvider = ({ children }: AppProviderProps) => {
  let navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    navigate("/");
  }, [navigate, state.activeMediaType]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
