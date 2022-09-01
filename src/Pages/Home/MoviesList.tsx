import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AppContext } from "../../Contexts/AppContext";
import Loading from "./../../Components/Loading/Loading";
import getAllContents, { IGetAllContentsArgs, IContentsList } from "../../API/getAllContents";

import HorizontalList from "../../Components/HorizontalList";

function MoviesList(props: any) {
  const {
    state: { activeMediaType, activeLanguages },
  } = useContext(AppContext);

  const args: IGetAllContentsArgs = {
    endpoint: `${activeMediaType}/${props.name}`,
    activeLanguages,
  };

  const { isLoading, isError, data, error } = useQuery<IContentsList[]>(
    [`${activeMediaType}/${props.name}`, Object.values(args)],
    () => getAllContents(args)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>Something went wrong! {error}</>;
  }

  return <HorizontalList displayName={props.displayName} data={data} />;
}

export default MoviesList;
