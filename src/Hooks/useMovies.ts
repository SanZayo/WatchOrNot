import { useEffect, useState } from "react";

export interface Movies {
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


function useMovies(endpoint: string, count: number = 4): Movies[] {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&with_original_language=hi|kn|ml|ta|te|mr&sort_by=release_date.desc&vote_average.gte=7.5&vote_count.gte=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results.splice(0, count));
      })
      .catch(err => console.log(err));
  }, []);

  return movieList;
}

export default useMovies;