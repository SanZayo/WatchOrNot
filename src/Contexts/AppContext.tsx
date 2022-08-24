import { useReducer, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLanguages, { Languages } from "../Hooks/useLanguages";

type AppProviderProps = { children: React.ReactNode };

type AppProviderState = {
  activeMediaType: string;
  languages: Languages;
};

const initialState: AppProviderState = {
  activeMediaType: "movie",
  languages: {} as Languages,
};

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

const AppContext = createContext<any>({});

const AppProvider = ({ children }: AppProviderProps) => {
  let navigate = useNavigate();
  const languages = useLanguages("configuration/languages");

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (languages) {
      dispatch({ languages });
    }
  }, [languages]);

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeMediaType]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
