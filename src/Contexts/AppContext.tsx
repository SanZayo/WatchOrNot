import { useQuery } from "@tanstack/react-query";
import { useReducer, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getAllLanguages, { IGetAllLanguagesArgs, ILanguages } from "../API/getAllLanguages";
import Loading from "../Components/Loading";

type AppProviderProps = { children: React.ReactNode };

type AppProviderState = {
  activeMediaType: string;
  languages: ILanguages;
  activeLanguages: Record<string, string>;
};

const initialState: AppProviderState = {
  activeMediaType: "movie",
  languages: {} as ILanguages,
  activeLanguages: {} as Record<string, string>,
};

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

const AppContext = createContext<any>({});

const AppProvider = ({ children }: AppProviderProps) => {
  let navigate = useNavigate();
  const args: IGetAllLanguagesArgs = {
    endpoint: "configuration/languages",
  };
  const { isLoading, isError, data, error } = useQuery<ILanguages, unknown, void | ILanguages>(["languages"], () =>
    getAllLanguages(args)
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (data) {
      dispatch({ languages: data, activeLanguages: { ...data.topLanguages } });
    }
  }, [data]);

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeMediaType]);

  if (isError) {
    return <>Something went wrong! {error}</>;
  }

  if (isLoading || Object.keys(state.activeLanguages).length === 0) {
    return <Loading />;
  }

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
