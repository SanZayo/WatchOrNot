import { IContentsList } from "./getAllContents";

export interface IGetContentByIdArgs {
  endpoint: string;
  filter?: string;
  activeLanguages?: string;
}


export interface IMediaDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: IVideos;
  vote_average: number;
  vote_count: number;
  releases: IReleases;
  "watch/providers": IWatchProviders;
  recommendations: IRecommendationsObj;
}

export interface IRecommendationsObj {
  page: number;
  results: IContentsList[];
}


export interface IVideos {
  results: IVideoResults[];
}

export interface IVideoResults {
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

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IReleases {
  countries: ICountry[];
}

export interface ICountry {
  certification: string;
  iso_3166_1: string;
  primary?: boolean;
  release_date: string;
}

export interface IWatchProviders {
  results: IResults;
}

export interface IResults {
  IN: IIn;
}

export interface IIn {
  link?: string;
  flatrate: IFlatrate[];
  buy: IFlatrate[];
  rent: IFlatrate[];
  ads: IFlatrate[];
}

export interface IFlatrate {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface ICrew {
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

export interface ICast {
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

export interface IMediaTypeDetails {
  mediaDetails: IMediaDetails;
  cast: ICast[];
  crew: ICrew[];
}


const getContentById = async ({ endpoint = "", filter = "", activeLanguages = "" }: IGetContentByIdArgs) => {
  const withLanguages = activeLanguages ? `&with_original_language=${Object.keys(activeLanguages).join("|")}` : '';
  const movieDetails = await fetch(
    `${process.env.REACT_APP_API_URL}${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US${filter}${withLanguages}`
  );
  const movieDetailsData = await movieDetails.json();

  const movieCredits = await fetch(
    `${process.env.REACT_APP_API_URL}${endpoint}/credits?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US`
  );
  const movieCreditsData = await movieCredits.json();

  return {
    mediaDetails: movieDetailsData,
    cast: movieCreditsData.cast.splice(0, 10),
    crew: movieCreditsData.crew.splice(0, 10)
  } as IMediaTypeDetails;
}

export default getContentById;