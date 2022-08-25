import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Contexts/AppContext";

export interface MediaType {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_language: string;
  original_name: string;
  release_date: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}


function useMedia(endpoint: string, count: number = 4, filter: string = ""): MediaType[] {
  const [mediaList, setMediaList] = useState([]);
  const {
    state: { activeLanguages }
  } = useContext(AppContext);

  useEffect(() => {
    const withLanguages = activeLanguages ? `&with_original_language=${Object.keys(activeLanguages).join("|")}` : '';
    fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US${withLanguages}${filter}`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = data.results.filter((item: MediaType) => item.backdrop_path && item.poster_path).splice(0, count);
        setMediaList(items);
      })
      .catch(err => console.log(err));
  }, [activeLanguages, endpoint, count, filter]);

  return mediaList;
}

export default useMedia;