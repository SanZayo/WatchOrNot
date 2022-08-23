import { useEffect, useState } from "react";

export interface MediaDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: Videos;
  vote_average: number;
  vote_count: number;
  releases: Releases;
  "watch/providers": WatchProviders;
  recommendations: RecommendationsObj;
}

export interface RecommendationsObj {
  page: number;
  results: Recommendations[];
}


export interface Videos {
  results: VideoResults[];
}

export interface VideoResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Releases {
  countries: Country[];
}

export interface Country {
  certification: string;
  iso_3166_1: string;
  primary?: boolean;
  release_date: string;
}

export interface WatchProviders {
  results: Results;
}

export interface Results {
  IN: In;
}

export interface In {
  link?: string;
  flatrate: Flatrate[];
  buy: Flatrate[];
  rent: Flatrate[];
  ads: Flatrate[];
}

export interface Flatrate {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null;
  credit_id: string;
  department: string;
  job: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MediaTypeDetails {
  mediaDetails: MediaDetails;
  cast: Cast[];
  crew: Crew[];
}

export interface Recommendations {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function useMediaTypeDetails(endpoint: string, filter: string = ""): MediaTypeDetails {
  const [details, setDetails] = useState({
    mediaDetails: {} as MediaDetails,
    cast: [] as Cast[],
    crew: [] as Crew[]
  });

  useEffect(() => {

    const getDetails = async () => {
      const movieDetails = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US${filter}`
      );
      const movieDetailsData = await movieDetails.json();

      const movieCredits = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}/credits?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US`
      );
      const movieCreditsData = await movieCredits.json();

      setDetails({
        mediaDetails: movieDetailsData,
        cast: movieCreditsData.cast.splice(0, 10),
        crew: movieCreditsData.crew.splice(0, 10)
      });
    }
    getDetails();
  }, [endpoint, filter]);

  return details as MediaTypeDetails;
}


export default useMediaTypeDetails;