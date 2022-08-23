import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US&with_original_language=hi|kn|ml|ta|te|mr${filter}`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = data.results.filter((item: MediaType) => item.backdrop_path && item.poster_path).splice(0, count);
        setMediaList(items);
      })
      .catch(err => console.log(err));
  }, [endpoint, count, filter]);

  return mediaList;
}

export default useMedia;